import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authLogic } from "@/src/logic/authLogic";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authLogic.init().then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                title: "Login",
              }}
            />
            <Stack.Screen
              name="signup"
              options={{
                title: "Signup",
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </PaperProvider>
    </QueryClientProvider>
  );
}
