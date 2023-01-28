import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import addTask from "../utils/addTask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import addWorkplace from "../utils/addWorkspace";
import { useDispatch, useSelector } from "react-redux";
import {
  resetWorkplaceMembers,
  selectWorkplaceMembers,
  setAction,
  setWorkplaceMembers,
} from "../features/appSlice";

export default function AddNewWorkPlace({ navigation }) {
  const members = useSelector(selectWorkplaceMembers);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

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

  const handleNewWorkPlace = async () => {
    if (members.length == 0) {
      return Alert.alert("Make sure members are selected for the workplace");
    }
    const token = await getToken();
    addWorkplace(token, {
      name,
      description,
      members,
    })
      .then(async (res) => {
        const { data } = res;
        dispatch(resetWorkplaceMembers());
        dispatch(setAction(false));
        Alert.alert("Workplace Created");
        navigation.navigate("tasks");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ScrollView className="pb-[300px]">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 40 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingLeft: 20, flexDirection: "column" }}>
                <Text style={{ fontSize: 26 }}>Add New Workplace </Text>
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
                    placeholder="Workplace Name"
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
                  source={require("../assets/SelectPeople.png")}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("MemberScreen")}
              >
                <Text style={styles.txt2}>Select People </Text>
                <Text style={styles.txt4}>
                  Select specific person for the task
                </Text>
              </TouchableOpacity>
              <Text style={styles.txt5}> > </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row", paddingTop: 80 }}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={handleNewWorkPlace}
                >
                  <Text style={styles.txt1}>ADD Workplace </Text>
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
    backgroundColor: "#707070",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: "column",
    display: "flex",
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  btn2: {
    width: 170,
    backgroundColor: "#707070",
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "column",
    display: "flex",
    paddingHorizontal: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
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
