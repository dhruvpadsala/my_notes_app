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
  const [userToken, setUserToken] = useState<string | null>(null);

  // pagination state
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  //get User Token
  useEffect(() => {
    const getUserID = async () => {
      const token = await getData<string>("userToken");
      setUserToken(token);
    };
    getUserID();
  }, []);

  // change grid
  const onChangeGrid = () => {
    setIsGrid(!isGrid);
  };

  const getNotesDataFromOffline = async () => {
    const offlineSavednotes = await getNotes(userToken);
    setToOnlineNote();
    setMynotes(offlineSavednotes); // 🔄 replace list on reset
  };

  const setToOnlineNote = async () => {
    const setToOnlineNoteData = await getNoteofNotSync(userToken);
    if (setToOnlineNoteData.length > 0) {
      let payload = {
        sync_notes: setToOnlineNoteData,
      };
      console.log("payload", payload);
      const data = await api.post<NoteSyncResponse>("notes/syncnotes", payload);
      console.log("datadata", JSON.stringify(data));
      if (
        data?.success &&
        data?.responseData?.data?.success &&
        Array.isArray(data?.responseData?.data?.data)
      ) {
        const syncedNotes = data.responseData.data.data;

        for (const note of syncedNotes) {
          await updateNoteSyncStatus(note.note_id, 1); // ✅ set sync=0 in local DB
        }
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      getNotesDataFromOffline();
    }, [userToken])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFBEA" }}>
      <Header title="My Notes" isback={false} userprofile={true} />
      <SearchBar
        placeholder="Search Your Notes "
        isGrid={isGrid}
        onChangeGrid={onChangeGrid}
      />
      <NotesList data={mynotes} isGrid={isGrid} />
      <FabButton />
    </SafeAreaView>
  );
};

export default Notesscreen;
