import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable, ImageBackground, ImageSourcePropType } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getPoem, getCategories } from '@/services/dataService';
import {
  markPoemAsComplete,
  getCompletedPoems,
  unmarkPoemAsComplete,
  isFavorite,
  addFavorite,
  removeFavorite,
} from '@/services/progressService';
import { Poem, Verse, Category } from '@/types/shahname';
import { IconSymbol } from '@/components/ui/IconSymbol';
import BendedRoad from '@/components/BendedRoad';

type Couplet = {
  line1: string;
  line2: string;
};


const categoryImages: { [key: string]: any } = {
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
  kkhosro: require('@/assets/images/Person/KeyKhosro.png'),
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
  yazdgerd: require('@/assets/images/Person/YazdgerdBerahgar.jpg'), //todo:bug
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
  kamoos: require('@/assets/images/Person/Kashani.png'),
  khaghan: require('@/assets/images/Person/Khaghan.png'),
};

const defaultImage = require('@/assets/images/icon.png');

const getCategoryImage = (category: Category) => {
  const key = category.url.split('/').pop();
  if (key && categoryImages[key]) {
    return categoryImages[key];
  }
  return defaultImage;
};

export default function ReadingScreen() {
  const { poem_id } = useLocalSearchParams();
  const router = useRouter();
  const [poem, setPoem] = useState<Poem | null>(null);
  const [couplets, setCouplets] = useState<Couplet[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [categoryImage, setCategoryImage] = useState<ImageSourcePropType>(defaultImage);

  useEffect(() => {
    const loadData = async () => {
      const poemIdNum = Number(poem_id);
      if (isNaN(poemIdNum)) {
        return;
      }

      const completedPoems = await getCompletedPoems();
      if (completedPoems[poemIdNum]) {
        setIsCompleted(true);
      }

      const favoriteStatus = await isFavorite(poemIdNum);
      setIsFav(favoriteStatus);

      const currentPoem = getPoem(poemIdNum);

      if (currentPoem) {
        setPoem(currentPoem);
        const poemVerses = currentPoem.verses.sort((a, b) => a.vorder - b.vorder);

        const groupedCouplets: Couplet[] = [];
        for (let i = 0; i < poemVerses.length; i += 2) {
          groupedCouplets.push({
            line1: poemVerses[i]?.text || '',
            line2: poemVerses[i + 1]?.text || '',
          });
        }
        setCouplets(groupedCouplets);

        const categories = getCategories();
        const category = categories.find(c => c.id === currentPoem.cat_id);
        if (category) {
          setCategoryImage(getCategoryImage(category));
        }
      }
    };
    loadData();
  }, [poem_id]);

  const handleToggleComplete = async () => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }
    if (isCompleted) {
      await unmarkPoemAsComplete(poemIdNum);
    } else {
      await markPoemAsComplete(poemIdNum);
    }
    setIsCompleted(!isCompleted);
  };

  const handleToggleFavorite = async () => {
    const poemIdNum = Number(poem_id);
    if (isNaN(poemIdNum)) {
      return;
    }
    if (isFav) {
      await removeFavorite(poemIdNum);
    } else {
      await addFavorite(poemIdNum);
    }
    setIsFav(!isFav);
  };

  if (!poem) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Poem not found!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <BendedRoad imageSource={categoryImage}>
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Stack.Screen options={{ title: poem.title }} />
        <ScrollView>
          {isCompleted && (
            <ThemedView style={styles.headerContainer}>
              <IconSymbol name="checkmark.circle.fill" size={24} color={'#6EBF8B'} />
              <ThemedText style={styles.headerText}>خوانده شده</ThemedText>
            </ThemedView>
          )}
          <View style={styles.coupletsContainer}>
            {couplets.map((couplet, index) => (
              <ThemedView key={index} style={styles.couplet}>
                <ThemedText style={styles.verseText}>{couplet.line1}</ThemedText>
                <ThemedText style={styles.verseText}>{couplet.line2}</ThemedText>
              </ThemedView>
            ))}
          </View>

          <View style={styles.actionsContainer}>
            <Pressable
              style={[styles.button, styles.completeButton, isCompleted && styles.unCompleteButton]}
              onPress={handleToggleComplete}
            >
              <ThemedText style={styles.buttonText}>
                {isCompleted ? 'علامت به عنوان تکمیل نشده' : 'تکمیل'}
              </ThemedText>
            </Pressable>
            <Pressable style={styles.button} onPress={handleToggleFavorite}>
              <IconSymbol name="heart.fill" size={24} color={isFav ? '#e74c3c' : '#fff'} />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </BendedRoad>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
    backgroundColor: 'transparent',
  },
  headerText: {
    color: '#fff',
  },
  coupletsContainer: {
    marginBottom: 24,
  },
  couplet: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderEndWidth: 4,
    borderEndColor: '#A1CEDC',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  verseText: {
    fontSize: 18,
    lineHeight: 30,
    textAlign: 'right',
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 48,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#6EBF8B',
    flex: 1,
    marginEnd: 8,
  },
  unCompleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
