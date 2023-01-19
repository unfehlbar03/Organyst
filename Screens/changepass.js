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
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import changePassword from "../utils/changePassword";
import getToken from "../utils/getToken";

export default function ChangePass({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPass, setCurrentPass] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [confirmPass, settConfirmPass] = React.useState("");

  const handlePasswordChange = async () => {
    const token = await getToken();
    const response = await changePassword(
      token,
      currentPass,
      pass,
      confirmPass
    );
    console.log(response);
  };

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
                  Change Password{" "}
                </Text>
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
                    placeholder="Old Password"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={currentPass}
                    onChangeText={(text) => setCurrentPass(text)}
                  />
                </View>
                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="New Password"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={pass}
                    onChangeText={(text) => setPass(text)}
                  />
                </View>
                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="Confirm Password"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={confirmPass}
                    onChangeText={(text) => settConfirmPass(text)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    paddingTop: 300,
                  }}
                >
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handlePasswordChange}
                  >
                    <Text style={styles.txt1}>CONFIRM </Text>
                  </TouchableOpacity>
                </View>
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
    paddingLeft: 22,
    paddingTop: 22,
  },
  txt4: {
    color: "#998FA2",
    fontSize: 12,
    fontWeight: "600",
    paddingLeft: 22,
  },
});
