import { useRoutines } from "@/src/context/RoutineContext";
import { useRouter } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { routines } = useRoutines();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏋️ 오늘의 운동 루틴</Text>

      {routines.length === 0 ? (
        <Text style={styles.emptyText}>아직 등록된 루틴이 없습니다.</Text>
      ) : (
        <FlatList
          data={routines}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>

              <Text style={styles.detail}>세트: {item.sets}</Text>

              <Text style={styles.detail}>횟수/시간: {item.repsOrTime}</Text>

              {item.memo ? (
                <Text style={styles.memo}>💬 {item.memo}</Text>
              ) : null}
            </View>
          )}
        />
      )}

      <Button title="루틴 추가하기" onPress={() => router.push("/add")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  list: {
    gap: 12,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  detail: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },
  memo: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#666",
  },
});
