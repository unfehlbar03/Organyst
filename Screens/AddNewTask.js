import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";
import {
  selectLeaders,
  selectTaskFollowers,
  selectTaskLeaders,
} from "../features/appSlice";
import addTask from "../utils/addTask";
import { selectUser } from "../features/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddNewTask({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Low");
  const leaders = useSelector(selectTaskLeaders);
  const followers = useSelector(selectTaskFollowers);
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

  const handleNewTask = async () => {
    const token = await getToken();
    addTask(token, {
      name,
      description,
      subject,
      priority,
      leaders,
      followers,
      createdBy: user._id,
    })
      .then((res) => {
        console.log(res);
        const { data } = res;
        Alert.alert("Task Created", data.message);
        navigation.navigate("tasks");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log("State Leaders: ", leaders);

  const handleAddNewTask = () => {};
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 40 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  borderWidth: 2,
                  borderColor: "#8a56ac",
                }}
                source={require("../assets/Ava.png")}
              />
              <View style={{ paddingLeft: 20, flexDirection: "column" }}>
                <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                  Add New Task{" "}
                </Text>
                <View style={{ width: 180 }}>
                  <Text style={{ fontSize: 12, color: "#9599b3" }}>
                    Find your people and do your thing - together{" "}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.bottom}>
            <View>
              <View style={{ flexDirection: "column" }}>
                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="Task Name"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={name}
                    onChangeText={(text) => setName(text)}
                  />
                </View>
                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="Subject"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={subject}
                    onChangeText={(text) => setSubject(text)}
                  />
                </View>
                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="Description"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={description}
                    onChangeText={(text) => setDescription(text)}
                  />
                </View>
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 40 }}>
              <View style={{ paddingLeft: 20, marginTop: 4 }}>
                <Image
                  style={{ height: 17, width: 17 }}
                  source={require("../assets/clock.png")}
                />
              </View>
              <Text style={styles.txt2}>Task Date </Text>
              <Text style={styles.txt3}> &gt; </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <View style={{ paddingLeft: 20 }}>
                <TouchableOpacity style={styles.btn1}></TouchableOpacity>
              </View>
              <View style={{ paddingLeft: 5 }}>
                <TouchableOpacity style={styles.btn2}></TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 40 }}>
              <View style={{ paddingLeft: 20, marginTop: 4 }}>
                <Image
                  style={{ height: 17, width: 17 }}
                  source={require("../assets/SelectPeople.png")}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("selectLeaders")}
              >
                <Text style={styles.txt2}>Selecl People </Text>
                <Text style={styles.txt4}>
                  Select specific person for the task{" "}
                </Text>
              </TouchableOpacity>
              <Text style={styles.txt5}> > </Text>
            </View>
            <View style={{ flexDirection: "row", paddingTop: 40 }}>
              <View style={{ paddingLeft: 20, marginTop: 4 }}>
                <Image
                  style={{ height: 21, width: 17 }}
                  source={require("../assets/flag.png")}
                />
              </View>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <View>
                  <Modal
                    transparent={true}
                    visible={modalOpen}
                    animationType="fade"
                  >
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
                        <Text style={styles.txt8}>Choose Priority Level </Text>
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
                              setPriority("High");
                            }}
                          >
                            <View style={styles.btn4}>
                              <Text style={styles.txt9}>High</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{ paddingTop: 20 }}
                            onPress={() => {
                              setModalOpen(false);
                              setPriority("Low");
                            }}
                          >
                            <View style={styles.btn5}>
                              <Text style={styles.txt9}>Low</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </BlurView>
                  </Modal>
                </View>
                <Text style={styles.txt2}>Task Active Flag </Text>
                <Text style={styles.txt4}>
                  Select Flag according to the priority{" "}
                </Text>
              </TouchableOpacity>
              <Text style={styles.txt5}> > </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row", paddingTop: 80 }}>
                <TouchableOpacity style={styles.btn} onPress={handleNewTask}>
                  <Text style={styles.txt1}>ADD TASK </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 180,
    backgroundColor: "white",
    borderBottomWidth: 0.5,
  },
  bottom: {
    height: 700,
    backgroundColor: "#241332",
  },
  inp1: {
    paddingTop: 40,
    paddingLeft: 20,
  },
  txt: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    height: 40,
  },
  btn: {
    width: 327,
    height: 50,
    backgroundColor: "#8A56AC",
    borderRadius: 30,
    elevation: 5,
    alignItems: "center",
    paddingTop: 12,
  },
  txt1: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
  },
  txt2: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 20,
  },
  txt3: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 250,
  },
  txt4: {
    color: "#998FA2",
    fontSize: 12,
    fontWeight: "600",
    paddingLeft: 20,
  },
  txt5: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 120,
  },
  btn1: {
    width: 170,
    height: 50,
    backgroundColor: "#707070",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },
  btn2: {
    width: 170,
    height: 50,
    backgroundColor: "#707070",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    height: "40%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#241332",
  },
  btn4: {
    width: "85%",
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#8A56AC",
    elevation: 5,
  },
  btn5: {
    width: "85%",
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#D47FA6",
    elevation: 5,
  },
  txt9: {
    color: "white",
    fontSize: 14,
    paddingTop: 10,
    alignSelf: "center",
    fontWeight: "bold",
  },
  txt10: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  txt8: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 24,
    fontWeight: "bold",
  },
});
