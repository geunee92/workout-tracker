import { useRoutines } from "@/src/context/RoutineContext";
import Constants from "expo-constants";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const { clearRoutines } = useRoutines();

  const handleReset = () => {
    Alert.alert(
      "정말 초기화하시겠어요?",
      "모든 운동 기록이 삭제됩니다. 이 작업은 되돌릴 수 없습니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "초기화",
          style: "destructive",
          onPress: () => {
            clearRoutines();
            Alert.alert("모든 루틴이 삭제되었습니다.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>설정</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗑 데이터 초기화</Text>

        <Button
          title="모든 루틴 삭제하기"
          color="#d9534f"
          onPress={handleReset}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ 앱 정보</Text>

        <Text>버전: {Constants.expoConfig?.version ?? "1.0.0"}</Text>

        <Text>제작자: geunee92</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 32,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
