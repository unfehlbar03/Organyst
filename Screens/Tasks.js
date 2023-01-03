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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import RNPickerSelect from "react-native-picker-select";
import fetchTasks from "../utils/fetch-tasks";
import getUser from "../utils/get-user-info";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/authSlice";
import fetchUsers from "../utils/get-users";
import { setLeaders } from "../features/appSlice";

export default function Tasks({ router, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
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
        setTasks(tasks.data);
      }
    }
    getUserInfo();
    getTasks();
    getUsers();
  }, [router]);

  console.log("Store user", user);
  console.log("Store tasks", tasks);
  return (
    <ScrollView>
      <SafeAreaView>
        <View className="relative">
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity
              style={styles.circle2}
              onPress={() => navigation.navigate("YourProfile")}
            >
              <Image
                style={{ height: 60, width: 60, borderRadius: 30 }}
                source={require("../assets/Ava.png")}
              />
              <Text style={styles.txt5}>You</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circle2}
              onPress={() => navigation.navigate("Tasks")}
            >
              <View style={{ paddingLeft: 18, paddingTop: 18 }}>
                <Image
                  style={{ height: 20, width: 23 }}
                  source={require("../assets/task.png")}
                />
              </View>
              <Text
                style={styles.txt6}
                onPress={() => navigation.navigate("Tasks")}
              >
                Tasks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.circle2}
              onPress={() => navigation.navigate("alert")}
            >
              <View style={{ paddingLeft: 18, paddingTop: 16 }}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/Bell.png")}
                />
              </View>
              <Text style={styles.txt7}>Alerts</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text style={styles.txt11} onPress={() => setModalOpen(false)}>
              x
            </Text>
          </TouchableOpacity>
          <RNPickerSelect
            placeholder={{ label: "Select", value: null }}
            placeholderTextColor="red"
            onValueChange={(value) => console.log(value)}
            items={[
              { label: "Home", value: "home" },
              { label: "Office", value: "Office" },
            ]}
          />

          {tasks.map((task, i) => {
            return (
              <TouchableOpacity
                style={i % 2 == 0 ? styles.box1 : styles.box2}
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

          {/***************Modal Start*****************/}
          <View>
            <Modal transparent={true} visible={modalOpen} animationType="fade">
              <BlurView blurType="light" style={styles.contentWrap}>
                <View style={styles.modalView}>
                  <TouchableOpacity>
                    <Text
                      style={styles.txt10}
                      onPress={() => setModalOpen(false)}
                    >
                      x
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.txt8}>What do you want to do? </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      paddingLeft: 35,
                      paddingTop: 40,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen(false);
                        navigation.navigate("AddNewTask");
                      }}
                    >
                      <View style={styles.btn}>
                        <Text style={styles.txt9}>ADD</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ paddingTop: 20 }}
                      onPress={() => navigation.navigate("modifyTask")}
                    >
                      <View style={styles.btn1}>
                        <Text style={styles.txt9}>MODIFY</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ paddingTop: 20 }}
                      onPress={() => navigation.navigate("deleteTask")}
                    >
                      <View style={styles.btn2}>
                        <Text style={styles.txt9}>DELETE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
            </Modal>
          </View>
          {/***************Modal Ends*****************/}
          <TouchableOpacity
            className={
              "shadow-2xl -right-1 h-12 w-12 bg-white bottom-2 flex items-center justify-center text-white rounded-full z-100 fixed"
            }
            onPress={() => {
              setModalOpen(true);
            }}
          >
            <View>
              <Text className="font-bold">+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box1: {
    backgroundColor: "#d47fa6",
    height: 200,
    width: "100%",
    marginTop: 30,
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
