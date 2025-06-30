import { Colors } from "@/src/constants/Colors";
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "../hooks/useColorScheme.web";

export default function NotFoundScreen() {
  const router = useRouter();

  const theme = useColorScheme() ?? "light";
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>😵 페이지를 찾을 수 없습니다</Text>
      <Text style={styles.description}>
        요청하신 경로가 존재하지 않거나, 삭제된 페이지일 수 있어요.
      </Text>

      <Button title="홈으로 돌아가기" onPress={() => router.replace("/")} />
    </View>
  );
}

export function getStyles(theme: "light" | "dark") {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
      alignItems: "center",
      gap: 20,
      backgroundColor: Colors[theme].background,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: Colors[theme].text,
    },
    description: {
      textAlign: "center",
      color: Colors[theme].icon,
    },
  });
}
