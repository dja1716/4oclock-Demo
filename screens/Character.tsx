import styled from "styled-components/native";
import React from "react";
import CharacterV from "../components/CharacterV";

interface Props {}

export default function Character(props: Props) {
  return (
    <Container>
      <Text>Characters</Text>
    </Container>
  );
}

const View = styled.View``;

const Text = styled.Text``;

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
