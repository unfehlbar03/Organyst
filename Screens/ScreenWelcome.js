import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import getToken from "../utils/getToken";

export default function Header({ navigation }) {
  const [rendered, setRendered] = React.useState(false);
  React.useEffect(() => {
    getToken().then((t) => {
      if (t) {
        setRendered(true);
        navigation.navigate("tasks");
      }
    });
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <View style={styles.PurpleStyle}>
            <Text style={styles.text} className="px-9">
              Welcome to D K
            </Text>
            <Text style={styles.text1} className="px-9">
              Perfection{" "}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btn1}></TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          className="px-3"
          onPress={() => navigation.navigate("signup")}
        >
          <Text style={styles.txt}>G E T &nbsp;&nbsp;S T A R T E D </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "83%",
    // paddingTop: 30,
    backgroundColor: "black",
  },
  PurpleStyle: {
    width: "90%",
    height: 200,
    backgroundColor: "#352641",
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 5,
    marginLeft: 70,
    marginTop: 500,
    elevation: 5,
  },
  text: {
    //   paddingLeft: 50,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 33,
    fontWeight: "bold",
    color: "white",
  },
  text1: {
    //   paddingLeft: 50,
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 33,
    fontWeight: "bold",
    color: "white",
  },
  btn: {
    width: 200,
    height: 50,
    paddingVertical: 14,
    paddingLeft: 15,
    backgroundColor: "#D47FA6",
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 3,
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  btn1: {
    height: 50,
    paddingTop: 50,
    paddingLeft: 220,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 0,
  },
  txt: {
    fontWeight: "bold",
    color: "white",
  },
});
