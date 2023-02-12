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
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/authSlice";
import getToken from "../utils/getToken";
import editProfile from "../utils/editProfile";
import getUser from "../utils/get-user-info";

export default function Edit1({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [name, setName] = useState(false);
  const [org, setOrg] = useState(false);
  const [mobile, setMobile] = useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.fullname);
      setOrg(user.organization ? user.organization : "");
      setMobile(user.mobile ? user.mobile : "");
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    let token = await getToken();
    let response = await editProfile(token, {
      name: name,
      organization: org,
      mobile: mobile,
    });
    if (response) {
      Alert.alert("Profile Updated Successfully");
      const user = await getUser(token);
      dispatch(setUser(user.data));
    } else {
      Alert.alert("Profile Updated Failed");
    }
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
                  Edit Profile{" "}
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
                    placeholder="Your Name"
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
                    placeholder="Organization"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={org}
                    onChangeText={(text) => setOrg(text)}
                  />
                </View>

                <View style={styles.inp1}>
                  <TextInput
                    style={styles.txt}
                    placeholder="Mobile Number"
                    textAlignVertical="top"
                    placeholderTextColor="#9599b3"
                    underlineColorAndroid={"#8a56ac"}
                    defaultValue={mobile}
                    onChangeText={(text) => setMobile(text)}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignSelf: "center",
                    paddingTop: 40,
                  }}
                  className="mt-16"
                >
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={handleProfileUpdate}
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
