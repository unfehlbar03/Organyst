import { View, Text } from "react-native";
import React from "react";
import getProfile from "../utils/getProfile";
import getToken from "../utils/getToken";

const Avatar = ({ follower_id, color }) => {
  const [person, setPerson] = React.useState();

  React.useEffect(() => {
    async function fetchPerson() {
      const token = await getToken();
      const response = await getProfile(token, follower_id);

      setPerson(response.data);
    }

    fetchPerson();
  }, [follower_id]);
  const getFormattedInitial = (name) => {
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0] + words[0][1];
  };
  return (
    <View
      className={`w-6 h-6 ${color} rounded-full border border-white  flex items-center justify-center`}
    >
      {person && (
        <Text className="text-white text-xs">
          {getFormattedInitial(person.fullname)}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
