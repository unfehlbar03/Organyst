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
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import AlertComponent from "../components/AlertComponent";
import { selectAlerts } from "../features/appSlice";

export default function Alert({ navigation }) {
  const alerts = useSelector(selectAlerts);
  console.log("ALERTS", alerts);
  return (
    <SafeAreaView>
      <View className="h-screen">
        <View className="py-12 px-8">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View>
              <Icon name="arrow-left" />
            </View>
          </TouchableOpacity>
          <View className="mt-6">
            <Text className="text-2xl font-bold">Alerts</Text>
          </View>
        </View>

        <ScrollView className="user-alerts">
          {alerts?.map((item, index) => {
            return <AlertComponent key={item._id} item={item} />;
          })}
        </ScrollView>
      </View>
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
