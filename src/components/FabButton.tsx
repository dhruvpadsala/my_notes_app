import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/Navigationtypes";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddNote">;
const FabButton = () => {
  const { navigate } = useNavigation<NavigationProp>();

  const handleFabbtn = () => {
    navigate("AddNote");
  };
  return (
    <TouchableOpacity style={styles.FabButtonContainer} onPress={handleFabbtn}>
      <Feather name="plus" size={24} color="#081d02ff" />
    </TouchableOpacity>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  FabButtonContainer: {
    position: "absolute", // makes it float
    bottom: 20, // distance from bottom
    right: 20, // distance from right
    backgroundColor: "#A2B9A7",
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
