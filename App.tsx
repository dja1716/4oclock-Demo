import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigations/InNav";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <InNav />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
