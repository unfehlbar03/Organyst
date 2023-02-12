import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import modifyWorkplace from "../utils/modifyWorkplace";
import getToken from "../utils/getToken";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, setWorkplaces } from "../features/appSlice";
import { FlatList } from "react-native";
import getProfile from "../utils/getProfile";
import fetchUsersTokens from "../utils/fetchUsersTokens";
import sendNotifcation from "../utils/notifyUsers";
import { selectUser } from "../features/authSlice";
const ExistUserComponent = ({ uid, handleRemove }) => {
  const [user, setUser] = useState(false);

  const getFormattedInitial = () => {
    const words = user?.fullname.toUpperCase().split("");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0] + words[0][1];
  };

  useEffect(() => {
    async function getUProfile() {
      const token = await getToken();
      try {
        const r = await getProfile(token, uid);
        console.log("User Data", r);
        setUser(r.data);
      } catch (e) {
        console.log(e);
      }
    }
    getUProfile();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        handleRemove(uid);
      }}
    >
      <View className="w-8 h-8 bg-black rounded-full items-center justify-center">
        <Text className="text-white text-xs">
          {user && getFormattedInitial()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const NonExistUserComponent = ({ uid, handleAdd }) => {
  console.log("UID", uid);
  const [user, setUser] = useState(false);

  const getFormattedInitial = () => {
    const words = user?.fullname.toUpperCase().split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0] + words[0][1];
  };

  useEffect(() => {
    async function getUProfile() {
      const token = await getToken();
      try {
        const r = await getProfile(token, uid);
        console.log("User Data", r);
        setUser(r.data);
      } catch (e) {
        console.log(e);
      }
    }
    getUProfile();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        handleAdd(uid);
      }}
    >
      <View className="w-8 h-8 bg-black rounded-full items-center justify-center">
        <Text className="text-white text-xs">
          {user && getFormattedInitial()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ModifyWorkplace = ({ route, navigation }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [change, setChange] = React.useState(false);
  const [members, setMembers] = useState(item?.members ? item.members : []);
  const [name, setName] = React.useState(item.name);
  const users = useSelector(selectUsers);
  const [description, setDescription] = React.useState(item.description);

  // handle update the workplace

  const handleUpdate = async () => {
    const token = await getToken();
    try {
      const r = await modifyWorkplace(token, item._id, {
        name,
        description,
        members,
      });

      const { status, message } = r;
      if (status !== "success") {
        Alert.alert("Error in updating workplace");
        return;
      }

      if (members) {
        const tokens = await fetchUsersTokens(members);

        console.log("Device Tokens", tokens);

        if (tokens) {
          await sendNotifcation(
            tokens.data.map((i) => i.deviceId),
            {
              title: ` Workflow Update by ${user.fullname}`,
              subtitle: `Workflow with name ${name} is Updated`,
            },
            user._id,
            members,
            "workplaces",
            new Date(),
            new Date()
          );
          Alert.alert(message);
          dispatch(setWorkplaces(r.data));
          navigation.navigate("tasks");
        }
      } else {
        Alert.alert("Atlease one member selected for this workplace");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getFilteredUsers = () => {
    return users.filter((i) => !members.includes(i._id));
  };

  const handleRemove = (id) => {
    const index = members.findIndex((i) => i === id);
    setChange(true);
    const newMembers = [...members];
    if (index >= 0) {
      newMembers.splice(index, 1);
    }

    setMembers(newMembers);
  };

  const handleAdd = (id) => {
    setMembers([...members, id]);
    setChange(true);
  };

  console.log(`Current Members`, members);

  console.log(`Filtered Members`, getFilteredUsers());
  return (
    <SafeAreaView>
      <View className="px-6 py-8">
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View className="w-8 h-8  rounded-full flex items-center justify-center">
              <Icon name="arrowleft" color={"#000000"} />
            </View>
          </TouchableOpacity>
          <Text className="text-2xl font-semibold">Modify Workplace</Text>
        </View>
        <View className="my-12 w-full">
          <View className="w-full mb-6">
            <Text className="mb-3 text-md font-semibold">Workplace Name</Text>
            <TextInput
              defaultValue={name}
              className="rounded-md w-full h-[48px] bg-gray-200 px-2"
              onChangeText={(text) => {
                setName(text);
                setChange(true);
              }}
            />
          </View>

          <View className="w-full mb-6">
            <Text className="mb-3 text-md font-semibold">
              Workplace Description
            </Text>
            <TextInput
              defaultValue={description}
              className="rounded-md w-full  bg-gray-200 px-2 py-6"
              editable
              multiline
              maxLength={40}
              numberOfLines={4}
              blurOnSubmit={true}
              onChangeText={(text) => {
                setDescription(text);
                setChange(true);
              }}
            />
          </View>

          {members?.length > 0 && (
            <View className="mb-6">
              <View className="mb-3">
                <Text>Selected Users</Text>
                <Text className="text-xs text-black/50">
                  Tap avatar to remove
                </Text>
              </View>

              <FlatList
                data={members}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <ExistUserComponent
                      uid={item}
                      handleRemove={handleRemove}
                    />
                  );
                }}
              />
            </View>
          )}

          {getFilteredUsers()?.length > 0 && (
            <View className="mb-6">
              <View className="mb-3">
                <Text>Not Selected Users</Text>
                <Text className="text-xs text-black/50">Tap avatar to add</Text>
              </View>

              <FlatList
                data={getFilteredUsers()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <NonExistUserComponent
                      uid={item._id}
                      handleAdd={handleAdd}
                    />
                  );
                }}
              />
            </View>
          )}

          <TouchableOpacity
            className={`w-full h-[45px] ${
              change ? "bg-purple-800" : "bg-gray-300"
            } rounded-md`}
            onPress={name && description.length > 16 && handleUpdate}
          >
            <View className="w-full h-full items-center justify-center">
              <Text className="text-white font-semibold">Modify Workplace</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ModifyWorkplace;
