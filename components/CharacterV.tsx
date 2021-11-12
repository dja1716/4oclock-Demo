import styled from "styled-components/native";
import React from "react";
import { Dimensions } from "react-native";

interface Props {}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CharacterV(props: Props) {
  return (
    <Container>
      <Title>Characters</Title>
    </Container>
  );
}

const View = styled.View``;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 600;
`;

const Container = styled.View`
  height: 90%;
  margin: 10%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: ${SCREEN_WIDTH - 20};
  padding: 20px;
`;

const CharacterImage = styled.Image``;
