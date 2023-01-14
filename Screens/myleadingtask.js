import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import fetchLeadingTasks from "../utils/getLeadingTasks";
import getToken from "../utils/getToken";

export default function Myleading({ navigation }) {
  const [tasks, setTasks] = React.useState(null);

  React.useEffect(() => {
    async function fetchMyLeadTasks() {
      const token = await getToken();
      const t = await fetchLeadingTasks(token);
      console.log(t);
      setTasks(t.data);
    }
    fetchMyLeadTasks();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView style={{ paddingTop: 50, elevation: 5 }}>
        <View style={styles.header}>
          <View
            style={{
              justifyContent: "flex-start",
              paddingLeft: 100,
              paddingTop: 70,
            }}
          >
            <Text style={styles.txt2}>My Tasks</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity style={styles.txtaline}>
            <Text style={styles.txt3}>Leading Tasks </Text>
          </TouchableOpacity>
          <View
            style={{
              height: 50,
              width: 1,
              borderColor: "#9599b3",
              borderWidth: 1,
            }}
          />
          <TouchableOpacity
            style={styles.txtaline}
            onPress={() => navigation.navigate("myfollowingtask")}
          >
            <Text style={styles.txt4}>Following Tasks </Text>
          </TouchableOpacity>
        </View>
        <View className="my-6">
          {tasks &&
            tasks.map((item, index) => {
              return (
                <View
                  className="flex flex-row gap-3 w-[90%] mx-auto py-3"
                  key={index}
                >
                  <View style={styles.circle1}></View>
                  <View className="flex items-start justify-start">
                    <Text className="font-bold text-lg">{item.taskname}</Text>
                    <Text className="text-black/50">
                      Given Today at 12:04 PM
                    </Text>
                  </View>
                </View>
              );
            })}
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
    color: "#5F4591",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 30,
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
});
