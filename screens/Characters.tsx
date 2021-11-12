import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
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
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: charactersData,
    isLoading,
    isRefetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<CharactersResponse>(
    ["characters", "allCharacters"],
    CharactersApi.Characters,
    {
      getNextPageParam: (cur) => {
        const next = cur.data.offset + cur.data.count;
        return next > cur.data.total ? null : next;
      },
    }
  );
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["characters", "allCharacters"]);
    setRefreshing(false);
  };
  return (
    <Container>
      {charactersData && charactersData.pages ? (
        <FlatList
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={charactersData.pages.map((page) => page.data.results).flat()}
          contentContainerStyle={{ paddingVertical: 30 }}
          renderItem={({ item }) => {
            if (item.thumbnail.path.includes("image_not_available")) {
              return null;
            }
            return (
              <CharacterV
                name={item.name}
                description={item.description}
                path={item.thumbnail.path}
                extension={item.thumbnail.extension}
              />
            );
          }}
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
