import { QueryFunction } from "react-query";

const API_KEY = "44153293ad5bc93ded1f4c6c03d12bd3";
const BASE_URL = "https://gateway.marvel.com:443/v1/public";

export interface thumbnail {
  path: string;
  extension: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: thumbnail[];
}

interface BaseResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
}

export interface CharactersResponse extends BaseResponse {
  results: Character[];
}

interface Fetchers<T> {
  [key: string]: QueryFunction<T>;
}

export const CharactersApi: Fetchers<CharactersResponse> = {
  Characters: () =>
    fetch(
      `${BASE_URL}/characters>orderedBy=-modified&apikey=${API_KEY}`
    ).then((res) => res.json()),
};
