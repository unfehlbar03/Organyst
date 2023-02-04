import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";

const TaskAttachments = ({ route, navigation }) => {
  console.log(route.params);
  //console.log("Files", task);
  return (
    <SafeAreaView>
      <View className="px-4 py-6">
        <View>
          <Text className="text-3xl">Task Name</Text>
          <Text className="text-lg text-black/50">Task Description</Text>
        </View>
        <View className="mt-8">
          <Text className="text-xl mb-3">All attachments</Text>

          <FlatList
            className="h-[465px]"
            data={[1, 2, 3, 4, 5]}
            renderItem={({ item, index }) => {
              return (
                <View className="bg-gray-200 py-8 mb-6 px-3">
                  <Text>Filename</Text>
                  <Text>Submitted by:Sumit Kumar</Text>
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
