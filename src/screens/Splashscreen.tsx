import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Toast } from "toastify-react-native";
import { images } from "../constants/images";
import { initDB } from "../db/database";
import { api } from "../services/apiClient";
import { getData, setData } from "../storage/asyncstore";
import { RootStackParamList } from "../types/Navigationtypes";
import { RegisterUserRequest, RegisterUserResponse } from "../types/apitypes";

type SplashScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  "Splash"
>;

const Splashscreen: FC<SplashScreenNavigationProp> = ({ navigation }) => {
  useEffect(() => {
    const register = async () => {
      try {
        const userToken = await getData<string>("userToken");

        if (!userToken) {
          const payload: RegisterUserRequest = {};
          const data = await api.post<RegisterUserResponse>(
            "auth/register",
            payload
          );
          if (data.success) {
            await setData("userToken", data.responseData.data[0].USERID);

            setTimeout(() => {
              navigation.replace("Notes");
            }, 1000);
          } else {
            Toast.error("Something went wrong. Please try again.");
          }
        } else {
          setTimeout(() => {
            navigation.replace("Notes");
          }, 1000);
        }
      } catch (error) {
        Toast.error("Network error. Please check your connection.");
        console.error(error);
      }
    };

    register();
    initDB();
  }, []);

  return (
    <LinearGradient colors={["#FFFBEA", "#FFF8D6"]} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.notepad} style={styles.image} />
        <Text style={styles.title}>My Notes</Text>
        <Text style={styles.subtitle}>Organize your thoughts beautifully</Text>
      </View>
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
  logoContainer: {
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: "PoppinsSemiBoldItalic",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 15,
    color: "#4b5563",
    marginTop: 8,
    fontFamily: "PoppinsRegular",
  },
});
