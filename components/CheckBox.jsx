import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLeader, setLeader } from "../features/appSlice";

const CheckBox = ({ leader }) => {
  const [checked, setChecked] = React.useState(false);
  const ldr = useSelector(selectLeader);
  React.useEffect(() => {
    if (ldr) {
      isPersonAdded();
    }
  }, [leader, ldr]);

  const dispatch = useDispatch();

  const handleAdd = () => {
    setChecked(true);
    dispatch(setLeader(leader));
  };
  const handleRemove = () => {
    setChecked(false);
    dispatch(setLeader(null));
  };

  const isPersonAdded = () => {
    const is = ldr._id == leader._id;

    setChecked(is);
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
