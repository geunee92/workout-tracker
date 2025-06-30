import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export const options = {
  title: "루틴 추가",
};

export default function AddRoutineScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [repsOrTime, setRepsOrTime] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = () => {
    if (!name || !sets || !repsOrTime) {
      Alert.alert("❗ 모든 필드를 입력해주세요.");
      return;
    }

    const newRoutine = {
      id: Date.now().toString(),
      name,
      sets: Number(sets),
      repsOrTime,
      memo,
      createdAt: new Date().toISOString(),
    };

    console.log("✅ 등록된 루틴:", newRoutine);
    Alert.alert("운동 루틴이 등록되었습니다.");

    setName("");
    setSets("");
    setRepsOrTime("");
    setMemo("");

    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>운동명</Text>

      <TextInput
        style={styles.input}
        placeholder="예: 스쿼트"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>세트 수</Text>

      <TextInput
        style={styles.input}
        placeholder="예: 3"
        value={sets}
        onChangeText={setSets}
        keyboardType="numeric"
      />

      <Text style={styles.label}>횟수 또는 시간</Text>

      <TextInput
        style={styles.input}
        placeholder="예: 15회 또는 60초"
        value={repsOrTime}
        onChangeText={setRepsOrTime}
      />

      <Text style={styles.label}>메모 (선택)</Text>

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="예: 오늘은 자세에 집중"
        value={memo}
        onChangeText={setMemo}
        multiline
      />

      <Button title="루틴 저장하기" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
  },
});
