import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFollower,
  removeWorkplaceTokens,
  selectTaskFollowers,
  setTaskFollowers,
  setWorkplaceDeviceTokens,
} from "../features/appSlice";

const Follower = ({ follower }) => {
  console.log("FOLLOWER", follower);
  const dispatch = useDispatch();
  const followers = useSelector(selectTaskFollowers);
  const getFormattedIntial = (name) => {
    const words = name.split(" ");
    return words.length > 2
      ? words[0][0] + words[1][0]
      : words[0][0] + words[0][1];
  };

  const getRandomColor = () => {
    const colors = [
      "bg-red-400",
      "bg-purple-400",
      "bg-teal-400",
      "bg-blue-400",
    ];
    return colors[Math.floor(Math.random() * (0, colors.length))];
  };

  const handleFollowersAdd = () => {
    dispatch(setTaskFollowers(follower._id));
    dispatch(setWorkplaceDeviceTokens(follower.deviceId));
  };

  const isPersonAdded = (id) => {
    const index = followers.findIndex((fl) => fl === id);
    return index;
  };

  const removePerson = () => {
    dispatch(removeFollower(follower._id));
    dispatch(removeWorkplaceTokens(follower.deviceId));
  };
  return (
    <TouchableOpacity
      onPress={() => {
        isPersonAdded(follower._id) > -1
          ? removePerson()
          : handleFollowersAdd();
      }}
    >
      <View className="flex flex-row gap-1 justify-between w-full items-center  mb-3 pl-0 rounded-md pr-3 focus:bg-gray-200">
        <View className="flex flex-row gap-3 items-center">
          <View
            className={`w-12 h-12 ${getRandomColor()} rounded-full flex items-center justify-center ${
              isPersonAdded(follower._id) > -1 ? "border border-black" : null
            }`}
          >
            <Text>{followers && getFormattedIntial(follower.fullname)}</Text>
          </View>
          <View>
            <Text className="font-bold">
              {follower.fullname.length > 18
                ? follower.fullname.slice(0, 8) + "..."
                : follower.fullname}
            </Text>
            <Text className="text-xs text-black/50">
              {follower.designation}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <View className="px-2 py-2 bg-pink-500 rounded-full ">
            <Text className="text-white font-semibold">View Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Follower;
