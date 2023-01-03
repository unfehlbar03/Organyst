import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import CheckBox from "./CheckBox";

const LeaderComponent = ({ leader, setLeaders, leaders }) => {
  console.log("Leaders: ", leaders);
  return (
    <View className={"flex-row px-2 py-2"}>
      <View className="flex-row flex-1 space-x-2 items-center">
        <CheckBox leaders={leaders} setLeaders={setLeaders} leader={leader} />
        <View>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/men/52.jpg`,
            }}
            className="w-12 h-12 rounded-full bg-gray-400"
          />
        </View>
        <View>
          <Text className="text-blue-700 text-lg">{leader.fullname}</Text>
          <Text className="text-gray-400">{leader.designation}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity className="px-2 py-1 bg-purple-900 rounded">
          <Text className="text-white">View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeaderComponent;
