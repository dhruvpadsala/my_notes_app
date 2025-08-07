import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet } from "react-native";
import { fontMap } from "./constants/fonts"; // Adjust the import path as necessary
import RootNavigator from "./navigation/RootNavigator";
const App = () => {
  const [fontsLoaded] = useFonts(fontMap);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
