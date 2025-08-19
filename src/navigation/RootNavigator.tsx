import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import AddNotescreen from "../screens/AddNotescreen";
import Notesscreen from "../screens/Notesscreen";
import Splashscreen from "../screens/Splashscreen";
import { RootStackParamList } from "../types/Navigationtypes";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={Splashscreen} />
      <Stack.Screen name="Notes" component={Notesscreen} />
      <Stack.Screen name="AddNote" component={AddNotescreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
