import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModifyUsers,
  selectUsers,
  setModifyFollowers,
} from "../features/appSlice";
import { selectUser } from "../features/authSlice";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";
const TaskModifyFollowers = ({ route, navigation }) => {
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { followers } = route.params;
  const modifyUsers = useSelector(selectModifyUsers);
  const [selectedFollowers, setSelectedFollowers] = useState(followers);

  const getFilteredUsers = () => {
    const filtered = users;
    return filtered;
  };

  const handlePushFollowers = (item) => {
    setSelectedFollowers([...selectedFollowers, item]);
  };

  const handleRemoveFollowers = (item) => {
    const index = selectedFollowers.findIndex((i) => i === item);
    const newFollowers = [...selectedFollowers];
    if (index >= 0) {
      newFollowers.splice(index, 1);
    } else {
      console.log(`You can't remove this item`);
    }

    setSelectedFollowers(newFollowers);
  };

  const handleModifyFollowers = () => {
    dispatch(setModifyFollowers(selectedFollowers));
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View className="h-screen py-8 px-6 relative">
        <View>
          <TouchableOpacity
            className="mb-6"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View className="w-8 h-8 bg-black items-center justify-center rounded-full">
              <Icon name="arrow-left" color={"#ffffff"} />
            </View>
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Select Task Followers</Text>
        </View>

        <ScrollView className="my-6">
          {getFilteredUsers().map((item, index) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={() => {
                  !selectedFollowers.includes(item._id)
                    ? handlePushFollowers(item._id)
                    : handleRemoveFollowers(item._id);
                }}
              >
                <View
                  className={`px-3 py-8 ${
                    selectedFollowers.includes(item._id)
                      ? "bg-pink-300"
                      : "bg-gray-300"
                  } mb-6 rounded-md`}
                >
                  <Text className="text-lg font-semibold">{item.fullname}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            handleModifyFollowers();
          }}
        >
          <View className="-translate-y-10 w-full h-12 bg-black  items-center justify-center rounded-md flex-row gap-2">
            <Text className="text-white font-semibold">Save</Text>
            <Icon name="arrow-right" color={"#ffffff"} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TaskModifyFollowers;
