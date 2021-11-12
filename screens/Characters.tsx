import styled from "styled-components/native";
import React from "react";
import CharacterV from "../components/CharacterV";
import { Dimensions } from "react-native";

interface Props {}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const backgroundImage = require("../sources/AvengersA.png");
export default function Characters(props: Props) {
  console.log(SCREEN_WIDTH * 0.5);
  return (
    <Container>
      <CharacterV />
      <Background source={backgroundImage} />
    </Container>
  );
}

const View = styled.View``;

const Text = styled.Text``;

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  position: relative;
`;

const Background = styled.Image`
  position: absolute;
  bottom: -40%;
  left: 0;
  width: 100%;
  z-index: -30;
  opacity: 0.5;
`;
