import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

interface Note {
  note_id: string;
  title: string;
  description: string;
}

interface NotesListProps {
  data: Note[];
  isGrid: boolean;
}

export const NotesList: React.FC<NotesListProps> = ({ data, isGrid }) => {
  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.title}</Text>
      <Text style={styles.cardText}>{item.description}</Text>
    </View>
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
});
