import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Header from "../components/Header";
import { api } from "../services/apiClient";
import { getData } from "../storage/asyncstore";
import { AddNotesRequest } from "../types/apitypes";

const AddNotescreen = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [userToken, setUserToken] = useState<string | null>(null);
  const [noteId, setNoteId] = useState<Number | null>(null);

  useEffect(() => {
    const getUserID = async () => {
      const token = await getData<string>("userToken");
      console.log("userToken", token);
      setUserToken(token); // ✅ persist in state
    };
    getUserID();
  }, []);

  const saveNote = useCallback(
    _.debounce(async (title, note, noteId) => {
      try {
        const payload: AddNotesRequest = {
          note_id: noteId,
          user_id: userToken,
          title,
          description: note,
          notes_time: new Date().toISOString(),
        };
        console.log("payload", payload);

        const responsedata = await api.post("notes/addnotes", payload);
        if (responsedata?.success && !noteId) {
          setNoteId(responsedata.responseData?.data?.note_id);
        }
      } catch (error) {
        console.log("error", error);
      }
    }, 1500),
    [userToken] // important: stable function
  );

  useEffect(() => {
    if (userToken && (title || note)) {
      saveNote(title, note, noteId);
    }
  }, [title, note, userToken]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Add Your Notes" isback={true} userprofile={false} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* Title Input */}
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#9CA3AF"
          value={title}
          onChangeText={setTitle}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Body Input */}
        <TextInput
          style={styles.noteInput}
          placeholder="Start typing your note..."
          placeholderTextColor="#9CA3AF"
          value={note}
          onChangeText={setNote}
          multiline
          textAlignVertical="top"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddNotescreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFBEA", // soft note-like background
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    fontSize: 22,
    fontFamily: "PoppinsSemiBold",
    color: "#1F2937",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    // marginVertical: 8,
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "PoppinsRegular",
    color: "#374151",
    lineHeight: 22,
    paddingTop: 8,
  },
});
