import { Stack } from "expo-router";
import { RoutineProvider } from "../context/RoutineContext";

export default function RootLayout() {
  return (
    <RoutineProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RoutineProvider>
  );
}
