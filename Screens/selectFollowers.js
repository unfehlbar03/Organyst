import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import Follower from "../components/Follower";
import { selectTaskFollowers, selectUsers } from "../features/appSlice";
import { selectUser } from "../features/authSlice";

export default function SelectFollowers({ route, navigation }) {
  const { item, workflow } = route.params;
  const users = useSelector(selectUsers);
  const followers = useSelector(selectTaskFollowers);
  const user = useSelector(selectUser);
  return (
    <SafeAreaView style={{ paddingTop: 50, elevation: 5 }}>
      <View style={styles.header}>
        <View
          style={{
            justifyContent: "flex-start",
            paddingLeft: 80,
            paddingTop: 70,
          }}
        >
          <Text style={styles.txt2}>Select People</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity
          style={styles.txtaline}
          onPress={() =>
            navigation.navigate("selectLeaders", { workflow: workflow })
          }
        >
          <Text style={styles.txt3}>Appoint Leader </Text>
        </TouchableOpacity>
        <View
          style={{
            height: 50,
            width: 1,
            borderColor: "#9599b3",
            borderWidth: 1,
          }}
        />
        <TouchableOpacity style={styles.txtaline}>
          <Text style={styles.txt4}>Followers </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full   my-6 px-4  py-6">
        <FlatList
          data={users.filter((u) => u._id !== user._id)}
          renderItem={({ item }) => <Follower key={item._id} follower={item} />}
        />
        <TouchableOpacity
          className="w-full"
          onPress={() => {
            navigation.navigate("AddNewTask", { item });
          }}
        >
          <View
            className={`w-full px-2 py-3 ${
              followers.length < 1 ? "bg-gray-400" : "bg-pink-500"
            } rounded-full flex flex-row items-center justify-center`}
          >
            <Text className="text-white font-bold">Select</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: 450,
    height: 150,
    borderBottomWidth: 0.5,
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
    fontSize: 18,
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
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  txt4: {
    color: "#D47FA6",
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
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D47FA6",
  },
  txt6: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
