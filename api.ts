import { QueryFunction } from "react-query";
import md5 from "js-md5";

const API_KEY = "44153293ad5bc93ded1f4c6c03d12bd3";
const BASE_URL = "https://gateway.marvel.com:443/v1/public";
const PRIVATE_KEY = "027b5a8c5fcabe960654acc99f393a3f0bc8eb84";

export interface thumbnail {
  path: string;
  extension: string;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: thumbnail;
}

export interface Comics {
  id: number;
  title: string;
  description: string | null;
  pageCount: number;
  thumbnail: thumbnail;
  images: thumbnail[];
}

interface BaseResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
}

export interface ComicsInnerResponse extends BaseResponse {
  results: Comics[];
}
export interface CharactersInnerResponse extends BaseResponse {
  results: Character[];
}
export interface ComicsResponse {
  data: ComicsInnerResponse;
}

export interface CharactersResponse {
  data: CharactersInnerResponse;
}

interface Fetchers<T> {
  [key: string]: QueryFunction<T>;
}

export const CharactersApi: Fetchers<CharactersResponse> = {
  Characters: async ({ pageParam }) => {
    const ts = Number(new Date());
    const hash = md5.create();
    hash.update(ts + PRIVATE_KEY + API_KEY);
    const response = await fetch(
      `${BASE_URL}/characters?ts=${ts}&orderBy=-modified&apikey=${API_KEY}&hash=${hash.hex()}&limit=30&offset=${pageParam}`
    ).then((res) => res.json());
    return response;
  },
};

export const ComicsApi: Fetchers<ComicsResponse> = {
  Comics: async ({ pageParam }) => {
    const ts = Number(new Date());
    const hash = md5.create();
    hash.update(ts + PRIVATE_KEY + API_KEY);
    const response = await fetch(
      `${BASE_URL}/comics?ts=${ts}&apikey=${API_KEY}&hash=${hash.hex()}`
    ).then((res) => res.json());
    return response;
  },
};
