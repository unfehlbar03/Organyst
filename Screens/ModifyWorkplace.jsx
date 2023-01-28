import { View, Text, SafeAreaView, Alert } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import modifyWorkplace from "../utils/modifyWorkplace";
import getToken from "../utils/getToken";
import { useDispatch } from "react-redux";
import { setWorkplaces } from "../features/appSlice";

const ModifyWorkplace = ({ route, navigation }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const [change, setChange] = React.useState(false);
  const [name, setName] = React.useState(item.name);
  const [description, setDescription] = React.useState(item.description);

  // handle update the workplace

  const handleUpdate = async () => {
    const token = await getToken();
    try {
      const r = await modifyWorkplace(token, item._id, { name, description });

      const { status, message } = r;
      if (status !== "success") {
        Alert.alert("Error in updating workplace");
        return;
      }
      Alert.alert(message);
      dispatch(setWorkplaces(r.data));
      navigation.navigate("tasks");
    } catch (e) {
      console.log(e);
    }
  };
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
