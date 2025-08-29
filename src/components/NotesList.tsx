import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/Navigationtypes";

interface Note {
  note_id: string;
  title: string;
  description: string;
}

interface NotesListProps {
  data: Note[];
  isGrid: boolean;
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddNote">;

export const NotesList: React.FC<NotesListProps> = ({ data, isGrid }) => {
  const { navigate } = useNavigation<NavigationProp>();

  const handleNote = (item: Note) => {
    navigate("AddNote", { id: item.note_id });
  };

  const renderItem = ({ item }: { item: Note }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNote(item)}>
      {item.title && <Text style={styles.cardTitleText}>{item.title}</Text>}
      {item.description && (
        <Text style={styles.cardText}>{item.description}</Text>
      )}
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.note_id}
      numColumns={isGrid ? 2 : 1}
      key={isGrid ? "grid" : "list"} // forces layout change
      renderItem={renderItem}
      columnWrapperStyle={
        isGrid ? { justifyContent: "space-between" } : undefined
      }
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#F5EEDC", // clean white against beige bg
    padding: 16,
    margin: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // light Android shadow
  },
  cardText: {
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    color: "#3F3D2E", // soft dark brown for warmth
  },
  cardTitleText: {
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: "#3F3D2E", // soft dark brown for warmth
  },
});
