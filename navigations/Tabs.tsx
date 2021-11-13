import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Characters from "../screens/Characters";
import Comics from "../screens/Comics";
import Profile from "../screens/Profile";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {}

const Tab = createBottomTabNavigator();

export default function Tabs(props: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: "gold",
        headerStyle: { backgroundColor: "#cc0000" },
        tabBarStyle: {
          backgroundColor: "#004080",
        },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: "gold",
      }}
    >
      <Tab.Screen
        name="CHARACTERS"
        component={Characters}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="md-person-sharp" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Comics"
        component={Comics}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="book" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
