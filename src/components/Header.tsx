import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface headerprops {
  title: string;
  isback?: boolean;
  userprofile?: boolean;
}

const Header: React.FC<headerprops> = ({ title, isback, userprofile }) => {
  const navigation = useNavigation();
  const handlebackbtn = () => {
    console.log("handlebackbtn");
    navigation.goBack();
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.leftContainer}>
          {isback && (
            <TouchableOpacity
              onPress={handlebackbtn}
              activeOpacity={0.6} // controls opacity on press
              style={styles.backButton}
            >
              <Ionicons name="chevron-back-sharp" size={24} color="#333446" />
            </TouchableOpacity>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {userprofile && (
          <View style={styles.rightContainer}>
            <FontAwesome6 name="circle-user" size={24} color="#3E3F29" />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 0.95,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  backButton: {
    padding: 5, // increases touch area
    borderRadius: 50, // makes highlight circular
  },
  title: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 20,
    color: "#273F4F",
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
