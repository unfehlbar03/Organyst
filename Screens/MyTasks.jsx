import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTasks,
  selectWorkplaces,
  setWorkplaces,
} from "../features/appSlice";
import getToken from "../utils/getToken";
import removeWorkplace from "../utils/removeWorkplace";
import { Alert } from "react-native";
import { selectUser } from "../features/authSlice";

const MyTasks = ({ navigation }) => {
  const workplaces = useSelector(selectWorkplaces);
  const tasks = useSelector(selectTasks);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleRemove = async (id) => {
    const token = await getToken();
    const response = await removeWorkplace(token, id);

    const { message } = response;
    if (response.data) {
      dispatch(setWorkplaces(response.data));
      Alert.alert(message);
      navigation.replace("tasks");
    }
  };

  console.log("My Tasks", tasks);
  return (
    <SafeAreaView>
      <View className="px-6 py-8">
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Icon name="arrowleft" color={"#ffffff"} />
            </View>
          </TouchableOpacity>
          <Text className="text-3xl font-semibold">My Tasks</Text>
        </View>
        <View className="my-6 h-[650px]">
          {tasks.length > 0 && (
            <FlatList
              data={tasks.filter(
                (i) => i.leader === user?._id || i.createdBy === user?._id
              )}
              renderItem={({ item, index }) => {
                return (
                  <View className="px-6 py-3 bg-gray-300/30 mt-8 rounded-md relative">
                    <Text className="font-bold text-xl">{item.taskname}</Text>
                    <Text>{item.description}</Text>
                    <View className="flex-row mt-6">
                      {/* <TouchableOpacity
                        onPress={() => {
                          handleRemove(item._id);
                        }}
                      >
                        <View className=" px-3 py-3 bg-red-700/80 rounded-full">
                          <Icon name="delete" color={"#ffffff"} />
                        </View>
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("modifyTask", { item });
                        }}
                      >
                        <View className="px-3 py-3 bg-yellow-500/80 rounded-full">
                          <Icon name="edit" color={"#ffffff"} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
          {workplaces.length === 0 && (
            <View className="h-[350px] w-full items-center justify-center">
              <Text className="text-3xl text-black/50 font-semibold">
                It`s empty here.
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyTasks;
