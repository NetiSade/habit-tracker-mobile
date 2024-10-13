import React from "react";

import { useAppStore } from "@/src/store";
import DailyHabitsScreen from "../src/screens/dailyHabits/DailyHabits";
import { SignupScreen } from "@/src/screens/SignupScreen";
import { LoginScreen } from "./login";

export default function Home() {
  const { isAuthenticated } = useAppStore();

  //return <LoginScreen />;

  return isAuthenticated ? <DailyHabitsScreen /> : <SignupScreen />;
}
