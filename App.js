import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Screens/ScreenWelcome";
import Signin1 from "./Screens/signin1";
import Signup from "./Screens/signup";
import Vcode from "./Screens/verification_code";
import Phone from "./Screens/phoneNumber";
import Tasks from "./Screens/Tasks";
import Workspaces from "./Screens/Workspaces";
import YourProfile from "./Screens/Yourprofile";
import ProfileViewOne from "./Screens/profileView1";
import ProfileViewTwo from "./Screens/profileView2";
import Myleading from "./Screens/myleadingtask";
import Myfollowing from "./Screens/myfollowingtask";
import SelectLeaders from "./Screens/selectLeaders";
import ModifyWorkplace from "./Screens/ModifyWorkplace";
import SelectFollowers from "./Screens/selectFollowers";
import MyLeadingTask1 from "./Screens/myLeadingTask1";
import DeleteTask from "./Screens/deleteTask";
import ViewTask from "./Screens/taskView";
import TaskDetails from "./Screens/taskDetails";
import Alert from "./Screens/alert";
import TaskDetails1 from "./Screens/taskDetails1";
import AddNewTask from "./Screens/AddNewTask";
import ModifyTask from "./Screens/modifyTask";
import Beneficiary from "./Screens/Benificiary";
import MyTasks from "./Screens/MyTasks";
import Edit1 from "./Screens/edit1";
import ChangePass from "./Screens/changepass";
import { Provider } from "react-redux";
import store from "./store";
import { registerTranslation } from "react-native-paper-dates";
import ForgotPassword from "./Screens/ForgotPassword";
import AddNewWorkPlace from "./Screens/AddNewWorkplace";
import MembersScreen from "./Screens/MembersScreen";
import TaskAttachments from "./Screens/TaskAttachments";
import { useEffect } from "react";
const Stack = createStackNavigator();
import * as Notifications from "expo-notifications";
import useNotifications from "./hooks/useNotifications";
import TaskModifyLeader from "./Screens/TaskModifyLeader";
import TaskModifyFollowers from "./Screens/TaskModifyFollowers";
import ReviewScreen from "./Screens/ReviewScreen";
registerTranslation("en", {
  save: "Save",
  selectSingle: "Select date",
  selectMultiple: "Select dates",
  selectRange: "Select Task's Start and End Date",
  notAccordingToDateFormat: (inputFormat) => `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) => `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: "Day is not allowed",
  previous: "Previous",
  next: "Next",
  typeInDate: "Type in date",
  pickDateFromCalendar: "Pick date from calendar",
  close: "Close",
});

const isAndroid = require("react-native").Platform.OS === "android"; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal;
if (isHermesEnabled || isAndroid) {
  require("@formatjs/intl-getcanonicallocales/polyfill");
  require("@formatjs/intl-locale/polyfill");

  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-listformat/polyfill");
  require("@formatjs/intl-listformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-numberformat/polyfill");
  require("@formatjs/intl-numberformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-datetimeformat/polyfill");
  require("@formatjs/intl-datetimeformat/locale-data/en.js"); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require("@formatjs/intl-datetimeformat/add-golden-tz.js");

  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone
  if ("__setDefaultTimeZone" in Intl.DateTimeFormat) {
    //  Are you using Expo, use this instead of previous 2 lines
    Intl.DateTimeFormat.__setDefaultTimeZone(require("expo-localization").timezone);
  }
}

export default function App() {
  const { registerForPushNotificationsAsync, handleNotification, handleNotificationResponse, getNotifications } = useNotifications();
  useEffect(() => {

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener = Notifications.addNotificationReceivedListener(handleNotificationResponse);

    return () => {
      if (responseListener) {
        Notifications.removeNotificationSubscription(responseListener);
      }
    };
  }, [getNotifications()]);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="hi"
        >
          <Stack.Screen name="hi" component={Header} />
          <Stack.Screen name="signin" component={Signin1} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="tasks" component={Tasks} />
          <Stack.Screen name="modifyworkplace" component={ModifyWorkplace} />
          <Stack.Screen name="YourProfile" component={YourProfile} />
          <Stack.Screen name="taskView" component={ViewTask} />
          <Stack.Screen name="phoneNumber" component={Phone} />
          <Stack.Screen name="alert" component={Alert} />
          <Stack.Screen name="verification_code" component={Vcode} />
          <Stack.Screen name="taskDetails" component={TaskDetails} />
          <Stack.Screen name="AddNewTask" component={AddNewTask} />
          <Stack.Screen name="AddNewWorkplace" component={AddNewWorkPlace} />
          <Stack.Screen
            name="MemberScreen"
            component={MembersScreen}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="workplaces" component={Workspaces} />
          <Stack.Screen name="mytasks" component={MyTasks} />
          <Stack.Screen name="Review" component={ReviewScreen} />

          <Stack.Screen
            component={TaskAttachments}
            name="TaskAttachments"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="modifyTask" component={ModifyTask} />
          <Stack.Screen name="taskDetails1" component={TaskDetails1} />
          <Stack.Screen name="deleteTask" component={DeleteTask} />
          <Stack.Screen name="profileView" component={ProfileViewOne} />
          <Stack.Screen
            name="modifyTaskFollowers"
            component={TaskModifyFollowers}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
          <Stack.Screen name="modifyTaskLeader" component={TaskModifyLeader} />
          <Stack.Screen name="profileView2" component={ProfileViewTwo} />
          <Stack.Screen name="myleadingtask" component={Myleading} />
          <Stack.Screen name="myfollowingtask" component={Myfollowing} />
          <Stack.Screen name="selectLeaders" component={SelectLeaders} />
          <Stack.Screen name="selectFollowers" component={SelectFollowers} />
          <Stack.Screen name="myLeadingTask1" component={MyLeadingTask1} />
          <Stack.Screen name="edit1" component={Edit1} />
          <Stack.Screen name="changepass" component={ChangePass} />
          <Stack.Screen name="forgotpass" component={ForgotPassword} />
          <Stack.Screen name="beneficiary" component={Beneficiary} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
