import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🏠 오늘의 루틴</Text>
      <Button title="루틴 추가하기" onPress={() => router.push("/add")} />
    </View>
  );
}
