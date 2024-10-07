import React from "react";

import { LoginScreen } from "@/src/screens/LoginScreen";
import { useAppStore } from "@/src/store";
import DailyHabits from "./DailyHabits";

export default function Home() {
  const { isAuthenticated } = useAppStore();

  return isAuthenticated ? <DailyHabits /> : <LoginScreen />;
}
