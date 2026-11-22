import { useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import {
  clearAllFavorites,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function FavoritesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);
  const favoriteEntries = entries.filter((entry) => entry.liked);

  const confirmClearFavorites = () => {
    const executeClear = () => dispatch(clearAllFavorites());

    if (Platform.OS === "web") {
      if (
        window.confirm("Semua status favorite akan dibersihkan. Lanjutkan?")
      ) {
        executeClear();
      }
      return;
    }

    Alert.alert(
      "Hapus Semua Favorite",
      "Semua status favorite akan dibersihkan dari Redux Store.",
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus Semua", style: "destructive", onPress: executeClear },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.header}>Favorite</Text>
          <Text style={styles.counter}>
            {favoriteEntries.length} diary favorite
          </Text>
        </View>

        {favoriteEntries.length > 0 && (
          <Pressable onPress={confirmClearFavorites} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Hapus Semua</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={favoriteEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={item.liked}
            onToggleFavorite={() => dispatch(toggleFavorite(item.id))}
            onPress={() => router.push(`/detail/${item.id}` as any)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitle}>Belum ada diary favorite</Text>
            <Text style={styles.emptyDesc}>
              Tekan ikon hati pada catatan diary di halaman Home untuk
              menyimpannya ke daftar favorite.
            </Text>
            <Pressable
              onPress={() => router.replace("/" as any)}
              style={styles.emptyButton}
            >
              <Text style={styles.emptyButtonText}>Jelajahi Diary</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACE.m,
  },
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
  },
  counter: {
    color: COLORS.muted,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.danger,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: TYPO.caption,
    fontWeight: "700",
  },
  emptyBox: {
    marginTop: 40,
    padding: SPACE.xl,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    gap: SPACE.s,
  },
  emptyIcon: {
    fontSize: 42,
    color: COLORS.danger,
  },
  emptyTitle: {
    fontSize: TYPO.title,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },
  emptyDesc: {
    fontSize: TYPO.body,
    color: COLORS.muted,
    textAlign: "center",
  },
  emptyButton: {
    marginTop: SPACE.s,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
