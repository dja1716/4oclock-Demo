import styled from "styled-components/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Place from "../screens/Place";
import React from "react";

interface Props {}

const NativeStack = createNativeStackNavigator();

export default function Stack(props: Props) {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="Place" component={Place} />
    </NativeStack.Navigator>
  );
}
