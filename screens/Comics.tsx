import styled from "styled-components/native";
import React, { useEffect, useRef, useState } from "react";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";
import { ComicsResponse, ComicsApi } from "../api";
import { Animated, PanResponder, View, Image } from "react-native";
import ComicsCard from "../components/ComicsCard";

interface Props {}

const backgroundImage = require("../sources/AvengersA.png");

export default function Comics(props: Props) {
  const [comicsCard, setCommicsCard] = useState([]);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  let preFetchTasks = [];
  // API
  const queryClient = useQueryClient();
  const { data: comicsData, isLoading } = useQuery<ComicsResponse>(
    ["comics", "allComics"],
    ComicsApi.Comics
  );

  // values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "clamp",
  });
  const secondScale = position.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.7, 1],
    extrapolate: "clamp",
  });
  // animations
  const onPressIn = Animated.spring(scale, {
    toValue: 0.9,
    useNativeDriver: true,
  });
  const onPressOut = Animated.spring(scale, {
    toValue: 1,
    useNativeDriver: true,
  });
  const goCenter = Animated.spring(position, {
    toValue: 0,
    useNativeDriver: true,
  });

  const onDismiss = () => {
    setIndex((prev) => prev + 1);
    scale.setValue(1);
    position.setValue(0);
    // set index for data
  };

  const goLeft = Animated.spring(position, {
    toValue: -500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 200,
    restDisplacementThreshold: 200,
  });
  const goRight = Animated.spring(position, {
    toValue: 500,
    tension: 5,
    useNativeDriver: true,
    restSpeedThreshold: 200,
    restDisplacementThreshold: 200,
  });
  // pan responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx < -150) {
          goLeft.start(onDismiss);
        } else if (dx > 150) {
          goRight.start(onDismiss);
        } else {
          Animated.parallel([onPressOut, goCenter]).start();
        }
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
    })
  ).current;

  useEffect(() => {
    if (comicsData) {
      //console.log(comicsData);
      setCommicsCard(comicsData.data.results);
      console.log(comicsData.data.results[0].thumbnail.path);
      for (let i = 0; i < comicsData.data.results.length; i++) {
        preFetchTasks.push(
          Image.prefetch(
            comicsData.data.results[i].thumbnail.path +
              "." +
              comicsData.data.results[i].thumbnail.extension
          )
        );
      }
      Promise.all(preFetchTasks).then((results) => setReady(true));
    }
  }, [comicsData]);
  if (!ready || isLoading) return <View></View>;
  return (
    <Container>
      <CardContainer>
        <AnimatedCard style={{ transform: [{ scale: secondScale }] }}>
          {comicsCard[index + 1] ? (
            <CardImage
              source={{
                uri:
                  comicsCard[index + 1].thumbnail.path +
                  "." +
                  comicsCard[index + 1].thumbnail.extension,
              }}
            />
          ) : null}
        </AnimatedCard>
        <AnimatedCard
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { rotateZ: rotation },
              { translateX: position },
            ],
          }}
        >
          {comicsCard[index] ? (
            <CardImage
              source={{
                uri:
                  comicsCard[index].thumbnail.path +
                  "." +
                  comicsCard[index].thumbnail.extension,
              }}
            />
          ) : null}
        </AnimatedCard>
        <Background source={backgroundImage} />
      </CardContainer>
    </Container>
  );
}

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;

const CardContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
  position: relative;
`;

const AnimatedCard = styled(Animated.createAnimatedComponent(View))`
  background-color: white;
  width: 80%;
  height: 80%;
  position: absolute;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
`;

const Background = styled.Image`
  position: absolute;
  bottom: -40%;
  left: 0;
  width: 100%;
  z-index: -30;
  opacity: 0.5;
`;
