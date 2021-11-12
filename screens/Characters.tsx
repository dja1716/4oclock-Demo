import styled from "styled-components/native";
import React, { useEffect } from "react";
import CharacterV from "../components/CharacterV";
import { Dimensions, FlatList, View } from "react-native";
import { CharactersResponse, CharactersApi, Character } from "../api";

import {
  useQuery,
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";

interface Props {}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const backgroundImage = require("../sources/AvengersA.png");
export default function Characters(props: Props) {
  const queryClient = useQueryClient();

  const {
    data: charactersData,
    isLoading,
    isRefetching,
  } = useQuery<CharactersResponse>(
    ["characters", "allCharacters"],
    CharactersApi.Characters
  );
  useEffect(() => {
    if (charactersData) {
      console.log(charactersData);
    }
  }, [charactersData]);
  console.log(SCREEN_WIDTH * 0.5);
  return (
    <Container>
      {charactersData ? (
        <FlatList
          data={charactersData.data.results}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={{ paddingVertical: 30 }}
          renderItem={({ item }) => <CharacterV name={item.name} />}
        />
      ) : null}
      <Background source={backgroundImage} />
    </Container>
  );
}

const Separator = styled.View`
  height: 20px;
`;

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
