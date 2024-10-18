import React from "react";

import { useAppStore } from "@/src/store";
import DailyHabitsScreen from "../src/screens/dailyHabits/DailyHabits";
import { SignupScreen } from "@/src/screens/auth/SignupScreen";

export default function Home() {
  const { isAuthenticated } = useAppStore();

  return isAuthenticated ? <DailyHabitsScreen /> : <SignupScreen />;
}
