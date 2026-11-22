import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { addDiary, MOODS } from "../../src/features/diary/diarySlice";
import { useAppDispatch } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE } from "../../src/styles/tokens";

export default function CreateScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("😊");

  const showAlert = (heading: string, message: string) => {
    if (Platform.OS === "web") {
      window.alert(`${heading}: ${message}`);
    } else {
      Alert.alert(heading, message);
    }
  };

  const saveDiary = () => {
    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      showAlert("Validasi", "Judul dan isi wajib diisi.");
      return;
    }

    if (trimmedTitle.length < 3) {
      showAlert("Validasi", "Judul minimal harus 3 karakter.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    dispatch(
      addDiary({
        title: trimmedTitle,
        date: today,
        preview: trimmedBody.slice(0, 100),
        body: trimmedBody,
        mood,
      }),
    );

    setTitle("");
    setBody("");
    setMood("😊");
    router.replace("/" as any);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tambah Diary</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Judul diary (minimal 3 karakter)"
        style={styles.input}
      />

      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Ceritakan harimu..."
        multiline
        style={[styles.input, styles.bodyInput]}
      />

      <View style={styles.moodRow}>
        {MOODS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setMood(item)}
            style={[styles.moodButton, mood === item && styles.selectedMood]}
          >
            <Text style={styles.mood}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={saveDiary} style={styles.button}>
        <Text style={styles.buttonText}>Simpan ke Redux</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    gap: SPACE.m,
    backgroundColor: COLORS.background,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: 12,
    backgroundColor: COLORS.surface,
  },
  bodyInput: {
    minHeight: 140,
    textAlignVertical: "top",
  },
  moodRow: {
    flexDirection: "row",
    gap: SPACE.s,
  },
  moodButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  selectedMood: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  mood: {
    fontSize: 28,
  },
  button: {
    padding: 14,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
