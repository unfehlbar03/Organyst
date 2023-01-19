import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBeneficiary, setBeneficiary } from "../features/appSlice";
import { useNavigation } from "@react-navigation/native";

const BeneficiaryList = ({ user, index }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const beneficiary = useSelector(selectBeneficiary);

  const handleSelect = () => {
    dispatch(setBeneficiary(user._id));
    navigation.navigate("AddNewTask");
  };
  return (
    <View className={`flex flex-row justify-start gap-3 mb-5 items-center`}>
      <TouchableOpacity
        onPress={() => {
          handleSelect();
        }}
      >
        <View
          className={`w-6 h-6  rounded-full border border-gray-700 ${
            beneficiary === user._id && "bg-black"
          }`}
        ></View>
      </TouchableOpacity>
      <View className="w-12 h-12 bg-gray-400 rounded-full"></View>
      <View>
        <Text className="text-lg font-bold text-purple-700">
          {user.fullname}
        </Text>
        <Text className="text-black/50">{user.designation}</Text>
      </View>
    </View>
  );
};

export default BeneficiaryList;
