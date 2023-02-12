import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModifyUsers,
  selectUsers,
  setModifyFollowers,
  setModifyLeader,
} from "../features/appSlice";
import { selectUser } from "../features/authSlice";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native";
const TaskModifyLeader = ({ route, navigation }) => {
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { leader } = route.params;
  const [selectedLeader, setSelectedLeader] = useState(leader);

  const handleReplaceLeader = (item) => {
    setSelectedLeader(item);
  };

  const handleModifyLeader = () => {
    dispatch(setModifyLeader(selectedLeader));
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View className="h-screen py-8 px-6 relative">
        <View>
          <TouchableOpacity
            className="mb-6"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View className="w-8 h-8 bg-black items-center justify-center rounded-full">
              <Icon name="arrow-left" color={"#ffffff"} />
            </View>
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Select Task Leader</Text>
        </View>

        <ScrollView className="my-6 h-[275px]">
          {users.map((item, index) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={() => {
                  handleReplaceLeader(item._id);
                }}
              >
                <View
                  className={`px-3 py-4 ${
                    selectedLeader === item._id ? "bg-pink-300" : "bg-gray-300"
                  } mb-6 rounded-md`}
                >
                  <Text className="text-lg font-semibold">{item.fullname}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            handleModifyLeader();
          }}
        >
          <View className="-translate-y-8 w-full h-12 bg-black  items-center justify-center rounded-md flex-row gap-2">
            <Text className="text-white font-semibold">Save</Text>
            <Icon name="arrow-right" color={"#ffffff"} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TaskModifyLeader;
