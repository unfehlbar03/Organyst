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
} from "react-native";
import getProfile from "../utils/getProfile";
import getToken from "../utils/getToken";

import { Linking } from "react-native";
import getUserCompletedTasks from "../utils/getCompletedTasks";
import { FlatList } from "react-native";

export default function ProfileViewOne({ route, navigation }) {
  const { id } = route.params;
  const [u, setU] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);

  React.useEffect(() => {
    async function getProfileData() {
      try {
        const token = await getToken();
        const u = await getProfile(token, id);

        setU(u.data);
      } catch (e) {
        console.log(e);
      }
    }

    async function getMyCompletedTasks() {
      try {
        const token = await getToken();
        const tasks = await getUserCompletedTasks(id, token);
        console.log(tasks);
        setTasks(tasks.data);
      } catch (e) {
        console.log(e);
      }
    }
    if (id) {
      getProfileData();
      getMyCompletedTasks();
    }
  }, [id]);
  return (
    <SafeAreaView>
      <View style={styles.coverContainer}>
        <ImageBackground
          style={{ height: 300, width: "100%" }}
          source={require("../assets/Ava.png")}
        >
          <View style={{ paddingTop: 25, alignSelf: "flex-end" }}>
            <TouchableOpacity
              style={styles.circle1}
              onPress={() => {
                Linking.openURL(`tel:${u.mobile}`);
              }}
            >
              <View style={{ paddingLeft: 8, paddingTop: 8 }}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/call.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.textaline}>
            <Text style={styles.txt4}>{u?.designation} </Text>
            <Text style={styles.txt5}>{u?.fullname}</Text>
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
            <TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("profileView2", { id: id })}
            >
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
        <View className="my-8">
          {tasks && (
            <FlatList
              data={tasks}
              renderItem={({ item, index }) => {
                return (
                  <View className="flex-row w-full justify-between py-3 px-6">
                    <View style={{ alignItems: "baseline" }}>
                      <Text className="text-sm">{item.taskname}</Text>
                    </View>

                    <View>
                      <TouchableOpacity>
                        <View className="px-2 py-3 bg-purple-900 w-[110px] items-center justify-center rounded-full">
                          <Text className="text-white font-semibold">
                            Review
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
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
    color: "#8a56ac",
    fontSize: 18,
    fontWeight: "bold",
  },
  btn: {
    width: "100%",
    height: 38,
    backgroundColor: "#5F4591",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  txt7: {
    color: "white",
    fontSize: 14,
    paddingLeft: 4,
    fontWeight: "bold",
  },
  txt8: {
    color: "#9599b3",
    fontSize: 10,
    paddingTop: 6,
    fontWeight: "bold",
    marginLeft: -8,
  },
});
