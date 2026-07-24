import type { Category } from "@/types/shahname";

export const categoryImages: { [key: string]: any } = {
  aghaz: require("@/assets/images/Person/Ferdousi.webp"),
  qmars: require("@/assets/images/Person/Qmars.webp"),
  hushang: require("@/assets/images/Person/Hooshang.webp"),
  tahmoores: require("@/assets/images/Person/Tahmores.webp"),
  jamshid: require("@/assets/images/Person/Jamshid.webp"),
  zahak: require("@/assets/images/Person/Zahak.webp"),
  fereydoon: require("@/assets/images/Person/Fereidoon.webp"),
  manoochehr: require("@/assets/images/Person/Manoochehr.webp"),
  nozar: require("@/assets/images/Person/Nozar.webp"),
  zutahmasb: require("@/assets/images/Person/ZooTahmasp.webp"),
  garshasp: require("@/assets/images/Person/Garshasp.webp"),
  kqobad: require("@/assets/images/Person/Kqobad.webp"),
  kkavoos: require("@/assets/images/Person/KeyKavous.webp"),
  sohrab: require("@/assets/images/Person/Sohrab.webp"),
  siavosh: require("@/assets/images/Person/Siavash.webp"),
  kkhosro: require("@/assets/images/Person/KeyKhosro.webp"),
  kamoos: require("@/assets/images/Person/Kashani.webp"),
  lohrasp: require("@/assets/images/Person/Lahrasp.webp"),
  goshtasp: require("@/assets/images/Person/Gashtasp.webp"),
  esfandyar: require("@/assets/images/Person/Esfandiar.webp"),
  shqad: require("@/assets/images/Person/Shoghad.webp"),
  bahman: require("@/assets/images/Person/BahmanEsfandiar.webp"),
  homa: require("@/assets/images/Person/HomayeChehrzad.webp"),
  darab: require("@/assets/images/Person/Darab.webp"),
  dara: require("@/assets/images/Person/DarayeDarab.webp"),
  eskandar: require("@/assets/images/Person/Eskandar.webp"),
  ashkanian: require("@/assets/images/Person/Ashkanian.webp"),
  ardeshir: require("@/assets/images/Person/Ardeshir.webp"),
  shapoor: require("@/assets/images/Person/Shapour.webp"),
  oormazd: require("@/assets/images/Person/OverMozd.webp"),
  bahram: require("@/assets/images/Person/Bahram.webp"),
  bahramian: require("@/assets/images/Person/BahramBahramian.webp"),
  nrsi: require("@/assets/images/Person/NarsiBahram.webp"),
  oorner: require("@/assets/images/Person/OvermozdNarsi.webp"),
  zolaktaf: require("@/assets/images/Person/ShapourZavaloktaf.webp"),
  nekookar: require("@/assets/images/Person/ArdeshirNikookar.webp"),
  shapoor3: require("@/assets/images/Person/ShapourSevom.webp"),
  bahpoor: require("@/assets/images/Person/BahramShapour.webp"),
  bahgoor: require("@/assets/images/Person/BahramGoor.webp"),
  yazdgerd: require("@/assets/images/Person/YazdGerd.webp"),
  bezehgar: require("@/assets/images/Person/YazdgerdBerahgar.webp"),
  qobad: require("@/assets/images/Person/Kqobad.webp"),
  anooshirvan: require("@/assets/images/Person/KasraNoshinRavan.webp"),
  hormozd: require("@/assets/images/Person/Hormozd.webp"),
  parviz: require("@/assets/images/Person/KhosroParviz.webp"),
  shirooye: require("@/assets/images/Person/Shiroye.webp"),
  ardeshiroo: require("@/assets/images/Person/ArdeshirShiroy.webp"),
  farayeen: require("@/assets/images/Person/Faraein.webp"),
  pooran: require("@/assets/images/Person/PoranDokht.webp"),
  azarmdokht: require("@/assets/images/Person/ArazmDokht.webp"),
  farrokh: require("@/assets/images/Person/FarokhZad.webp"),
  yazdgerd3: require("@/assets/images/Person/YazdgerdBerahgar.webp"),
  "12rokh": require("@/assets/images/Person/12Rokh.webp"),
  akvan: require("@/assets/images/Person/AkvanDiv.webp"),
  bizhan: require("@/assets/images/Person/BizhanVaMonizhe.webp"),
  khaghan: require("@/assets/images/Person/Khaghan.webp"),
};

export const defaultImage = require("@/assets/images/icon.webp");

export const getCategoryImage = (category: Category) => {
  if (category.image && categoryImages[category.image]) {
    return categoryImages[category.image];
  }
  return defaultImage;
};

const categoryAnimations: { [key: string]: any } = {};

export const getCharacterAnimation = (category: Category) => {
  if (category.image && categoryAnimations[category.image]) {
    return categoryAnimations[category.image];
  }
  return null;
};
