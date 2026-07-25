import { Category, Poem, Poet } from "@/types/shahname";

const poets: Poet[] = require("../assets/db/poet.json");
const categories: Category[] = require("../assets/db/cat.json");
const poems: Poem[] = require("../assets/db/poem.json");
const audios: any[] = require("../assets/db/audio.json");

export const getPoemAudio = (poemId: number) => {
  const audio = audios.find((p) => p.id === poemId);
  if (!audio) {
    return null;
  }

  return audio;
};

export const getShahnamehData = () => {
  return {
    poets,
    categories,
    poems,
  };
};

import { loadPoemVerses } from "./poemLoader";
import { loadPoemSummaries } from "./summaryLoader";

export const getPoem = (poemId: number) => {
  const poem = poems.find((p) => p.id === poemId);
  if (!poem) {
    return null;
  }

  const verses = loadPoemVerses(poemId);

  return { ...poem, verses };
};

export const getPoemWithSummary = (poemId: number) => {
  const poemData = getPoem(poemId);
  if (!poemData) {
    return null;
  }

  const summaries = loadPoemSummaries(poemId);

  return { ...poemData, summaries };
};

export const getPoems = () => {
  return poems;
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCategories = () => {
  return categories.filter((c) => c.parent_id === 33);
};

export const setUserInfo = async (name: string, gender: "male" | "female") => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify({ name, gender }));
  } catch (e) {
    console.error("Failed to save user info.", e);
  }
};

export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (e) {
    console.error("Failed to fetch user info.", e);
    return null;
  }
};

export const setRulesAgreed = async () => {
  try {
    await AsyncStorage.setItem("rulesAgreed", JSON.stringify(true));
  } catch (e) {
    console.error("Failed to save rules agreement.", e);
  }
};

export const getRulesAgreed = async () => {
  try {
    const rulesAgreed = await AsyncStorage.getItem("rulesAgreed");
    return rulesAgreed ? JSON.parse(rulesAgreed) : false;
  } catch (e) {
    console.error("Failed to fetch rules agreement.", e);
    return false;
  }
};

// User preference for showing poem meanings
export const setShowMeanings = async (show: boolean) => {
  try {
    await AsyncStorage.setItem("showMeanings", JSON.stringify(show));
  } catch (e) {
    console.error("Failed to save show meanings preference.", e);
  }
};

export const getShowMeanings = async () => {
  try {
    const showMeanings = await AsyncStorage.getItem("showMeanings");
    return showMeanings ? JSON.parse(showMeanings) : true; // Default to true
  } catch (e) {
    console.error("Failed to fetch show meanings preference.", e);
    return true; // Default to true
  }
};
