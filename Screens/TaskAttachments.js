import { View, Text, FlatList, Linking } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const TaskAttachments = ({ route, navigation }) => {
  console.log(route.params);
  const { task } = route.params;

  //console.log("Files", task);

  const handleDownloadFile = (uri) => {
    Linking.openURL(uri);
  };
  return (
    <SafeAreaView>
      <View className="px-4 py-6">
        <View>
          <Text className="text-3xl">{task.taskname}</Text>
          <Text className="text-lg text-black/50">{task.description}</Text>
        </View>
        <View className="mt-8">
          <Text className="text-xl mb-3">All attachments</Text>

          <FlatList
            className="h-[465px]"
            data={task.files}
            renderItem={({ item, index }) => {
              return (
                <View className="bg-gray-200 py-8 mb-6 px-3">
                  <Text>{item.filename}</Text>
                  <Text className="my-3">
                    Submitted by:{item.submitted_by.name}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      handleDownloadFile(item.filename);
                    }}
                  >
                    <View className="w-8 h-8 bg-black items-center justify-center">
                      <Icon name="download" color={"#ffffff"} />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskAttachments;
