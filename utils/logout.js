import AsyncStorage from "@react-native-async-storage/async-storage";

const logout = async () => {
  try {
    await AsyncStorage.removeItem("@jwt_token");
    return true;
  } catch (e) {
    // remove error
    return false;
  }
};

export default logout;
