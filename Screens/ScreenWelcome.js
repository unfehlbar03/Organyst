import React from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import getToken from "../utils/getToken";

export default function Header({ navigation }) {
  React.useEffect(() => {
    getToken().then((t) => {
      if (t) {
        navigation.replace("tasks");
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <View className="h-screen">
        <View className="bg-black h-[75%] relative">
          <View className="absolute -bottom-8 right-0 w-[75%]">
            <View
              className="bg-[#352641] h-[175px] py-8 px-3"
              style={{
                borderBottomLeftRadius: "65px",
              }}
            >
              <Text className="text-gray-400 text-md uppercase">Tutorial</Text>
              <Text className="text-white text-3xl font-bold">
                Welcome to Tasks.
              </Text>
              <TouchableOpacity
                className="w-[175px] h-[48px] bg-[#D47FA6] absolute right-0 -bottom-5 rounded-l-full flex items-center justify-center"
                onPress={() => navigation.navigate("signup")}
              >
                <View>
                  <Text className="text-white uppercase font-semibold">
                    Get Started
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
