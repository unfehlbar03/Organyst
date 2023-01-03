import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "./Screens/ScreenWelcome";
import Signin1 from "./Screens/signin1";
import Signup from "./Screens/signup";
import Vcode from "./Screens/verification_code";
import Phone from "./Screens/phoneNumber";
import Tasks from "./Screens/Tasks";
import YourProfile from "./Screens/Yourprofile";
import ProfileViewOne from "./Screens/profileView1";
import ProfileViewTwo from "./Screens/profileView2";
import Myleading from "./Screens/myleadingtask";
import Myfollowing from "./Screens/myfollowingtask";
import SelectLeaders from "./Screens/selectLeaders";
import SelectFollowers from "./Screens/selectFollowers";
import MyLeadingTask1 from "./Screens/myLeadingTask1";
import DeleteTask from "./Screens/deleteTask";
import ViewTask from "./Screens/taskView";
import TaskDetails from "./Screens/taskDetails";
import Alert from "./Screens/alert";
import TaskDetails1 from "./Screens/taskDetails1";
import AddNewTask from "./Screens/AddNewTask";
import ModifyTask from "./Screens/modifyTask";
import Edit1 from "./Screens/edit1";
import ChangePass from "./Screens/changepass";
import { Provider } from "react-redux";
import store from "./store";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="hi" component={Header} />
          <Stack.Screen name="signin" component={Signin1} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="tasks" component={Tasks} />
          <Stack.Screen name="YourProfile" component={YourProfile} />
          <Stack.Screen name="taskView" component={ViewTask} />
          <Stack.Screen name="phoneNumber" component={Phone} />
          <Stack.Screen name="alert" component={Alert} />
          <Stack.Screen name="verification_code" component={Vcode} />
          <Stack.Screen name="taskDetails" component={TaskDetails} />
          <Stack.Screen name="AddNewTask" component={AddNewTask} />
          <Stack.Screen name="modifyTask" component={ModifyTask} />
          <Stack.Screen name="taskDetails1" component={TaskDetails1} />
          <Stack.Screen name="deleteTask" component={DeleteTask} />
          <Stack.Screen name="profileView1" component={ProfileViewOne} />
          <Stack.Screen name="profileView2" component={ProfileViewTwo} />
          <Stack.Screen name="myleadingtask" component={Myleading} />
          <Stack.Screen name="myfollowingtask" component={Myfollowing} />
          <Stack.Screen name="selectLeaders" component={SelectLeaders} />
          <Stack.Screen name="selectFollowers" component={SelectFollowers} />
          <Stack.Screen name="myLeadingTask1" component={MyLeadingTask1} />
          <Stack.Screen name="edit1" component={Edit1} />
          <Stack.Screen name="changepass" component={ChangePass} />
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
