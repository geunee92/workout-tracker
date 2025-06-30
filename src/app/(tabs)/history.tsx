import { useRoutines } from "@/src/context/RoutineContext";
import { format } from "date-fns";
import { useMemo } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  const { routines } = useRoutines();

  // 날짜별로 루틴을 그룹화
  const sections = useMemo(() => {
    const grouped = routines.reduce((acc, routine) => {
      const date = routine.createdAt.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(routine);
      return acc;
    }, {} as Record<string, typeof routines>);

    return Object.entries(grouped).map(([date, data]) => ({
      title: format(new Date(date), "yyyy년 MM월 dd일"),
      data,
    }));
  }, [routines]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📅 운동 기록</Text>

      {sections.length === 0 ? (
        <Text style={styles.emptyText}>아직 기록된 루틴이 없습니다.</Text>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.detail}>
                세트: {item.sets} | {item.repsOrTime}
              </Text>
              {item.memo ? (
                <Text style={styles.memo}>💬 {item.memo}</Text>
              ) : null}
            </View>
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 16,
    borderRadius: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  detail: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  memo: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#666",
  },
  list: {
    paddingBottom: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 40,
    textAlign: "center",
  },
});
