import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { Toast } from "toastify-react-native";
import { images } from "../constants/images";
import { api } from "../services/apiClient";
import { getData, setData } from "../storage/asyncstore";
import { RootStackParamList } from "../types/Navigationtypes";
import { RegisterUserRequest, RegisterUserResponse } from "../types/apitypes";

type SplashScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

const Splashscreen: FC<SplashScreenNavigationProp> = async ({ navigation }) => {
  useEffect(() => {
    const register = async () => {
      try {
        const userToken = await getData<string>("userToken");
        console.log("userToken", userToken);

        if (!userToken) {
          const payload: RegisterUserRequest = {};
          const data = await api.post<RegisterUserResponse>(
            "auth/register",
            payload
          );
          if (data.success) {
            await setData("userToken", data.responseData.data[0].USERID);
            Toast.success("Registration successful!");
            navigation.replace("Notes");
            return;
          } else {
            Toast.error("Something went wrong. Please try again.");
          }
        } else {
          navigation.replace("Notes");
          return;
        }
      } catch (error) {
        Toast.error("Network error. Please check your connection.");
        console.error(error);
      }
    };
    register();
  }, []);

  return (
    <LinearGradient colors={["#fdfbfb", "#ebedee"]} style={styles.container}>
      <Image
        source={images.notepad} // path from current file
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
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 10,
    fontFamily: "PoppinsRegular",
  },
});
