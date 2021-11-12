import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Characters from "../screens/Characters";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import React from "react";
import { ONYX } from "../colors";

interface Props {}

const Tab = createBottomTabNavigator();

export default function Tabs(props: Props) {
  return (
    <Tab.Navigator screenOptions={{ headerTintColor: ONYX }}>
      <Tab.Screen name="CHARACTERS" component={Characters} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
