import React from "react";
import { StyleSheet, Text, View, TextInput, Card, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import login from "../utils/login";
export default function Signin1({ navigation }) {
   const [email, setEmail] = React.useState("");
   const [password, setPassword] = React.useState("");
   const storeData = async (token) => {
      try {
         await AsyncStorage.setItem("@jwt_token", token);
         return true;
      } catch (e) {
         // saving error
         console.log("error", e);
      }
   };

   React.useEffect(() => {
      const getData = async () => {
         try {
            const value = await AsyncStorage.getItem("@jwt_token");
            if (value !== null) {
               return value;
            }
         } catch (e) {
            // error reading value
            console.log("error", e);
            return null;
         }
      };
      getData().then((token) => {
         if (token) {
            navigation.replace("tasks");
         }
      });
   }, []);
   const handleLogin = async () => {
      console.log("Initiated");
      const auth_response = await login(email, password);
      try {
         const { token } = auth_response.data;
         if (token) {
            const store_response = await storeData(token);
            if (store_response) {
               navigation.replace("tasks");
            }
         } else {
            alert("Invalid username or password, token not generated");
         }
      } catch (e) {
         console.log(e);
         alert(auth_response.message);
      }
   };
   return (
      <SafeAreaView>
         <View style={styles.row}>
            <TouchableOpacity style={styles.plc}>
               <Text style={styles.txt2}>SIGN IN </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.plc2}>
               <Text style={styles.txt2} onPress={() => navigation.navigate("signup")}>
                  SIGN UP{" "}
               </Text>
            </TouchableOpacity>
         </View>
         <View style={styles.pass}>
            <TextInput
               style={styles.input}
               placeholder="Email"
               underlineColorAndroid={"transparent"}
               onChangeText={(e) => setEmail(e)}
               defaultValue={email}
            />
            <TextInput
               style={styles.input1}
               placeholder="Password"
               underlineColorAndroid={"transparent"}
               onChangeText={(p) => setPassword(p)}
               defaultValue={password}
               secureTextEntry={true}
            />
         </View>
         <View style={styles.aline}>
            <TouchableOpacity style={styles.con} onPress={handleLogin}>
               <Text style={styles.txt1}>CONTINUE </Text>
            </TouchableOpacity>
         </View>
         <View style={styles.aline1}>
            <TouchableOpacity style={styles.forgot}>
               <Text style={styles.txt}>FORGOT PASSWORD </Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   forgot: {
      paddingHorizontal: 100,
      width: "100%",
      height: 50,
      paddingVertical: 16,
      paddingLeft: 100,
      backgroundColor: "white",
      borderRadius: 30,
      elevation: 3,
   },
   con: {
      paddingHorizontal: 120,
      width: "100%",
      height: 50,
      paddingVertical: 16,
      paddingLeft: 115,
      backgroundColor: "#8A56AC",
      borderRadius: 30,
      elevation: 3,
   },
   aline1: {
      paddingLeft: 40,
      paddingTop: 20,
      alignSelf: "center",
   },
   aline: {
      paddingLeft: 40,
      paddingTop: 60,
      alignSelf: "center",
   },
   txt: {
      color: "#8A56AC",
      fontSize: 10,
      fontWeight: "bold",
   },
   txt1: {
      color: "white",
      fontSize: 11,
      fontWeight: "bold",
   },
   input: {
      height: 90,
      fontSize: 18,
      paddingLeft: 40,
      borderBottomColor: "#a9a9a9",
      borderBottomWidth: 1,
   },
   input1: {
      height: 90,
      fontSize: 18,
      paddingLeft: 40,
      borderBottomColor: "#a9a9a9",
      borderBottomWidth: 1,
   },
   pass: {
      paddingTop: 0,
   },
   row: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
   },
   txt2: {
      color: "#8A56AC",
      fontWeight: "bold",
   },
   plc: {
      paddingVertical: 130,
      paddingLeft: 105,
   },
   plc2: {
      paddingVertical: 130,
      paddingLeft: 120,
   },
});
