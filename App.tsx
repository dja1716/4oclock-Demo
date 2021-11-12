import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { ThemeProvider } from "styled-components/native";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./navigations/Main";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <NavigationContainer>
        <Main />
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </QueryClientProvider>
  );
}
