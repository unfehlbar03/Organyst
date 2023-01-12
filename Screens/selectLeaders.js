import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ImageBackgroundBase,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import LeaderComponent from "../components/LeaderComponent";
import { selectLeader, setTaskLeader } from "../features/appSlice";

export default function SelectLeaders({ navigation }) {
  const users = useSelector((state) => selectLeader(state));
  const [leaders, setLeader] = React.useState([]);
  const dispatch = useDispatch();

  const handleSelection = () => {
    dispatch(setTaskLeader(leaders));
    navigation.navigate("AddNewTask");
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
            onPress={() => navigation.navigate("selectFollowers")}
          >
            <Text style={styles.txt4}>Followers </Text>
          </TouchableOpacity>
        </View>

        {users?.length > 0 &&
          users?.map((user) => {
            return (
              <LeaderComponent
                key={user._id}
                leader={user}
                setLeaders={setLeaders}
                leaders={users}
              />
            );
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
