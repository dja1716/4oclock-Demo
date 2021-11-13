import styled from "styled-components/native";
import React, { useEffect, useRef } from "react";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  useInfiniteQuery,
} from "react-query";
import { ComicsResponse, ComicsApi } from "../api";
import { Animated, PanResponder, View } from "react-native";

interface Props {}

const backgroundImage = require("../sources/AvengersA.png");

export default function Comics(props: Props) {
  // API
  const queryClient = useQueryClient();
  const { data: comicsData } = useQuery<ComicsResponse>(
    ["comics", "allComics"],
    ComicsApi.Comics
  );

  // values
  const scale = useRef(new Animated.Value(1)).current;
  const position = useRef(new Animated.Value(0)).current;
  const rotation = position.interpolate({
    inputRange: [-250, 250],
    outputRange: ["-15deg", "15deg"],
    extrapolate: "extend",
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
  // pan responders
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        onPressIn.start();
      },
      onPanResponderRelease: () => {
        Animated.parallel([onPressOut, goCenter]).start();
      },
      onPanResponderMove: (_, { dx }) => {
        position.setValue(dx);
      },
    })
  ).current;

  useEffect(() => {
    if (comicsData) {
      console.log(comicsData);
    }
  }, [comicsData]);
  return (
    <Container>
      <CardContainer>
        <AnimatedCard
          {...panResponder.panHandlers}
          style={{
            transform: [
              { scale },
              { rotateZ: rotation },
              { translateX: position },
            ],
          }}
        ></AnimatedCard>
        <Background source={backgroundImage} />
      </CardContainer>
    </Container>
  );
}

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
