import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import TaskFollower from "../components/TaskFollower";
import getTask from "../utils/get-task";

export default function TaskView({ route, navigation }) {
  const [task, setTask] = React.useState(null);
  const { id } = route.params;
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem("@jwt_token");
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
      console.log("error", e);
      return false;
    }
  };
  React.useEffect(() => {
    async function init() {
      const task = await getTask(await getToken(), id);

      setTask(task.data);
    }
    init();
  }, [id]);

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
          <Text style={styles.txt2}>{task?.taskname}</Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 40,
            color: "#9599b3",
            fontSize: 14,
            paddingTop: 10,
            width: "90%",
          }}
        >
          {task?.description}
        </Text>
      </View>
      <View
        style={{
          paddingTop: 20,
          alignSelf: "flex-end",
          fontSize: 15,
          paddingRight: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("taskDetails", { task: task })}
        >
          <Text style={{ fontSize: 15, color: "#5F4591", fontWeight: "700" }}>
            View Task Details ->{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            paddingLeft: 40,
            color: "#352641",
            fontSize: 16,
            fontWeight: "bold",
            paddingTop: 20,
          }}
        >
          Task assigned to:
        </Text>
      </View>

      <View className="mt-6">
        {task && (
          <FlatList
            data={task.followers}
            renderItem={({ item }) => (
              <TaskFollower key={item} follower={item} />
            )}
          />
        )}
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
  txt1: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 20,
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
});
