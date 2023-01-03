import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackgroundBase,
} from "react-native";
import { Icon } from "react-native-elements";

export default function ProfileViewTwo({ navigation }) {
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 50, elevation: 5 }}>
        <View style={styles.coverContainer}>
          <ImageBackground
            style={{ height: 300, width: "100%" }}
            source={require("../assets/Ava.png")}
          >
            <View style={{ paddingTop: 25, alignSelf: "flex-end" }}>
              <TouchableOpacity style={styles.circle1}>
                <View style={{ paddingLeft: 8, paddingTop: 8 }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require("../assets/call.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.textaline}>
              <Text style={styles.txt4}>D e s i g n a t i o n </Text>
              <Text style={styles.txt5}>Officers's Name</Text>
            </View>
          </ImageBackground>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              paddingTop: 30,
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("profileView1")}
              >
                <View style={styles.circle2}>
                  <View style={{ paddingLeft: 12, paddingTop: 16 }}>
                    <Image
                      style={{ height: 16, width: 20 }}
                      source={require("../assets/tick.png")}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.txt8}>Task Completed </Text>
            </View>
            <View
              style={{
                height: 50,
                width: 1,
                borderColor: "#9599b3",
                borderWidth: 1,
              }}
            />
            <View>
              <TouchableOpacity>
                <View style={styles.circle3}>
                  <View style={{ paddingLeft: 12, paddingTop: 10 }}>
                    <Image
                      style={{ height: 22, width: 20 }}
                      source={require("../assets/pending.png")}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.txt8}>Task Pending </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", paddingTop: 60, paddingLeft: 20 }}
          >
            <View style={styles.circle4}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate("taskDetails")}
            >
              <Text style={styles.txt6}>Task 1</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", paddingTop: 40, paddingLeft: 20 }}
          >
            <View style={styles.circle5}></View>
            <TouchableOpacity>
              <Text style={styles.txt6}>Task 3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  coverImage: {},
  circle1: {
    backgroundColor: "white",
    height: 35,
    width: 35,
    borderRadius: 30,
    elevation: 3,
  },
  circle2: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 30,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "#8a56ac",
  },
  circle3: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 30,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: "#d47fa6",
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
  textaline: {
    paddingTop: 140,
  },
  circle4: {
    backgroundColor: "white",
    height: 25,
    width: 25,
    borderRadius: 30,
    elevation: 3,
    borderWidth: 0.2,
    borderColor: "black",
  },
  txt6: {
    color: "#d47fa6",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  btn: {
    width: 140,
    height: 38,
    backgroundColor: "#5F4591",
    paddingLeft: 20,
    elevation: 5,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  txt7: {
    color: "white",
    fontSize: 12,
    paddingLeft: 4,
    paddingTop: 10,
    fontWeight: "bold",
  },
  txt8: {
    color: "#9599b3",
    fontSize: 10,
    paddingTop: 6,
    fontWeight: "bold",
    marginLeft: -8,
  },
  circle5: {
    backgroundColor: "white",
    height: 25,
    width: 25,
    borderRadius: 30,
    elevation: 3,
    borderWidth: 0.2,
    borderColor: "black",
  },
});
