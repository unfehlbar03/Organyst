import { View, Text, Image } from "react-native";
import React from "react";
import { OrderedListOutlined } from "@ant-design/icons";
const UserNavOption = ({ type, name, caption }) => {
  return (
    <View className="relative w-[65px] h-[65px]  flex items-center justify-center gap-2">
      {type === "avatar" && (
        <View className="w-full h-full">
          <>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/men/1.jpg",
              }}
              className="w-full h-full rounded-full"
            />
            <View className="px-2 py-1 bg-gray-500 absolute top-1 -right-1 rounded-full">
              <Text className="text-white">12</Text>
            </View>
          </>
        </View>
      )}
      {type === "icon" && name === "list" && (
        <View className="h-full w-full flex items-center justify-center  rounded-full bg-white shadow-2xl">
          <Image source={require("../assets/task.png")} style={{ height: 20, width: 23 }}/>
        </View>
      )}
      {type === "icon" && name === "alert" && (
        <View className="h-full w-full flex items-center justify-center  rounded-full bg-white shadow-2xl" style={{elevation:5}}>
          <Image source={require("../assets/Bell.png")} style={{ height: 20, width: 20 }}/>
        </View>
      )}
      <Text className="text-gray-500 font-semibold">{caption}</Text>
    </View>
  );
};

export default UserNavOption;
