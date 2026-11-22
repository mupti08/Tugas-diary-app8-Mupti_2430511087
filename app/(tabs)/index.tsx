import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import DiaryCard from "../../src/components/DiaryCard";
import {
  MOODS,
  setMoodFilter,
  toggleFavorite,
} from "../../src/features/diary/diarySlice";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { COLORS, RADIUS, SPACE, TYPO } from "../../src/styles/tokens";

export default function HomeScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entries = useAppSelector((state) => state.diary.entries);
  const moodFilter = useAppSelector((state) => state.diary.moodFilter);

  const totalDiary = useAppSelector((state) => state.diary.entries.length);
  const totalFavorite = useAppSelector(
    (state) => state.diary.entries.filter((item) => item.liked).length,
  );

  const filteredEntries =
    moodFilter === "all"
      ? entries
      : entries.filter((item) => item.mood === moodFilter);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalDiary}</Text>
          <Text style={styles.statLabel}>Total Diary</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalFavorite}</Text>
          <Text style={styles.statLabel}>Total Favorite</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <Pressable
          onPress={() => dispatch(setMoodFilter("all"))}
          style={[
            styles.filterChip,
            moodFilter === "all" && styles.filterChipActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              moodFilter === "all" && styles.filterTextActive,
            ]}
          >
            Semua
          </Text>
        </Pressable>

        {MOODS.map((mood) => (
          <Pressable
            key={mood}
            onPress={() => dispatch(setMoodFilter(mood))}
            style={[
              styles.filterChip,
              moodFilter === mood && styles.filterChipActive,
            ]}
          >
            <Text style={styles.filterEmoji}>{mood}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEntries}
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
            <Text style={styles.emptyIcon}>
              {moodFilter === "all" ? "📓" : moodFilter}
            </Text>
            <Text style={styles.emptyTitle}>
              {moodFilter === "all"
                ? "Belum ada catatan diary"
                : `Tidak ada diary dengan mood ${moodFilter}`}
            </Text>
            <Text style={styles.emptyDesc}>
              {moodFilter === "all"
                ? "Mulai tulis cerita pertamamu melalui tab Tambah."
                : "Coba pilih filter mood lain atau tampilkan semua diary."}
            </Text>
            {moodFilter === "all" ? (
              <Pressable
                onPress={() => router.push("/create" as any)}
                style={styles.emptyButton}
              >
                <Text style={styles.emptyButtonText}>Tulis Diary Baru</Text>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => dispatch(setMoodFilter("all"))}
                style={styles.emptyButton}
              >
                <Text style={styles.emptyButtonText}>Tampilkan Semua</Text>
              </Pressable>
            )}
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
  header: {
    fontSize: TYPO.h1,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: SPACE.m,
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACE.m,
    marginBottom: SPACE.m,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statLabel: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
    marginTop: 2,
  },
  filterRow: {
    flexDirection: "row",
    gap: SPACE.s,
    marginBottom: SPACE.m,
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  filterChipActive: {
    borderColor: COLORS.accent,
    backgroundColor: "#DBEAFE",
  },
  filterText: {
    fontSize: TYPO.body,
    fontWeight: "600",
    color: COLORS.text,
  },
  filterTextActive: {
    color: COLORS.accent,
  },
  filterEmoji: {
    fontSize: 18,
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
    fontSize: 40,
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
