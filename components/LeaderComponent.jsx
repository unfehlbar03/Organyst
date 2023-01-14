import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import CheckBox from "./CheckBox";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import { useNavigation } from "@react-navigation/native";

const LeaderComponent = ({ leader }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();

  return (
    <View className={"flex-row px-2 py-2"}>
      <View className="flex-row flex-1 space-x-2 items-center">
        <CheckBox leader={leader} />
        <View>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/men/52.jpg`,
            }}
            className="w-12 h-12 rounded-full bg-gray-400"
          />
        </View>
        <View>
          <Text className="text-blue-700">
            {leader._id === user?._id ? "You" : leader.fullname}
          </Text>
          <Text className="text-gray-400">{leader.designation}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          className="px-2 py-1 bg-purple-900 rounded"
          onPress={() => {
            navigation.navigate("profileView", { id: leader._id });
          }}
        >
          <Text className="text-white">View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LeaderComponent;
