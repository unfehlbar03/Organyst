import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import getProfile from "../utils/getProfile";
import getToken from "../utils/getToken";

function TaskFollower({ follower }) {
  console.log("item", follower);
  const navigation = useNavigation();
  const [person, setPerson] = React.useState(null);
  React.useEffect(() => {
    async function fetchProfile() {
      const token = await getToken();
      const p = await getProfile(token, follower);
      console.log(p);
      setPerson(p.data);
    }
    if (follower) {
      fetchProfile();
    }
  }, [follower]);

  const getFormattedIntial = (name) => {
    const words = name.split(" ");
    return words.length > 2
      ? words[0][0] + words[1][0]
      : words[0][0] + words[0][1];
  };
  return (
    <View className="px-2 py-2 flex justify-between flex-row w-[90%] mx-auto">
      <View className="flex flex-row items-center gap-3">
        {person && (
          <View className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center">
            <Text className="text-white">
              {getFormattedIntial(person.fullname)}
            </Text>
          </View>
        )}
        {person && (
          <View>
            <Text className="font-bold">{person.fullname}</Text>
            <Text>6 Tasks assigned</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("profileView", { id: follower });
        }}
      >
        <View>
          <Text className="font-bold text-purple-700">View Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default TaskFollower;