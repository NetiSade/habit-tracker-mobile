import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, TextInput } from "react-native-paper";

import { authLogic } from "@/src/logic/authLogic";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await authLogic.login(username, password);
    if (res.success) {
      router.replace("/");
    } else {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        mode="outlined"
        textColor="#000"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        mode="outlined"
        textColor="#000"
      />
      <Button onPress={handleLogin} mode="contained" style={styles.loginButton}>
        Login
      </Button>
      <Button onPress={() => router.replace("/signup")} mode="text">
        Dont have an account? Signup
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 36,
  },
  input: {
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  loginButton: {
    marginTop: 16,
    marginBottom: 8,
  },
});

export default LoginScreen;
