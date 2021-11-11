import styled from "styled-components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";

interface Props {}

const Nav = createNativeStackNavigator();

export default function OutNav(props: Props) {
  return <Nav.Navigator screenOptions={{ headerShown: false }}></Nav.Navigator>;
}
