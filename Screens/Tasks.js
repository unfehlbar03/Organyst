import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import RNPickerSelect from "react-native-picker-select";
import fetchTasks from "../utils/fetch-tasks";
import getUser from "../utils/get-user-info";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/authSlice";
import fetchUsers from "../utils/get-users";
import { useIsFocused } from "@react-navigation/native";
import {
  setLeader,
  setUsers,
  selectTasks,
  setTasks,
} from "../features/appSlice";
import UserNavOption from "../components/TaskNavOption";
import TaskModal from "../components/TaskModal";
import Avatar from "../components/Avatar";

export default function Tasks({ router, navigation }) {
  const [open, setOpen] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const user = useSelector(selectUser);
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@jwt_token");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
      console.log("error", e);
      return false;
    }
  };

  useEffect(() => {
    async function getUserInfo() {
      if (await getToken()) {
        let token = await getToken();
        const user = await getUser(token);
        dispatch(setUser(user.data));
      } else {
        navigation.replace("signin");
      }
    }

    async function getUsers() {
      const token = await getToken();
      const users = await fetchUsers(token);
      if (users) {
        dispatch(setUsers(users.data));
      }
    }

    async function getTasks() {
      const token = await getToken();
      const tasks = await fetchTasks(token);
      if (tasks) {
        dispatch(setTasks(tasks.data));
      }
    }
    getUserInfo();
    getTasks();
    getUsers();
  }, [isFocused]);

  return (
    <SafeAreaView className="relative h-screen">
      <View className=" py-16 pt-24 px-12 flex flex-col items-center justify-center">
        <View className="flex w-[90%] flex-row  justify-between">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("YourProfile");
            }}
          >
            <UserNavOption type="avatar" caption={"You"} user={user} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("tasks");
            }}
          >
            <UserNavOption
              type="icon"
              name="list"
              caption={"Tasks"}
              user={false}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("alert");
            }}
          >
            <UserNavOption
              type="icon"
              name="alert"
              caption={"Alerts"}
              user={false}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {tasks?.map((task, i) => {
          return (
            <TouchableOpacity
              className={`${
                i % 3 == 0
                  ? "bg-pink-400"
                  : i % 3 == 1
                  ? "bg-teal-700"
                  : "bg-purple-700"
              } py-8`}
              onPress={() => navigation.navigate("taskView", { id: task._id })}
              key={i}
            >
              <View>
                <View className="flex flex-row items-center justify-between w-[90%] mx-auto  py-2">
                  <View>
                    <Text className="text-white/50">TODAY 5:30 PM</Text>
                    <Text className="text-white/90 text-2xl font-bold">
                      {task.taskname}
                    </Text>
                  </View>
                  <View>
                    {task.priority === "High" ? (
                      <Image source={require("../assets/red-flag.png")} />
                    ) : (
                      <Image source={require("../assets/green-flag.png")} />
                    )}
                  </View>
                </View>
                <View className="w-full px-3 flex flex-row items-center gap-8">
                  <View className="flex flex-row relative">
                    {task.followers.slice(0, 2).map((fl, index) => {
                      console.log(fl);
                      return (
                        <Avatar
                          follower_id={fl}
                          color={
                            index % 2 == 0 ? "bg-purple-500" : "bg-green-500"
                          }
                          key={index}
                        />
                      );
                    })}
                  </View>
                  <Text className="text-white/50">
                    Join Marie,John & 10 others
                  </Text>
                </View>
              </View>
              <View style={styles.flag}></View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        className="w-[55px] h-[55px] absolute bottom-5 right-5 bg-white flex items-center justify-center rounded-full shadow-md"
        onPress={() => setOpen(true)}
      >
        <Text className="text-2xl font-semibold">+</Text>
      </TouchableOpacity>

      <TaskModal open={open} setOpen={setOpen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box1: {
    backgroundColor: "#d47fa6",
    height: 200,
    width: "100%",
    elevation: 3,
  },
  addButton: {
    width: 42,
    height: 42,
    backgroundColor: "#52912e",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    backgroundColor: "#52912e",
    height: 200,
    width: 500,
    elevation: 3,
  },
  box3: {
    backgroundColor: "#241332",
    height: 200,
    width: 500,
    elevation: 3,
  },
  circle: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 30,
    elevation: 3,
    marginTop: -28,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  txt1: {
    color: "#f1f0f2",
    fontSize: 10,
    paddingTop: 20,
    paddingLeft: 15,
  },
  txt2: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  txt3: {
    fontSize: 25,
    fontWeight: "600",
  },
  circle2: {
    backgroundColor: "white",
    height: 55,
    width: 55,
    borderRadius: 30,
    marginLeft: 0,
    marginTop: 78,
    elevation: 3,
  },
  txt4: {
    color: "#f1f0f2",
    fontSize: 10,
    paddingTop: 60,
    paddingLeft: 15,
  },
  txt5: {
    color: "#9599b3",
    fontSize: 13,
    paddingLeft: 16,
    fontWeight: "bold",
    paddingTop: 2,
  },
  txt6: {
    color: "#9599b3",
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 12,
    fontWeight: "bold",
  },
  txt7: {
    color: "#9599b3",
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 12,
    fontWeight: "bold",
  },
  txt8: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 24,
    fontWeight: "bold",
  },
  modalView: {
    width: 327,
    height: 355,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#241332",
  },
  contentWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 246,
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#8A56AC",
    elevation: 5,
  },
  btn1: {
    width: 246,
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#D47FA6",
    elevation: 5,
  },
  btn2: {
    width: 246,
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#998FA2",
    elevation: 5,
  },
  txt9: {
    color: "white",
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 100,
    fontWeight: "bold",
  },
  txt10: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  txt11: {
    paddingTop: 24,
    color: "black",
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "200",
    elevation: 5,
  },
});
