import React, { useState, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import sendOtp from "../utils/send_otp";

export default function Phone({ route, navigation }) {
  const { email } = route.params;

  const handleSendotp = async () => {
    const otp_response = await sendOtp(email);
    console.log(otp_response);
    navigation.navigate("verification_code", {
      email: email,
    });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
          <View style={styles.header}>
            <Text style={styles.txt} className="text-center">
              Verify Email
            </Text>
          </View>
          <View className="px-12">
            <View style={styles.aline1}>
              <View className="w-full  h-12 bg-gray-300 rounded-md">
                <TextInput
                  defaultValue={email}
                  className="text-center w-full h-full pl-1 text-md font-bold text-blue-900"
                  editable={false}
                />
              </View>
            </View>
            <View style={styles.aline}>
              <TouchableOpacity style={styles.button} onPress={handleSendotp}>
                <Text style={styles.txt1}>V E R I F Y </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    backgroundColor: "#352641",
    elevation: 2,
  },
  txt: {
    paddingTop: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 33,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#352641",
  },
  aline: {
    paddingTop: 220,
  },
  aline1: {
    paddingTop: 20,
  },
  txt1: {
    color: "white",
    fontWeight: "bold",
  },
});
