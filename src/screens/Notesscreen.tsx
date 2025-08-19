import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FabButton from "../components/FabButton";
import Header from "../components/Header";
import { NotesList } from "../components/NotesList";
import { SearchBar } from "../components/SearchBar";
import { api } from "../services/apiClient";
import { getData } from "../storage/asyncstore";

const Notesscreen = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [mynotes, setMynotes] = useState([]);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const getUserID = async () => {
      const token = await getData<string>("userToken");
      console.log("userToken", token);
      setUserToken(token); // ✅ persist in state
    };
    getUserID();
  }, []);

  const onChangeGrid = () => {
    setIsGrid(!isGrid);
  };

  const data = [
    { id: "1", title: "Card 1 jekmd" },
    { id: "2", title: "Card 2 nskmxkm s. skmas smsl kms" },
    { id: "3", title: "Card 3 mlksmskm " },
    { id: "4", title: "Card 4 kdm mdmsm msm s s skmsmlsmsmms s smsfmms" },
    { id: "5", title: "Card 5 kmma  mkldm ,dnmdvkmdflmffkmfflfklfkjflkmf" },
  ];

  const getNoteData = async () => {
    const response = await api.get(`notes/getnotes/${userToken}`);
    console.log("response==>", response);
    if (response.success) {
      setMynotes(response.responseData.data);
    }
  };

  useEffect(() => {
    getNoteData();
  }, [userToken]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFBEA" }}>
      {/* header */}

      <Header title="My Notes" isback={false} userprofile={true} />

      {/* search */}

      <SearchBar
        placeholder="Search Your Notes "
        isGrid={isGrid}
        onChangeGrid={onChangeGrid}
      />

      {/* FlatList */}
      <NotesList data={mynotes} isGrid={isGrid} />

      {/* Fab Button */}
      <FabButton />
    </SafeAreaView>
  );
};

export default Notesscreen;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    margin: 5,
    borderRadius: 8,
  },
});
