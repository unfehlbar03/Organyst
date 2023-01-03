import React, { useState, useRef } from "react";
import { StyleSheet, SafeAreaView, useNavigation, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import sendOtp from "../utils/send_otp";

export default function Phone({ route, navigation }) {
   const { number } = route.params;
   const [value, setValue] = useState(number);

   const [valid, setValid] = useState(false);
   const [showMessage, setShowMessage] = useState(false);
   const phoneInput = useRef < PhoneInput > null;

   const handleSendotp = async () => {
      const otp_response = await sendOtp(value);
      console.log("OTP", otp_response);
      navigation.navigate("verification_code", {
         mobile: value,
      });
   };

   return (
      <ScrollView>
         <SafeAreaView>
            <KeyboardAwareScrollView style={{}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={styles.container} scrollEnabled={false}>
               <View style={styles.header}>
                  <Text style={styles.txt}>Phone Number</Text>
               </View>
               <View style={styles.aline1}>
                  <PhoneInput
                     style={{ borderRadius: 10 }}
                     useRef={phoneInput}
                     defaultValue={value}
                     defaultCode="IN"
                     onChangeFormattedText={(text) => {
                        setValue(text);
                     }}
                     withShadow
                     autoFocus
                  />
               </View>
               <View style={styles.aline}>
                  <TouchableOpacity style={styles.button} onPress={handleSendotp}>
                     <Text style={styles.txt1}>V E R I F Y </Text>
                  </TouchableOpacity>
               </View>
            </KeyboardAwareScrollView>
         </SafeAreaView>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   header: {
      height: "35%",
      paddingTop: 30,
      backgroundColor: "#352641",
      elevation: 2,
   },
   txt: {
      paddingLeft: 65,
      paddingTop: 100,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 33,
      fontWeight: "bold",
      color: "white",
   },
   button: {
      width: "90%",
      height: 50,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#352641",
   },
   aline: {
      paddingLeft: 30,
      paddingTop: 220,
   },
   aline1: {
      paddingLeft: 35,
      paddingTop: 50,
   },
   txt1: {
      color: "white",
      fontWeight: "bold",
   },
});
