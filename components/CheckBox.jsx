import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CheckBox = ({ leaders, setLeaders, leader }) => {
  const [checked, setChecked] = React.useState(false);
  console.log("ls: ", leaders);
  console.log("leader: ", leader);
  const handleAdd = () => {
    setChecked(true);
    setLeaders([...leaders, leader]);
  };
  const handleRemove = () => {
    setChecked(false);
    console.log("Leader: ", leader);

    setLeaders(leaders.filter((l) => l._id !== leader._id));
  };
  return (
    <TouchableOpacity
      className="w-6 h-6 border border-gray-400 rounded-full"
      onPress={!checked ? handleAdd : handleRemove}
    >
      {checked && <View className="w-6 h-6 bg-purple-900 rounded-full"></View>}
    </TouchableOpacity>
  );
};

export default CheckBox;
