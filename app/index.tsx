import React, { useEffect } from "react";

import { ActivityIndicator } from "react-native";
import { authLogic } from "@/src/logic/authLogic";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    authLogic.init().then((res) => {
      if (res) {
        router.replace("/dailyHabits");
      } else {
        router.replace("/signup");
      }
    });
  }, []);

  return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
}
