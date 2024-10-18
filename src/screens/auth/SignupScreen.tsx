import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Button, TextInput } from "react-native-paper";

import { authLogic } from "../../logic/authLogic";

export const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const res = await authLogic.signup(username, email, password);
    if (res.success) {
      router.replace("/");
    } else {
      Alert.alert("Signup Failed");
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
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
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

      <Button
        onPress={handleSignup}
        mode="contained"
        style={styles.signupButton}
      >
        Sign Up
      </Button>
      <Button onPress={() => router.replace("/login")} mode="text">
        Already have an account? Login
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
  signupButton: {
    marginTop: 32,
    marginBottom: 8,
  },
});
