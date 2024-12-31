import defaultProfile from "@shared/assets/images/cafe/profile.svg";
import type { ICafeDescription } from './types';

export const dummyCafes: ICafeDescription[] = [
  {
    name: "로우키",
    address: "서울 성동구 연무장 3길 6 (성수동 2가)",
    profileImg: defaultProfile,
    location: { latitude: 0, longitude: 0 },
    instaLink: '',
    isBookmark: false,
    avgStar: 0
  },
  {
    name: "로우키커피 헤이그라운드점",
    address: "서울 성동구 뚝섬로 14길 5 (성수동 1가)",
    profileImg: defaultProfile,
    location: { latitude: 0, longitude: 0 },
    instaLink: '',
    isBookmark: false,
    avgStar: 0
  },
  {
    name: "로우키 연희점",
    address: "서울 서대문구 연희로 11가길 42 (연희동)",
    profileImg: defaultProfile,
    location: { latitude: 0, longitude: 0 },
    instaLink: '',
    isBookmark: false,
    avgStar: 0
  },
  {
    name: "로우키 송정점",
    address: "서울 성동구 송정 6길 5 (송정동)",
    profileImg: defaultProfile,
    location: { latitude: 0, longitude: 0 },
    instaLink: '',
    isBookmark: false,
    avgStar: 0
  }
]; 