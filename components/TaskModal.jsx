import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectAction, setAction } from "../features/appSlice";
const TaskModal = ({ open, setOpen }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const action = useSelector(selectAction);
  console.log("Action", action);
  return (
    <View>
      <Modal transparent={true} visible={open} animationType="fade">
        <BlurView blurType="light" style={styles.contentWrap}>
          <View style={styles.modalView}>
            <TouchableOpacity>
              <Text
                style={styles.txt10}
                onPress={() => {
                  setOpen(false);
                  dispatch(setAction(false));
                }}
              >
                x
              </Text>
            </TouchableOpacity>
            <Text style={styles.txt8}>What do you want to do? </Text>
            {action ? (
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 35,
                  paddingTop: 40,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setOpen(false);
                    action === "Workplace"
                      ? navigation.navigate("AddNewWorkplace")
                      : navigation.navigate("AddNewTask");
                  }}
                >
                  <View style={styles.btn}>
                    <Text style={styles.txt9}>ADD</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: 20 }}
                  onPress={() => navigation.navigate("modifyTask")}
                >
                  <View style={styles.btn1}>
                    <Text style={styles.txt9}>MODIFY</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: 20 }}
                  onPress={() => navigation.navigate("deleteTask")}
                >
                  <View style={styles.btn2}>
                    <Text style={styles.txt9}>DELETE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "column",
                  paddingLeft: 35,
                  paddingTop: 40,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setAction("Task"));
                  }}
                >
                  <View className="w-[245px] px-2 py-1 bg-purple-400 h-12 rounded-full flex items-center justify-center">
                    <Text className="text-white font-bold">ADD Task</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingTop: 20 }}
                  onPress={() => {
                    dispatch(setAction("Workplace"));
                  }}
                >
                  <View className="w-[245px] px-2 py-1 bg-green-400 h-12 rounded-full flex items-center justify-center">
                    <Text className="text-white font-bold">Add Workplace</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  box1: {
    backgroundColor: "#d47fa6",
    height: 200,
    width: "100%",
    marginTop: 30,
    elevation: 3,
  },
  addButton: {
    width: 42,
    height: 42,
    backgroundColor: "#52912e",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.25)",
    position: "absolute",
    bottom: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  box2: {
    backgroundColor: "#52912e",
    height: 200,
    width: 500,
    elevation: 3,
  },
  box3: {
    backgroundColor: "#241332",
    height: 200,
    width: 500,
    elevation: 3,
  },
  circle: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 30,
    elevation: 3,
    marginTop: -28,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  txt1: {
    color: "#f1f0f2",
    fontSize: 10,
    paddingTop: 20,
    paddingLeft: 15,
  },
  txt2: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 15,
    fontWeight: "bold",
  },
  txt3: {
    fontSize: 25,
    fontWeight: "600",
  },
  circle2: {
    backgroundColor: "white",
    height: 55,
    width: 55,
    borderRadius: 30,
    marginLeft: 0,
    marginTop: 78,
    elevation: 3,
  },
  txt4: {
    color: "#f1f0f2",
    fontSize: 10,
    paddingTop: 60,
    paddingLeft: 15,
  },
  txt5: {
    color: "#9599b3",
    fontSize: 13,
    paddingLeft: 16,
    fontWeight: "bold",
    paddingTop: 2,
  },
  txt6: {
    color: "#9599b3",
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 12,
    fontWeight: "bold",
  },
  txt7: {
    color: "#9599b3",
    fontSize: 13,
    paddingTop: 20,
    paddingLeft: 12,
    fontWeight: "bold",
  },
  txt8: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 24,
    fontWeight: "bold",
  },
  modalView: {
    width: 327,
    height: 355,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#241332",
  },
  contentWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 246,
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#8A56AC",
    elevation: 5,
  },
  btn1: {
    width: 246,
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#D47FA6",
    elevation: 5,
  },
  btn2: {
    width: 246,
    height: 44,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#998FA2",
    elevation: 5,
  },
  txt9: {
    color: "white",
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 100,
    fontWeight: "bold",
  },
  txt10: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  txt11: {
    paddingTop: 24,
    color: "black",
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "200",
    elevation: 5,
  },
});
