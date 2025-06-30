import { Colors } from "@/src/constants/Colors";
import { useRoutines } from "@/src/context/RoutineContext";
import { useColorScheme } from "@/src/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { routines, removeRoutine } = useRoutines();

  const router = useRouter();

  const colorScheme = useColorScheme() ?? "light";
  const styles = getStyles(colorScheme);

  const handleDelete = (id: string) => {
    Alert.alert("루틴 삭제", "정말 삭제하시겠어요?", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => removeRoutine(id),
      },
    ]);
  };

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

              <Button
                title="삭제"
                color="#d9534f"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          )}
        />
      )}

      <Button title="루틴 추가하기" onPress={() => router.push("/add")} />
    </View>
  );
}

function getStyles(theme: "light" | "dark") {
  return StyleSheet.create({
    container: {
      padding: 20,
      gap: 20,
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    heading: {
      fontSize: 22,
      fontWeight: "bold",
      color: Colors[theme].text,
    },
    emptyText: {
      fontSize: 16,
      color: Colors[theme].icon,
    },
    list: {
      gap: 12,
    },
    card: {
      padding: 16,
      borderWidth: 1,
      borderColor: Colors[theme].tabIconDefault,
      borderRadius: 8,
      backgroundColor: Colors[theme].background,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: Colors[theme].text,
    },
    detail: {
      marginTop: 4,
      fontSize: 14,
      color: Colors[theme].icon,
    },
    memo: {
      marginTop: 8,
      fontStyle: "italic",
      color: Colors[theme].icon,
    },
  });
}
