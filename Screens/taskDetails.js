import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import completeTask from "../utils/submitTask";
import getToken from "../utils/getToken";
import submitTaskByDocument from "../utils/submitTaskbyDocument";

export default function TaskDetails({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { task } = route.params;
  const [file, setFile] = useState(false);
  const [mediaType, setMediaType] = useState("Image");
  const [done, setDone] = useState(task?.completed);
  const [step, setStep] = useState(0);

  console.log(task);
  let openImagePickerAsync = async () => {
    try {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.canceled) {
        setFile(false);
        setModalOpen(false);
      } else {
        console.log(pickerResult);
        setFile(pickerResult.assets[0]);
        setMediaType("Image");
        setStep(2);
      }
    } catch (e) {
      console.log(e);
    }
  };

  let openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    if (result.canceled) {
      setModalOpen(false);
      setDone(false);
    } else {
      setFile(result.assets[0]);

      if (!result.cancelled) {
        setStep(2);
      } else {
        setFile(false);
        setModalOpen(false);
      }
    }
  };

  let _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const { size } = result;

    if (size > 5767168) {
      return Alert.alert("Make sure file size not exceed 5mb");
    }

    setMediaType("Document");

    setFile(result);
    setStep(2);
  };

  // handle Task Complete

  const taskSubmit = async () => {
    const token = await getToken();
    const getRandomName = new Date().getTime() + ".jpeg";

    let nameParts = file.fileName
      ? file.fileName.split(".")
      : getRandomName.split(".");
    let fileType = nameParts[nameParts.length - 1];

    var fileToUpload = {
      name: file.fileName ? file.fileName : getRandomName,
      size: file.fileSize,
      uri: file.uri,
      type: "application/" + fileType,
    };

    const r = await completeTask(task._id, token, fileToUpload);

    if (r.status === "success") {
      Alert.alert("Task submitted");
      setDone(true);
    } else {
      Alert.alert("Error in completing Task");
    }
    setStep(0);
    setModalOpen(false);
  };

  const handleTaskUploadByDocument = async () => {
    const token = await getToken();
    let nameParts = file.name.split(".");
    let fileType = nameParts[nameParts.length - 1];

    var fileToUpload = {
      name: file.name,
      size: file.size,
      uri: file.uri,
      type: "application/" + fileType,
    };
    const r = await submitTaskByDocument(task._id, token, fileToUpload);
    if (r.status === "success") {
      Alert.alert("Task submitted");
      setDone(true);
    } else {
      Alert.alert("Error in completing Task");
    }
    setStep(0);
    setModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.header}>
      <ScrollView>
        <View className="h-screen">
          {/* <View
            style={{ flexDirection: "row", paddingLeft: 80, paddingTop: 80 }}
          >
            <Text style={styles.txt2}>Task 1</Text>
          </View>
          <View
            style={{ alignSelf: "flex-end", marginTop: -18, marginRight: 10 }}
          >
            <Image
              style={{ height: 27, width: 27 }}
              source={require("../assets/clock.png")}
            />
          </View>

          <View style={{ paddingTop: 60 }}>
            <View style={styles.line}></View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ paddingLeft: 40, paddingTop: 30 }}>
              <Image
                style={{ height: 11, width: 11 }}
                source={require("../assets/Oval.png")}
              />
              <Text
                style={{
                  paddingLeft: 60,
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "white",
                  marginTop: -10,
                }}
              >
                Who May Use the Services?{" "}
              </Text>

              <View style={{ marginTop: -25, marginLeft: -6 }}>
                <Image
                  style={{ height: 27, width: 27 }}
                  source={require("../assets/person.png")}
                />
              </View>
              <View style={{ width: 300 }}>
                <Text style={styles.txt1}>
                  When one door of happiness closes, another opens, but often we
                  look so long at the closed door that we do not see the one
                  that has been opened for us.
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 50,
                  width: 320,
                  paddingTop: 50,
                  flexDirection: "column",
                }}
              >
                <Text style={styles.txt3}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    • Step 1:
                  </Text>{" "}
                  You may use the Services only if you agree to form a binding
                  contract with us and are not a person barred from receiving
                  services under the laws of the applicable jurisdiction.
                </Text>
                <Text style={styles.txt4}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    • Step 2:
                  </Text>{" "}
                  Our Privacy Policy describes how we handle the information you
                  provide to us when you use our Services.
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingTop: 80 }}>
                <Image
                  style={{ height: 32, width: 25 }}
                  source={require("../assets/shield.png")}
                />
                <Text style={styles.txt5}>Privacy </Text>
              </View>
              <View style={{ width: 300 }}>
                <Text style={styles.txt7}>
                  When one door of happiness closes, another opens, but often we
                  look so long at the closed door that we do not see the one
                  that has been opened for us.
                </Text>
              </View>
              <View style={{ paddingTop: 20 }}>
                <TouchableOpacity
                  style={styles.con}
                  onPress={() => setModalOpen(true)}
                >
                  <View>
                    <View>
                      <Modal
                        transparent={true}
                        visible={modalOpen}
                        animationType="fade"
                      >
                        <BlurView blurType="light" style={styles.contentWrap}>
                          <View style={styles.modalView}>
                            <TouchableOpacity>
                              <Text
                                style={styles.txt10}
                                onPress={() => setModalOpen(false)}
                              >
                                x
                              </Text>
                            </TouchableOpacity>
                            <Text style={styles.txt8}>Choose File Format </Text>
                            <View
                              style={{
                                flexDirection: "column",
                                paddingLeft: 35,
                                paddingTop: 40,
                              }}
                            >
                              <TouchableOpacity onPress={_pickDocument}>
                                <View style={styles.btn}>
                                  <Text style={styles.txt9}>PDF</Text>
                                </View>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{ paddingTop: 20 }}
                                onPress={() => setModal2Open(true)}
                              >
                                <View style={styles.btn1}>
                                  <View>
                                    <View>
                                      <Modal
                                        transparent={true}
                                        visible={modal2Open}
                                        animationType="fade"
                                      >
                                        <BlurView
                                          blurType="light"
                                          style={styles.contentWrap}
                                        >
                                          <View style={styles.modalView}>
                                            <TouchableOpacity>
                                              <Text
                                                style={styles.txt10}
                                                onPress={() =>
                                                  setModal2Open(false)
                                                }
                                              >
                                                x
                                              </Text>
                                            </TouchableOpacity>
                                            <Text style={styles.txt8}>
                                              What you want to do?{" "}
                                            </Text>
                                            <View
                                              style={{
                                                flexDirection: "column",
                                                paddingLeft: 35,
                                                paddingTop: 40,
                                              }}
                                            >
                                              <TouchableOpacity>
                                                <View style={styles.btn}>
                                                  <Text style={styles.txt9}>
                                                    Take Photo
                                                  </Text>
                                                </View>
                                              </TouchableOpacity>
                                              <TouchableOpacity
                                                style={{ paddingTop: 20 }}
                                                onPress={openImagePickerAsync}
                                              >
                                                <View style={styles.btn1}>
                                                  <Text style={styles.txt9}>
                                                    Choose Image
                                                  </Text>
                                                </View>
                                              </TouchableOpacity>
                                            </View>
                                          </View>
                                        </BlurView>
                                      </Modal>
                                    </View>
                                    <Text style={styles.txt9}>IMAGE</Text>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </BlurView>
                      </Modal>
                    </View>
                    <Text style={styles.txt6}>Upload File</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}

          <View className="py-8 px-6 relative border-b border-gray-200">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View>
                <Icon name="chevron-left" color={"#ffffff"} size={23} />
              </View>
            </TouchableOpacity>
            <View className="flex-row justify-between mt-6">
              <View>
                <Text className="text-white text-2xl">{task?.taskname}</Text>
                <Text className="text-white/50">Created on:4 Sept 2020</Text>
              </View>
              <View>
                <Icon name="clock" color={"#ffffff"} size={28} />
              </View>
            </View>
          </View>

          <View className="py-6 px-6">
            <Text className="text-2xl text-white">{task?.subject}</Text>
            <Text className="text-white/50 my-5">{task?.description}</Text>
          </View>

          <View className="w-full absolute bottom-16 flex items-center justify-center">
            <TouchableOpacity
              onPress={() => {
                setModalOpen(true);
              }}
            >
              <View className=" bg-blue-700 w-[210px] mx-auto h-[42px] items-center justify-center rounded-md">
                <Text className="font-bold text-white">
                  {!done ? "Upload File" : "Change File"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/*Modal Comes Here */}
          <Modal transparent={true} visible={modalOpen} animationType="fade">
            <BlurView blurType="light" style={styles.contentWrap}>
              <View className="w-[90%] px-6 py-8 bg-[#241332] rounded-md">
                <View>
                  <Text
                    className={`text-white ${
                      step === 2 ? "text-left" : "text-center"
                    } text-2xl font-bold`}
                  >
                    {step === 0 && "Choose file format"}
                    {step === 1 && "What you want to do?"}
                    {step === 2 && "Confirm?"}
                  </Text>
                  {step === 2 && (
                    <Text className="text-white/50 my-3">
                      Tap on tick if you want to confirm the upload otherwise
                      tap on the cancel button to cancel it.
                    </Text>
                  )}

                  {step === 2 && (
                    <View className="justify-end flex-row">
                      <View className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() => {
                            setFile(false);
                            setModalOpen(false);
                            setStep(0);
                          }}
                        >
                          <View className="w-10 h-10 bg-pink-500 flex items-center justify-center rounded-full">
                            <MaterialIcon name="clear" color={"#ffffff"} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={
                            mediaType === "Document"
                              ? handleTaskUploadByDocument
                              : taskSubmit
                          }
                        >
                          <View className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
                            <MaterialIcon name="done" color={"#ffffff"} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                  {step === 0 && (
                    <View className="w-full mt-3 items-center">
                      <TouchableOpacity
                        className="w-full mb-3"
                        onPress={_pickDocument}
                      >
                        <View className="w-full bg-blue-700 h-[42px] items-center justify-center rounded-full">
                          <Text className="text-white font-bold">PDF</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-full mb-3"
                        onPress={() => {
                          setStep(1);
                        }}
                      >
                        <View className="w-full bg-pink-400 h-[42px] items-center justify-center rounded-full">
                          <Text className="text-white font-bold">Image</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-full"
                        onPress={() => {
                          setModalOpen(false);
                        }}
                      >
                        <View className="w-full bg-gray-500 h-[42px] items-center justify-center rounded-full">
                          <Text className="text-white font-bold">Cancel</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}

                  {step === 1 && (
                    <View className="w-full mt-3 items-center">
                      <TouchableOpacity
                        className="w-full mb-3"
                        onPress={openCamera}
                      >
                        <View className="w-full bg-blue-700 h-[42px] items-center justify-center rounded-full">
                          <Text className="text-white font-bold">
                            Take Photo
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-full mb-3"
                        onPress={openImagePickerAsync}
                      >
                        <View className="w-full bg-pink-400 h-[42px] items-center justify-center rounded-full">
                          <Text className="text-white font-bold">
                            Choose Image
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-full"
                        onPress={() => {
                          setStep(0);
                        }}
                      >
                        <View className="relative w-full bg-gray-500 h-[42px] items-center justify-center rounded-full flex-row">
                          <View className="absolute left-3">
                            <Icon name="chevron-left" color="#ffffff" />
                          </View>
                          <Text className="text-white font-bold">Go back</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </BlurView>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 900,
    backgroundColor: "#241332",
  },
  txt2: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  line: {
    width: "100%",
    height: 1,
    borderWidth: 0.3,
    borderColor: "#9599b3",
  },
  txt1: {
    paddingTop: 20,
    color: "#998FA2",
    fontSize: 14,
    fontWeight: "bold",
  },
  txt3: {
    color: "#998FA2",
    fontSize: 14,
    fontWeight: "bold",
  },
  txt4: {
    color: "#998FA2",
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 20,
  },
  txt5: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 30,
  },
  con: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    backgroundColor: "#8A56AC",
    borderRadius: 30,
    elevation: 3,
  },
  txt6: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 15,
    alignSelf: "center",
  },
  txt7: {
    paddingTop: 10,
    color: "#998FA2",
    fontSize: 14,
    fontWeight: "bold",
  },
  contentWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 327,
    height: 305,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#241332",
  },
  txt10: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  txt8: {
    color: "white",
    fontSize: 24,
    paddingTop: 10,
    paddingLeft: 44,
    fontWeight: "bold",
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
  txt9: {
    color: "white",
    fontSize: 14,
    paddingTop: 10,
    alignSelf: "center",
    fontWeight: "bold",
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
});
