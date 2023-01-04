import { View, Text, Modal } from "react-native";
import React from "react";

const TaskModal = ({ open, setOpen }) => {
  return (
    <View>
      <Modal transparent={true} visible={open} animationType="fade">
        <BlurView blurType="light" style={styles.contentWrap}>
          <View style={styles.modalView}>
            <TouchableOpacity>
              <Text style={styles.txt10} onPress={() => setModalOpen(false)}>
                x
              </Text>
            </TouchableOpacity>
            <Text style={styles.txt8}>What do you want to do? </Text>
            <View
              style={{
                flexDirection: "column",
                paddingLeft: 35,
                paddingTop: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                  navigation.navigate("AddNewTask");
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
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

export default TaskModal;
