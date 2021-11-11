import styled from "styled-components/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Places from "../screens/Places";
import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import React from "react";

interface Props {}

const Tab = createBottomTabNavigator();

export default function Tabs(props: Props) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Places" component={Places} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
