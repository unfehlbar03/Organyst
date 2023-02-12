import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Modal, Alert, TextInput, FlatList } from "react-native";
import * as Linking from "expo-linking";
import Icon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import completeTask from "../utils/submitTask";
import getToken from "../utils/getToken";
import submitTaskByDocument from "../utils/submitTaskbyDocument";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";
import closeTask from "../utils/closeTask";
import createReview from "../utils/addReview";
import getTask from "../utils/get-task";
import getTaskReviews from "../utils/getTaskReviews";
import fetchUsersTokens from "../utils/fetchUsersTokens";
import sendNotifcation from "../utils/notifyUsers";
import { useIsFocused } from "@react-navigation/native";
export default function TaskDetails({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = route.params;
  const [task, setTask] = useState(null);
  const isFocused = useIsFocused();
  const [fetched, setFetched] = useState(false);
  const [file, setFile] = useState(false);
  const [mediaType, setMediaType] = useState("Image");
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const [reviewModal, setReviewModal] = useState(false);
  const user = useSelector(selectUser);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState(false);
  const [tokens, setTokens] = useState([]);
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    async function getSingleTask() {
      const token = await getToken();
      const t = await getTask(token, id);

      setTask(t.data);

      setFetched(true);
      if (t.data.files.length > 0) {
        setDone(true);
      }
    }

    async function getUsersTokens() {
      const tkns = await fetchUsersTokens([task?.leader]);
      console.log("Incoming tokens", tkns.data);
      setTokens(tkns.data);
    }

    async function getReviews() {
      const token = await getToken();
      const r = await getTaskReviews(token, id);
      console.log("Reviews", r);
      setReviews(r);
    }
    if (id) {
      getSingleTask();
      getReviews();
    }
    if (isFocused) {
      getUsersTokens();
    }
  }, [isFocused, fetched]);

  let openImagePickerAsync = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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

    let nameParts = file.fileName ? file.fileName.split(".") : getRandomName.split(".");
    let fileType = nameParts[nameParts.length - 1];

    var fileToUpload = {
      name: file.fileName ? file.fileName : getRandomName,
      size: file.fileSize,
      uri: file.uri,
      type: "application/" + fileType,
    };

    const r = await completeTask(task?._id, token, fileToUpload);

    if (r.status === "success") {
      Alert.alert("Task submitted");
      await sendNotifcation(
        tokens?.map((tkn) => tkn.deviceId),
        {
          title: `Submission Created`,
          subtitle: `${user.fullname} added  Submission for `,
        },
        user._id,

        [task.leader],

        "tasks",
        task.startDate,
        task.endDate
      );
      setTask(r.data);
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
      await sendNotifcation(
        tokens?.map((tkn) => tkn.deviceId),
        {
          title: `Submission Created`,
          subtitle: `${user.fullname} added  Submission for `,
        },
        user._id,

        [task.leader],

        "tasks",
        task.startDate,
        task.endDate
      );
      setTask(r.data);
      setDone(true);
    } else {
      Alert.alert("Error in completing Task");
    }
    setStep(0);
    setModalOpen(false);
  };

  // handle download file

  const handleFileDownload = () => {
    if (!task.files.length) {
      return Alert.alert("No attachments added yet..");
    }
    Linking.openURL(task.files[0].filepath);
  };

  // handle close the Task

  const handleCloseTask = async () => {
    if (task?.leader !== user._id) {
      return Alert.alert("This action only can be done by leader");
    }
    const token = await getToken();
    try {
      const feedback = await closeTask(task._id, token);
      if (feedback.status !== "success") {
        return Alert.alert("Task not closed, contact admins");
      }
      Alert.alert("Task marked as completed");

      setTask({ ...task, completed: true });
    } catch (e) {
      console.log(e);
    }
  };

  // handle review add

  const handleReview = async () => {
    const token = await getToken();
    if (review.length < 12) {
      return Alert.alert("Make sure review will be 12 characters long");
    }
    try {
      const feedback = await createReview(token, review, task._id);
      console.log("Feedback", feedback);
      if (feedback.status === "success") {
        Alert.alert("Review added");

        await sendNotifcation(
          tokens?.map((tkn) => tkn.deviceId),
          {
            title: `Review`,
            subtitle: `${user.fullname} added  a Review for ${task?.taskname}`,
          },
          user._id,

          [task.leader],

          "tasks",
          task.startDate,
          task.endDate
        );
        setReviewModal(false);
        setReview("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.header}>
      <View className="h-screen">
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
              <Text className="text-white/50">
                Created on:{" "}
                {`${new Date(task?.createdAt).getDate()} ${months[new Date(task?.createdAt).getMonth()]} ${new Date(task?.createdAt).getFullYear()}`}
              </Text>
              <Text className="text-white text-2xl">{task?.taskname}</Text>
              <Text className="text-white/50">
                Ending on:{" "}
                {`${new Date(task?.endDate).getDate()} ${months[new Date(task?.endDate).getMonth()]} ${new Date(task?.endDate).getFullYear()}`}
              </Text>
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

        {reviews?.length > 0 && (
          <View className="py-6 px-6 w-full">
            <Text className="text-white text-xl mb-6">Reviews</Text>
            <FlatList
              data={reviews}
              horizontal
              renderItem={({ item, index }) => (
                <TouchableOpacity className={`w-[275px] h-[115px] ${index && "ml-8"}`}>
                  <View className="py-5 px-2 bg-purple-500 w-full h-full rounded-md">
                    <Text className="text-lg text-white">{item.description}</Text>
                    <Text>Created by ${item.reviwed_by}</Text>
                  </View>
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        <View className="w-full absolute bottom-16 flex items-center justify-center px-6">
          {done && !task?.completed && (
            <TouchableOpacity
              onPress={() => {
                setReviewModal(true);
              }}
              className="w-full mb-3"
            >
              <View className=" bg-purple-900  w-full mx-auto h-[42px] items-center justify-center rounded-md">
                <Text className="font-bold text-white">Add Review</Text>
              </View>
            </TouchableOpacity>
          )}

          <View className={`w-full flex-row items-center gap-2`}>
            {user._id === task?.leader && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TaskAttachments", { task: task });
                }}
              >
                <View className=" bg-purple-900   px-3 mx-auto h-[42px] items-center justify-center rounded-md">
                  <Text className="font-bold text-white">View attachments</Text>
                </View>
              </TouchableOpacity>
            )}
            {user._id !== task?.leader && !task?.completed && (
              <TouchableOpacity
                onPress={() => {
                  setModalOpen(true);
                  setStep(0);
                }}
              >
                <View className=" bg-purple-900 w-auto  px-3 mx-auto h-[42px] items-center justify-center rounded-md">
                  <Text className="font-bold text-white">Submit File</Text>
                </View>
              </TouchableOpacity>
            )}

            {!task?.completed && (
              <TouchableOpacity
                onPress={
                  task?.completed
                    ? null
                    : () => {
                        handleCloseTask();
                      }
                }
              >
                <View className=" bg-purple-900 w-auto mx-auto h-[42px] items-center justify-center rounded-md px-3">
                  <Text className="font-bold text-white">Close this Task</Text>
                </View>
              </TouchableOpacity>
            )}

            {task?.completed && (
              <View className="bg-gray-400 w-[50%] mx-auto h-[42px] items-center justify-center rounded-md px-3">
                <Text className="font-bold text-white">Task Closed</Text>
              </View>
            )}
          </View>
        </View>

        {/*Modal Comes Here */}
        <Modal transparent={true} visible={modalOpen} animationType="fade">
          <BlurView blurType="light" style={styles.contentWrap}>
            <View className="w-[90%] px-6 py-8 bg-[#241332] rounded-md">
              <View>
                <Text className={`text-white ${step === 2 ? "text-left" : "text-center"} text-2xl font-bold`}>
                  {step === 0 && "Choose file format"}
                  {step === 1 && "What you want to do?"}
                  {step === 2 && "Confirm?"}
                </Text>
                {step === 2 && (
                  <Text className="text-white/50 my-3">
                    Tap on tick if you want to confirm the upload otherwise tap on the cancel button to cancel it.
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
                      <TouchableOpacity onPress={mediaType === "Document" ? handleTaskUploadByDocument : taskSubmit}>
                        <View className="w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
                          <MaterialIcon name="done" color={"#ffffff"} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {step === 0 && (
                  <View className="w-full mt-3 items-center">
                    <TouchableOpacity className="w-full mb-3" onPress={_pickDocument}>
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
                    <TouchableOpacity className="w-full mb-3" onPress={openCamera}>
                      <View className="w-full bg-blue-700 h-[42px] items-center justify-center rounded-full">
                        <Text className="text-white font-bold">Take Photo</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-full mb-3" onPress={openImagePickerAsync}>
                      <View className="w-full bg-pink-400 h-[42px] items-center justify-center rounded-full">
                        <Text className="text-white font-bold">Choose Image</Text>
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

        {/*Modal for Review */}

        <Modal transparent={true} visible={reviewModal} animationType="fade">
          <BlurView blurType="light" style={styles.contentWrap}>
            <View className="w-[90%] px-6 py-8 bg-[#241332] rounded-md">
              <View>
                <Text className={`text-white text-2xl font-bold`}>Write your review</Text>

                <View className="w-full mt-3 items-center">
                  <TextInput
                    className="w-full h-[125px] bg-white mb-3 rounded-md px-2 py-2"
                    placeholder="Type something...."
                    defaultValue={review}
                    onChangeText={(text) => setReview(text)}
                  />
                  <TouchableOpacity className="w-full mb-3" onPress={handleReview}>
                    <View className="w-full bg-[#BA56AC] h-[42px] items-center justify-center rounded-full">
                      <Text className="text-white font-bold uppercase">Submit</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-full"
                    onPress={() => {
                      setReviewModal(false);
                    }}
                  >
                    <View className="w-full bg-[#998FA2] h-[42px] items-center justify-center rounded-full">
                      <Text className="text-white font-bold uppercase">Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
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
