import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, setTasks } from "../features/appSlice";
import fetchTasks from "../utils/fetch-tasks";
import getToken from "../utils/getToken";
import removeTask from "../utils/removeTask";

export default function DeleteTask({ navigation }) {
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const token = await getToken();
    const response = await removeTask(token, id);
    const { message } = response;
    Alert.alert(message);

    const tasks = await fetchTasks(token);
    dispatch(setTasks(tasks.data));
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ paddingTop: 50, elevation: 5 }}>
        <View style={styles.header}>
          <View
            style={{
              justifyContent: "flex-start",
              paddingLeft: 80,
              paddingTop: 70,
            }}
          >
            <Text style={styles.txt2}>All Tasks</Text>
          </View>
        </View>
        <View
          className={`flex-1  ${
            tasks.length === 0 && "py-32 items-center justify-center"
          }`}
        >
          {tasks.length > 0 ? (
            <ScrollView>
              {tasks.length > 0 &&
                tasks.map((task, i) => {
                  return (
                    <View
                      className="w-[90%] py-6 px-3 flex items-center justify-between flex-row shadow-lg border border-gray-300 mx-auto my-3"
                      key={i}
                    >
                      <View>
                        <Text className="text-xl font-bold">
                          {task.taskname}
                        </Text>
                        <Text className="text-xs text-black/50">
                          {task.subject}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => {
                          handleDelete(task._id);
                        }}
                      >
                        <Image source={require("../assets/bin.png")} />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </ScrollView>
          ) : (
            <Text className="text-xl font-semibold">No Tasks Found</Text>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
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
