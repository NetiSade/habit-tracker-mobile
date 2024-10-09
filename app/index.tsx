import React from "react";

import { useAppStore } from "@/src/store";
import DailyHabits from "./DailyHabits";
import { SignupScreen } from "@/src/screens/SignupScreen";

export default function Home() {
  const { isAuthenticated } = useAppStore();

  return isAuthenticated ? <DailyHabits /> : <SignupScreen />;
}
