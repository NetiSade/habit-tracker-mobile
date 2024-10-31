import React, { useEffect } from "react";

import { ActivityIndicator } from "react-native";
import { authLogic } from "@/src/logic/authLogic";
import { useRouter } from "expo-router";
import { useAppStore } from "@/src/store";

export default function Home() {
  const router = useRouter();

  const userId = useAppStore().userId;

  useEffect(() => {
    authLogic.init().then((res) => {
      if (res) {
        router.replace("/dailyHabits");
      } else {
        !!userId ? router.replace("/login") : router.replace("/signup");
      }
    });
  }, []);

  return <ActivityIndicator style={{ flex: 1, justifyContent: "center" }} />;
}
