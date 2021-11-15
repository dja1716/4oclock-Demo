import styled from "styled-components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stack from "./Stack";
import React from "react";
import MessagesNav from "./MessagesNav";

interface Props {}

export type MainStackParamList = {
  Tabs: undefined;
  Stack: undefined;
  Messages: undefined;
};

const Nav = createNativeStackNavigator();

export default function Main(props: Props) {
  return (
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stack" component={Stack} />
      <Nav.Screen name="Messages" component={MessagesNav} />
    </Nav.Navigator>
  );
}
