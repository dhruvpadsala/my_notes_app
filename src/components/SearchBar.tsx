import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  placeholder?: string;
  value?: string;
  isGrid: boolean;
  onChangeText?: (text: string) => void;
  onChangeGrid?: () => void;
}

export const SearchBar: React.FC<Props> = ({
  placeholder,
  value,
  isGrid,
  onChangeText,
  onChangeGrid,
}) => {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="search" size={20} color="black" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || "Search..."}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={onChangeGrid}>
        <Text
          style={{
            paddingHorizontal: 5,
          }}
        >
          {isGrid ? (
            <Feather name="grid" size={24} color="black" />
          ) : (
            <Feather name="list" size={24} color="black" />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.1,
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 17,
    fontFamily: "PoppinsMedium",
  },
});
