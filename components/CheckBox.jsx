import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectLeader,
  selectTaskFollowers,
  selectTaskLeader,
} from "../features/appSlice";

const CheckBox = ({ setLeader, leader }) => {
  const [checked, setChecked] = React.useState(false);
  const leaders = useSelector(selectTaskLeader);

  const handleAdd = () => {
    setChecked(true);
    setLeader(leader);
  };
  const handleRemove = () => {
    setChecked(false);

    setLeader(leaders.filter((l) => l._id !== leader._id));
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
