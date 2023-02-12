import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import changeAlertStatus from "../utils/changeAlertState";
import getToken from "../utils/getToken";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
const AlertComponent = ({ item }) => {
  const [read, setRead] = useState(item.seen);
  const navigation = useNavigation();
  const handleRead = async () => {
    try {
      const token = await getToken();
      const updated = await changeAlertStatus(item._id, token);
      console.log(updated);
      if (updated.data) {
        setRead(true);
        navigation.navigate(item.path);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TouchableOpacity onPress={handleRead}>
      <View className={`px-6 py-5 ${!read ? "bg-pink-400" : "bg-gray-200"}`}>
        <Text className={`text-xl ${!read ? "text-white" : "text-black"}`}>
          {item.title}
        </Text>
        <Text className={`${!read ? "text-white" : "text-black"}`}>
          {moment(new Date(item.createdAt)).fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AlertComponent;
