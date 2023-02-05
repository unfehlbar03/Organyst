import React, { useState } from "react";
import { Linking, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

function useNotifications() {
  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      return token;
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  const handleNotification = (notification) => {};

  const handleNotificationResponse = (response) => {
    console.log(response);
    // const data = response.notification.request.content.data;
    // if (data?.url) {
    //   Linking.openURL(data.url);
    // }
  };

  return {
    registerForPushNotificationsAsync,
    handleNotification,
    handleNotificationResponse,
  };
}

export default useNotifications;
