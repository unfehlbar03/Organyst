import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import BeneficiaryList from "../components/BeneficiaryList";
import { useSelector } from "react-redux";
import { selectUsers } from "../features/appSlice";

const Benificiary = ({ navigation }) => {
  const users = useSelector(selectUsers);
  return (
    <SafeAreaView>
      <View className="px-4 py-6">
        <View>
          <View className="flex flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <AntIcon name="arrowleft" color={"#ffffff"} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="mt-6 flex flex-row justify-start">
            <Text className="text-3xl font-bold">Select Benificiary</Text>
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-purple-700">Contact List</Text>

          <View className="mt-6">
            {users.length && (
              <FlatList
                data={users}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <BeneficiaryList user={item} index={index} />
                )}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Benificiary;
