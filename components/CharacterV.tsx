import styled from "styled-components/native";
import React from "react";
import { Dimensions } from "react-native";

interface Props {
  name: string;
  path: string;
  extension: string;
  description: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function CharacterV({
  name,
  path,
  extension,
  description,
}: Props) {
  return (
    <Container>
      <Title>{name}</Title>
      <CharacterImage
        source={{ uri: path + "." + extension }}
        resizeMode="cover"
      />
      <Description>{description}</Description>
    </Container>
  );
}

const Description = styled.Text`
  margin-top: 5px;
  color: white;
  font-size: 18px;
  font-weight: 400;
`;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  width: ${SCREEN_WIDTH - 20}px;
  padding: 20px;
  margin-bottom: 10px;
`;

const CharacterImage = styled.Image`
  width: 100%;
  height: 300px;
`;
