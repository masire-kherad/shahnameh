import type { Category } from '@/types/shahname';


export const categoryImages: { [key: string]: any } = {
  aghaz: require('@/assets/images/Person/Ferdousi.png'),
  qmars: require('@/assets/images/Person/Qmars.png'),
  hushang: require('@/assets/images/Person/Hooshang.png'),
  tahmoores: require('@/assets/images/Person/Tahmores.png'),
  jamshid: require('@/assets/images/Person/Jamshid.png'),
  zahak: require('@/assets/images/Person/Zahak.png'),
  fereydoon: require('@/assets/images/Person/Fereidoon.png'),
  manoochehr: require('@/assets/images/Person/Manoochehr.png'),
  nozar: require('@/assets/images/Person/Nozar.png'),
  zutahmasb: require('@/assets/images/Person/ZooTahmasp.png'),
  garshasp: require('@/assets/images/Person/Garshasp.png'),
  kqobad: require('@/assets/images/Person/Kqobad.png'),
  kkavoos: require('@/assets/images/Person/KeyKavous.png'),
  sohrab: require('@/assets/images/Person/Sohrab.png'),
  siavosh: require('@/assets/images/Person/Siavash.png'),
  kkhosro: require('@/assets/images/Person/KeyKhosro.png'),
  kamoos: require('@/assets/images/Person/Kashani.png'),
  lohrasp: require('@/assets/images/Person/Lahrasp.png'),
  goshtasp: require('@/assets/images/Person/Gashtasp.png'),
  esfandyar: require('@/assets/images/Person/Esfandiar.png'),
  shqad: require('@/assets/images/Person/Shoghad.png'),
  bahman: require('@/assets/images/Person/BahmanEsfandiar.png'),
  homa: require('@/assets/images/Person/HomayeChehrzad.png'),
  darab: require('@/assets/images/Person/Darab.png'),
  dara: require('@/assets/images/Person/DarayeDarab.png'),
  eskandar: require('@/assets/images/Person/Eskandar.png'),
  ashkanian: require('@/assets/images/Person/Ashkanian.png'),
  ardeshir: require('@/assets/images/Person/Ardeshir.png'),
  shapoor: require('@/assets/images/Person/Shapour.png'),
  oormazd: require('@/assets/images/Person/OverMozd.jpg'),
  bahram: require('@/assets/images/Person/Bahram.jpg'),
  bahramian: require('@/assets/images/Person/BahramBahramian.jpg'),
  nrsi: require('@/assets/images/Person/NarsiBahram.jpg'),
  oorner: require('@/assets/images/Person/OvermozdNarsi.jpg'),
  zolaktaf: require('@/assets/images/Person/ShapourZavaloktaf.jpg'),
  nekookar: require('@/assets/images/Person/ArdeshirNikookar.jpg'),
  shapoor3: require('@/assets/images/Person/ShapourSevom.jpg'),
  bahpoor: require('@/assets/images/Person/BahramShapour.jpg'),
  bahgoor: require('@/assets/images/Person/BahramGoor.jpg'),
  yazdgerd: require('@/assets/images/Person/YazdGerd.jpg'),
  bezehgar: require('@/assets/images/Person/YazdgerdBerahgar.jpg'),
  qobad: require('@/assets/images/Person/Kqobad.png'),
  anooshirvan: require('@/assets/images/Person/KasraNoshinRavan.jpg'),
  hormozd: require('@/assets/images/Person/Hormozd.jpg'),
  parviz: require('@/assets/images/Person/KhosroParviz.jpg'),
  shirooye: require('@/assets/images/Person/Shiroye.jpg'),
  ardeshiroo: require('@/assets/images/Person/ArdeshirShiroy.jpg'),
  farayeen: require('@/assets/images/Person/Faraein.jpg'),
  pooran: require('@/assets/images/Person/PoranDokht.jpg'),
  azarmdokht: require('@/assets/images/Person/ArazmDokht.jpg'),
  farrokh: require('@/assets/images/Person/FarokhZad.jpg'),
  yazdgerd3: require('@/assets/images/Person/YazdgerdBerahgar.jpg'),
  '12rokh': require('@/assets/images/Person/12Rokh.png'),
  akvan: require('@/assets/images/Person/AkvanDiv.png'),
  bizhan: require('@/assets/images/Person/BizhanVaMonizhe.png'),
  khaghan: require('@/assets/images/Person/Khaghan.png'),
};

export const defaultImage = require('@/assets/images/icon.png');


export const getCategoryImage = (category: Category) => {
    if (category.image && categoryImages[category.image]) {
      return categoryImages[category.image];
    }
    return defaultImage;
  };

const categoryAnimations: { [key: string]: any } = {
    qmars: require('@/assets/animations/Qmars.json'),
    };

export const getCharacterAnimation = (category: Category) => {
    if (category.image && categoryAnimations[category.image]) {
        return categoryAnimations[category.image];
    }
    return null;
    };