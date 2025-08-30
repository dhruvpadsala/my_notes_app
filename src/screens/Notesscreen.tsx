import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import FabButton from "../components/FabButton";
import Header from "../components/Header";
import { NotesList } from "../components/NotesList";
import { SearchBar } from "../components/SearchBar";
import {
  getNoteofNotSync,
  getNotes,
  updateNoteSyncStatus,
} from "../db/notesModal";
import { api } from "../services/apiClient";
import { getData } from "../storage/asyncstore";
import { NoteSyncResponse } from "../types/apitypes";

const Notesscreen = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [mynotes, setMynotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[]>([]);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  // get User Token
  useEffect(() => {
    const getUserID = async () => {
      const token = await getData<string>("userToken");
      setUserToken(token);
    };
    getUserID();
  }, []);

  // toggle grid/list
  const onChangeGrid = () => {
    setIsGrid(!isGrid);
  };

  const getNotesDataFromOffline = async () => {
    const offlineSavednotes = await getNotes(userToken);
    setToOnlineNote();
    setMynotes(offlineSavednotes);
    setFilteredNotes(offlineSavednotes); // default display
  };

  const setToOnlineNote = async () => {
    const setToOnlineNoteData = await getNoteofNotSync(userToken);
    if (setToOnlineNoteData.length > 0) {
      let payload = { sync_notes: setToOnlineNoteData };
      const data = await api.post<NoteSyncResponse>("notes/syncnotes", payload);

      if (
        data?.success &&
        data?.responseData?.data?.success &&
        Array.isArray(data?.responseData?.data?.data)
      ) {
        const syncedNotes = data.responseData.data.data;
        for (const note of syncedNotes) {
          await updateNoteSyncStatus(note.note_id, 1);
        }
      }
    }
  };

  // refresh notes when screen focuses
  useFocusEffect(
    useCallback(() => {
      getNotesDataFromOffline();
    }, [userToken])
  );

  // 🔎 search handler
  const handleSearch = (text: string) => {
    setSearchText(text);

    if (!text.trim()) {
      setFilteredNotes(mynotes);
      return;
    }

    const lowerText = text.toLowerCase();
    const results = mynotes.filter((note) => {
      const title = note.title?.toLowerCase() || "";
      const content = note.description?.toLowerCase() || "";
      return title.includes(lowerText) || content.includes(lowerText);
    });

    setFilteredNotes(results);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFBEA" }}>
      <Header title="Welcome back !" isback={false} userprofile={true} />
      <SearchBar
        placeholder="Search Your Notes "
        value={searchText}
        isGrid={isGrid}
        onChangeText={handleSearch}
        onChangeGrid={onChangeGrid}
      />
      <NotesList data={filteredNotes} isGrid={isGrid} />
      <FabButton />
    </SafeAreaView>
  );
};

export default Notesscreen;
