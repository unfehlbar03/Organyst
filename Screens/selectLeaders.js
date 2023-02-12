import React, { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackgroundBase,
  Alert,
} from "react-native";

import { useSelector } from "react-redux";
import LeaderComponent from "../components/LeaderComponent";
import { selectLeader, selectUsers } from "../features/appSlice";
import getToken from "../utils/getToken";
import getWorkplace from "../utils/getWorkplaceById";

export default function SelectLeaders({ route, navigation }) {
  const users = useSelector((state) => selectUsers(state));
  const [workflowData, setWorkflowData] = useState(null);
  const { workflow, item } = route.params;

  useEffect(() => {
    async function getWorkflow() {
      const token = await getToken();
      const r = await getWorkplace(token, workflow);
      console.log(`Fetched workflow`, r);
      setWorkflowData(r.data);
    }
    if (workflow) {
      getWorkflow();
    }
  }, []);
  const leader = useSelector(selectLeader);

  const getFilteredUsers = () => {
    return users.filter((u) => !workflowData?.members.includes(u._id));
  };

  const handleSelection = () => {
    if (leader) {
      navigation.navigate("AddNewTask", { item: item });
    } else {
      Alert.alert("You have to select atleast one leader for this task.");
    }
  };

  console.log(`Filtered Users`, getFilteredUsers());

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
            <Text style={styles.txt2}>Select People</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity style={styles.txtaline}>
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
          <TouchableOpacity
            style={styles.txtaline}
            onPress={() => {
              navigation.navigate("selectFollowers", {
                item: item,
                workflow: workflow,
              });
            }}
          >
            <Text style={styles.txt4}>Followers </Text>
          </TouchableOpacity>
        </View>

        {getFilteredUsers()?.length > 0 &&
          getFilteredUsers().map((u) => {
            return <LeaderComponent key={u._id} leader={u} />;
          })}
        <TouchableOpacity
          style={{ flex: 1, flexDirection: "column-reverse", paddingTop: 50 }}
          onPress={handleSelection}
        >
          <View style={styles.button}>
            <Text style={styles.txt6}>SELECT</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    aspectRatio: 16 / 6,
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
    width: "80%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#352641",
  },
  txt6: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
