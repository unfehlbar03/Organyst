import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUser from "../utils/get-user-info";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

export default function YourProfile({ navigation }) {
   const u = useSelector(selectUser);
   const handleLogout = async () => {
      await AsyncStorage.removeItem("@jwt_token");
      try {
         const resetAction = CommonActions.reset({
            index: 1,
            routes: [{ name: "signin" }],
         });
         navigation.dispatch(resetAction);
      } catch (e) {
         console.log(e);
      }
      navigation.replace("signin", alert("You have signed out"));
   };

   console.log(u);
   return (
      <ScrollView>
         <SafeAreaView>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
               <TouchableOpacity style={styles.circle2}>
                  <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                  <Text style={styles.txt1}>You</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.circle2} onPress={() => navigation.navigate("tasks")}>
                  <View style={{ paddingLeft: 18, paddingTop: 18 }}>
                     <Image style={{ height: 20, width: 23 }} source={require("../assets/task.png")} />
                  </View>
                  <Text style={styles.txt2}>Tasks</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.circle2} onPress={() => navigation.navigate("alert")}>
                  <View style={{ paddingLeft: 18, paddingTop: 16 }}>
                     <Image style={{ height: 20, width: 20 }} source={require("../assets/Bell.png")} />
                  </View>
                  <Text style={styles.txt2}>Alerts</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.aline}>
               <View>
                  <Image style={{ height: 300, width: "100%" }} source={require("../assets/Ava.png")} />
               </View>
               {u && (
                  <View style={styles.textaline}>
                     <Text style={styles.txt4}>NUMBER OF MEETUPS</Text>
                     <Text style={styles.txt5}>{u.fullname}</Text>
                  </View>
               )}

               <View>
                  <View style={styles.aline2}>
                     <TouchableOpacity>
                        <Text style={styles.txt6} onPress={() => navigation.navigate("myleadingtask")}>
                           My Task
                        </Text>
                        <View style={styles.aline3}>
                           <Text style={styles.txt6}>></Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </View>
            </View>
            <View style={styles.aline4}>
               <TouchableOpacity onPress={() => navigation.navigate("edit1")}>
                  <Text style={styles.txt7}>Edit Profile</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.aline5}>
               <TouchableOpacity>
                  <Text style={styles.txt7}>Contact Us</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.aline5}>
               <TouchableOpacity>
                  <Text style={styles.txt7}>About Us</Text>
               </TouchableOpacity>
            </View>
            <View style={styles.aline5}>
               <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.txt7}>Log Out</Text>
               </TouchableOpacity>
            </View>
         </SafeAreaView>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   circle2: {
      backgroundColor: "white",
      height: 55,
      width: 55,
      borderRadius: 30,
      marginLeft: 0,
      marginTop: 78,
      elevation: 3,
   },
   txt1: {
      color: "#9599b3",
      fontSize: 13,
      paddingLeft: 19,
      fontWeight: "bold",
      paddingTop: 4,
   },
   txt2: {
      color: "#9599b3",
      fontSize: 13,
      paddingTop: 20,
      paddingLeft: 12,
      fontWeight: "bold",
   },
   txt3: {
      color: "#9599b3",
      fontSize: 13,
      paddingTop: 16,
      paddingLeft: 14,
      fontWeight: "bold",
   },
   txt4: {
      color: "#9599b3",
      fontSize: 13,
      paddingLeft: 24,
      fontWeight: "bold",
   },
   txt5: {
      color: "white",
      fontSize: 18,
      paddingLeft: 24,
      fontWeight: "bold",
   },
   aline: {
      paddingTop: 80,
   },
   textaline: {
      marginTop: -100,
   },
   circle1: {
      backgroundColor: "#352641",
      height: 40,
      width: 40,
      borderRadius: 30,
      marginTop: -50,
      alignSelf: "flex-end",
      elevation: 3,
   },
   aline2: {
      paddingTop: 90,
      paddingLeft: 25,
   },
   txt6: {
      color: "#352641",
      fontSize: 18,
      fontWeight: "bold",
   },
   aline3: {
      alignSelf: "flex-end",
      marginTop: -20,
      paddingRight: 20,
   },
   aline4: {
      paddingLeft: 50,
      paddingTop: 100,
   },
   aline6: {
      paddingLeft: 50,
      paddingTop: 100,
   },
   txt7: {
      color: "#9599b3",
      fontSize: 13,

      fontWeight: "bold",
   },
   aline5: {
      paddingLeft: 50,
      paddingTop: 20,
   },
});
