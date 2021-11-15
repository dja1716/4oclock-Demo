import styled from "styled-components/native";
import React, { useEffect, useState } from "react";
import CharacterV from "../components/CharacterV";
import { Dimensions, FlatList, View, TouchableOpacity } from "react-native";
import { CharactersResponse, CharactersApi, Character } from "../api";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../navigations/Main";
import { Ionicons } from "@expo/vector-icons";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";

interface Props {}

const backgroundImage = require("../sources/AvengersA.png");
export default function Characters(props: Props) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: charactersData,
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
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 18 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="gold" size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({ headerRight: MessagesButton });
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["characters", "allCharacters"]);
    setRefreshing(false);
  };
  return (
    <Container>
      {charactersData && charactersData.pages ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={charactersData.pages.map((page) => page.data.results).flat()}
          contentContainerStyle={{ paddingVertical: 30 }}
          keyExtractor={(item) => item.id + ""}
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
