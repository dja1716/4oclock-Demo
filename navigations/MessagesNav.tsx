import styled from "styled-components/native";
import { createStackNavigator } from "@react-navigation/stack";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import React from "react";

interface Props {}

const Stack = createStackNavigator();

export default function MessagesNav(props: Props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
