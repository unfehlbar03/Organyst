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
import { setLeaders } from "../features/appSlice";
import UserNavOption from "../components/TaskNavOption";
import TaskModal from "../components/TaskModal";

export default function Tasks({ router, navigation }) {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();
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
        console.log("token", token);
        const user = await getUser(token);
        dispatch(setUser(user.data));
      } else {
        console.log("unauthorized");
        navigation.replace("signin");
      }
    }

    async function getUsers() {
      const token = await getToken();
      const users = await fetchUsers(token);
      if (users) {
        console.log("users", users);
        dispatch(setLeaders(users.data));
      }
    }

    async function getTasks() {
      const token = await getToken();
      const tasks = await fetchTasks(token);
      if (tasks) {
        console.log("tasks", tasks);
        setTasks(tasks.data);
      }
    }
    getUserInfo();
    getTasks();
    getUsers();
  }, [router]);
  return (
    <SafeAreaView className="relative h-screen bg-gray-300">
      <View className="bg-white py-12 px-12 flex flex-col items-center justify-center">
        <View className="flex w-[75%] flex-row   justify-between">
          <UserNavOption type="avatar" caption={"You"} />
          <UserNavOption type="icon" name="list" caption={"Tasks"} />
          <UserNavOption type="icon" name="alert" caption={"Alerts"} />
        </View>
      </View>
      <ScrollView>
        {tasks.map((task, i) => {
          return (
            <TouchableOpacity
              style={
                i % 3 == 0
                  ? styles.box1
                  : i % 3 == 1
                  ? styles.box2
                  : styles.box3
              }
              onPress={() => navigation.navigate("taskView")}
              key={i}
            >
              <View>
                <Text style={styles.txt1}>TODAY 5:30 PM</Text>
                <Text style={styles.txt2}>{task.taskname}</Text>
                <Text style={styles.txt4}>Leader Name Comes here</Text>
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
