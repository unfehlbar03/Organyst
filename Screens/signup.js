import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Card, Alert, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useNotifications from "../hooks/useNotifications";
import signup from "../utils/signup";

export default function Signup({ navigation }) {
  const [fullname, setFullname] = React.useState("");
  const [designation, setDesignation] = React.useState("");
  const [orgainization, setOrgainization] = React.useState("");
  const [fathername, setFathername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [aadhar, setAadhar] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [deviceToken, setDeviceToken] = React.useState("");

  const { registerForPushNotificationsAsync } = useNotifications();

  useEffect(() => {
    async function getToken() {
      console.log("Device Token", await registerForPushNotificationsAsync());
      setDeviceToken(await registerForPushNotificationsAsync());
    }
    getToken();
  }, []);

  // handle signup

  const handleSignup = async () => {

    if (!fullname || !email || !password) {
      Alert.alert("Enter all mandatory fields");
      return;
    }
    const response = await signup(
      fullname,
      designation,
      orgainization,
      fathername,
      password,
      mobile,
      email,
      aadhar,
      dob,
      deviceToken
    );

  

    if (response) {
      navigation.navigate("phoneNumber", {
        email: email,
      });
    } else {
      Alert.alert("Signup Failed");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={true}>
        <View style={styles.signup}>
          <View className="py-6 w-[75%]  flex-row items-center justify-between mx-auto my-12">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signin");
              }}
            >
              <Text className="uppercase text-white/50">Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("signup");
              }}
            >
              <Text className="uppercase text-white">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            underlineColorAndroid={"transparent"}
            onChangeText={(newText) => setFullname(newText)}
            defaultValue={fullname}
          />
          <TextInput
            style={styles.input}
            placeholder="Designation"
            underlineColorAndroid={"transparent"}
            onChangeText={(designation) => setDesignation(designation)}
            defaultValue={designation}
          />
          <TextInput
            style={styles.input}
            placeholder="Organisation"
            underlineColorAndroid={"transparent"}
            onChangeText={(org) => setOrgainization(org)}
            defaultValue={orgainization}
          />
          <TextInput
            style={styles.input}
            placeholder="Father Name"
            underlineColorAndroid={"transparent"}
            onChangeText={(fname) => setFathername(fname)}
            defaultValue={fathername}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile No."
            underlineColorAndroid={"transparent"}
            onChangeText={(mob) => setMobile(mob)}
            defaultValue={mobile}
          />
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            underlineColorAndroid={"transparent"}
            onChangeText={(email) => setEmail(email)}
            defaultValue={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Adhar No."
            underlineColorAndroid={"transparent"}
            onChangeText={(aadhar) => setAadhar(aadhar)}
            defaultValue={aadhar}
          />
          <TextInput
            style={styles.input}
            placeholder="DOB"
            underlineColorAndroid={"transparent"}
            onChangeText={(dob) => setDob(dob)}
            defaultValue={dob}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            underlineColorAndroid={"transparent"}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            defaultValue={password}
          />
        </View>
        <View style={styles.aline}>
          <TouchableOpacity style={styles.con}>
            <Text style={styles.txt1} onPress={handleSignup}>
              C O N T I N U E
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signup: {
    height: 270,
    backgroundColor: "#8A56AC",
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 5,
  },
  card: {
    marginTop: -145,
    width: "80%",
    height: 510,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    alignSelf: "center",
  },

  txt: {
    color: "white",
  },
  input: {
    height: "11%",
    justifyContent: "flex-start",
    alignSelf: "stretch",
    borderBottomColor: "#a9a9a9",
    borderBottomWidth: 1,
    paddingLeft: 8,
  },
  con: {
    paddingHorizontal: 50,
    width: "100%",
    height: 50,
    paddingVertical: 16,
    backgroundColor: "#8A56AC",
    borderRadius: 30,
    elevation: 3,
  },
  txt: {
    color: "white",
    fontSize: 13,
  },
  txt1: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
  aline: {
    paddingTop: 20,
    alignSelf: "center",
    elevation: 10,
  },
});
