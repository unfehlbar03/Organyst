import * as Permissions from "expo-permissions";
import { Notifications } from "expo";

async function getPushNotificationPermission() {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    return false;
  }
  return true;
}

async function sendPushNotification(token, title, message, data = {}) {
  const permission = await getPushNotificationPermission();
  if (!permission) return;

  //   return await Notifications.createChannelAndroidAsync("default", {
  //     name: "default",
  //     sound: true,
  //     priority: "max",
  //     vibrate: [0, 250, 250, 250],
  //   });
}

export default sendPushNotification;
