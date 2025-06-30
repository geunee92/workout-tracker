import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

export type Routine = {
  id: string;
  name: string;
  sets: number;
  repsOrTime: string;
  memo?: string;
  createdAt: string;
};

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  clearRoutines: () => void;
};

const RoutineContext = createContext<RoutineContextType | null>(null);

export function useRoutines() {
  const context = useContext(RoutineContext);

  if (!context)
    throw new Error("useRoutines must be used within RoutineProvider");

  return context;
}

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("routines").then((data) => {
      if (data) {
        setRoutines(JSON.parse(data));
      }
    });
  }, []);

  const addRoutine = async (routine: Routine) => {
    const updated = [routine, ...routines];
    setRoutines(updated);
    await AsyncStorage.setItem("routines", JSON.stringify(updated));
  };

  const clearRoutines = async () => {
    setRoutines([]);
    await AsyncStorage.removeItem("routines");
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, clearRoutines }}>
      {children}
    </RoutineContext.Provider>
  );
}
