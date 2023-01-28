import React, { useState } from "react";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import forgotPassword from "../utils/forgotPassword";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = React.useState("");

  const handlePasswordChange = async () => {
    if (!email || !pass) {
      return Alert.alert("Please enter all fields");
    }
    const response = await forgotPassword(email, pass);

    const { status } = response;
    if (status !== "success") {
      Alert.alert("Error in forgoting password");
      return;
    }

    Alert.alert("Password reset successfully");
    navigation.navigate("signin");
  };

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={{ flex: 1, justifyContent: "center", paddingLeft: 40 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ paddingLeft: 20, flexDirection: "column" }}>
                <Text style={{ fontSize: 26, fontWeight: "bold" }}>
                  Forgot Password?
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
                    placeholder="Email"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="Password"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={pass}
                    onChangeText={(text) => setPass(text)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    paddingTop: 100,
                  }}
                >
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handlePasswordChange}
                  >
                    <Text style={styles.txt1}>Forgot Password </Text>
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
