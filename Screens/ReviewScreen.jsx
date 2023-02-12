import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { ScrollView } from "react-native";

const ReviewScreen = ({ route, navigation }) => {
  const { review } = route.params;

  console.log(review);
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="h-screen py-6 px-4">
          <View className="">
            <Text className="text-xl">Review Details</Text>
          </View>
          <View className="py-6">
            <Text>{review.description}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewScreen;
