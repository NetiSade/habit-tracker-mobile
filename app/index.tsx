import React from "react";

import { useAppStore } from "@/src/store";
import DailyHabitsScreen from "../src/screens/dailyHabits/DailyHabits";
import LoginScreen from "./login";
import { SignupScreen } from "@/src/screens/auth/SignupScreen";

export default function Home() {
  const { isAuthenticated, userId } = useAppStore();

  return isAuthenticated ? (
    <DailyHabitsScreen />
  ) : userId ? (
    <LoginScreen />
  ) : (
    <SignupScreen />
  );
}
