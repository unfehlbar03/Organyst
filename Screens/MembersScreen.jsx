import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeWorkplaceMembers,
  removeWorkplaceTokens,
  selectUsers,
  selectWorkplaceMembers,
  setWorkplaceDeviceTokens,
  setWorkplaceMembers,
} from "../features/appSlice";
import { selectUser } from "../features/authSlice";

const MembersScreen = ({ route, navigation }) => {
  const users = useSelector(selectUsers);
  const members = useSelector(selectWorkplaceMembers);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleAddMembers = (item, token) => {
    dispatch(setWorkplaceMembers(item._id));
    dispatch(setWorkplaceDeviceTokens(token));
  };

  const handleRemoveMembers = (id, token) => {
    dispatch(removeWorkplaceMembers(id));
    dispatch(removeWorkplaceTokens(token));
  };
  const isMemberPresent = (id) => {
    const index = members.findIndex((i) => i == id);

    return index >= 0;
  };

  return (
    <SafeAreaView>
      <View className="px-8 py-12 h-screen relative">
        <View className="flex flex-1">
          <Text className="text-xl font-bold">Select Workplace Members</Text>
          <View className="members mt-3 flex-1">
            <FlatList
              data={users.filter((u) => u._id !== user._id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                console.log("Member", item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      !isMemberPresent(item._id)
                        ? handleAddMembers(item, item.deviceId)
                        : handleRemoveMembers(item._id, item.deviceId);
                    }}
                  >
                    <View
                      key={index}
                      className={`mt-3 ${
                        isMemberPresent(item._id) ? "bg-purple-300" : "bg-white"
                      } flex-row py-4 px-3 rounded-md`}
                    >
                      <View className="w-10 h-10 bg-gray-300"></View>
                      <View className="ml-3">
                        <Text className="text-xl font-bold">
                          {item.fullname}
                        </Text>
                        <Text>{item.designation}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        {members.length > 0 && (
          <TouchableOpacity
            className=" w-full"
            onPress={() => {
              navigation.navigate("AddNewWorkplace");
            }}
          >
            <View className="w-full h-14 bg-blue-600 flex items-center justify-center rounded-md">
              <Text className="text-white font-semibold text-md">Save</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MembersScreen;
