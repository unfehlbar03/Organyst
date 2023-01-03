import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity, ImageBackgroundBase } from "react-native";
import { Icon } from "react-native-elements";

export default function Alert({ navigation }) {
   return (
      <SafeAreaView>
         <ScrollView style={{ paddingTop: 50, elevation: 5 }}>
            <View>
               <View style={styles.header}>
                  <View style={{ justifyContent: "flex-start", paddingLeft: 80, paddingTop: 70 }}>
                     <Text style={styles.txt2}>Alerts</Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 60, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
               <View style={{ flexDirection: "row", paddingTop: 50, paddingLeft: 20 }}>
                  <View style={{ paddingLeft: 20, paddingTop: 0 }}>
                     <TouchableOpacity style={styles.circle3}>
                        <View style={{ paddingLeft: 0, paddingTop: 0 }}>
                           <Image style={{ height: 40, width: 40, borderRadius: 30 }} source={require("../assets/Ava.png")} />
                        </View>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                     <Text style={styles.txt1}>You have been assigned a new task </Text>
                     <Text style={styles.txt5}>10 hrs </Text>
                  </View>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   header: {
      width: 450,
      height: 150,
      borderBottomWidth: 0.5,
      flex: 1,
   },

   line: {
      width: 50,
      height: 100,
      color: "black",
      paddingLeft: 50,
   },

   circle1: {
      backgroundColor: "white",
      height: 25,
      width: 25,
      borderRadius: 30,
      elevation: 3,
      borderWidth: 0.2,
      borderColor: "black",
   },
   txt1: {
      color: "black",
      fontSize: 15,
      fontWeight: "bold",
      paddingLeft: 20,
   },
   circle2: {
      backgroundColor: "white",
      height: 25,
      width: 25,
      borderRadius: 30,
      elevation: 3,
      borderWidth: 0.2,
      borderColor: "black",
   },
   txt2: {
      color: "black",
      fontSize: 26,
      fontWeight: "bold",
   },
   txt3: {
      color: "#5F4591",
      fontSize: 16,
      fontWeight: "bold",
   },
   txt4: {
      color: "black",
      fontSize: 16,
      fontWeight: "bold",
   },
   txtaline: {
      paddingTop: 10,
   },
   circle3: {
      backgroundColor: "white",
      height: 40,
      width: 40,
      borderRadius: 30,
      elevation: 3,
      borderColor: "black",
   },
   txt5: {
      color: "#9599b3",
      fontSize: 13,
      paddingLeft: 24,
      fontWeight: "bold",
   },
   button: {
      width: 327,
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 30,
      backgroundColor: "#352641",
   },
   txt6: {
      color: "white",
      fontSize: 14,
      fontWeight: "bold",
   },
});
