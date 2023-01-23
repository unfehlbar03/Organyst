import { View, Text, Image } from "react-native";
import React from "react";

const UserNavOption = ({ type, name, caption, user }) => {
  console.log("User", user);
  const getFormattedInitial = () => {
    const words = user?.fullname.toUpperCase().split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0] + words[0][1];
  };
  return (
    <View className="relative w-[65px] h-[65px]  flex items-center justify-center gap-2">
      {type === "avatar" && (
        <View className="w-full h-full bg-green-500 flex items-center justify-center rounded-full">
          <>
            <Text className="text-white">{user && getFormattedInitial(user)}</Text>
            <View className="px-2 py-1 bg-gray-500 absolute top-1 -right-1 rounded-full">
              <Text className="text-white">12</Text>
            </View>
          </>
        </View>
      )}
      {type === "icon" && name === "list" && (
        <View className="h-full w-full flex items-center justify-center  rounded-full bg-white shadow-2xl">
          <Image
            source={require("../assets/task.png")}
            style={{ height: 20, width: 23 }}
          />
        </View>
      )}
      {type === "icon" && name === "alert" && (
        <View
          className="h-full w-full flex items-center justify-center  rounded-full bg-white shadow-2xl"
          style={{ elevation: 5 }}
        >
          <Image
            source={require("../assets/Bell.png")}
            style={{ height: 20, width: 20 }}
          />
        </View>
      )}
      <Text className="text-gray-500 font-semibold">{caption}</Text>
    </View>
  );
};

export default UserNavOption;
