import { Colors } from "@/src/constants/Colors";
import { useRoutines } from "@/src/context/RoutineContext";
import { useColorScheme } from "@/src/hooks/useColorScheme.web";
import { format } from "date-fns";
import { useMemo } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
  const { routines } = useRoutines();

  const colorScheme = useColorScheme() ?? "light";
  const styles = getStyles(colorScheme);

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

export function getStyles(theme: "light" | "dark") {
  return StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 12,
      color: Colors[theme].text,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "600",
      backgroundColor: theme === "light" ? "#f0f0f0" : "#222", // 하드코딩 대신 조건
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginTop: 16,
      borderRadius: 4,
      color: Colors[theme].text,
    },
    card: {
      backgroundColor: Colors[theme].background,
      borderWidth: 1,
      borderColor: Colors[theme].tabIconDefault,
      padding: 12,
      marginVertical: 6,
      borderRadius: 8,
    },
    name: {
      fontSize: 16,
      fontWeight: "600",
      color: Colors[theme].text,
    },
    detail: {
      fontSize: 14,
      color: Colors[theme].icon,
      marginTop: 4,
    },
    memo: {
      marginTop: 6,
      fontStyle: "italic",
      color: Colors[theme].icon,
    },
    list: {
      paddingBottom: 40,
    },
    emptyText: {
      fontSize: 16,
      color: Colors[theme].icon,
      marginTop: 40,
      textAlign: "center",
    },
  });
}
