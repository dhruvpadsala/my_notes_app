import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../types/Navigationtypes";

type SplashScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

const Splashscreen: FC<SplashScreenNavigationProp> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Notes");
    }, 900);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={["#D8B4FE", "#818CF8"]} style={styles.container}>
      <Image
        source={require("./../../assets/animations/notepad.gif")} // path from current file
        style={styles.image}
      />
      <Text style={styles.title}>My Notes</Text>
      <Text style={styles.subtitle}>Organize your thoughts beautifully</Text>
    </LinearGradient>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontFamily: "PoppinsSemiBoldItalic",
    marginTop: 20,
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#E0E7FF",
    marginTop: 10,
    fontFamily: "PoppinsRegular",
  },
});
