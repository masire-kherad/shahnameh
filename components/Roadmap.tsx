import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image, useWindowDimensions, Modal, ImageSourcePropType, I18nManager, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Category, Poem } from '@/types/shahname';
import { router } from 'expo-router';
import { View as MotiView } from 'moti';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { CompletedPoems } from '@/services/progressService';
import { ThemedText } from './ThemedText';
import HorizontalProgressBar from './HorizontalProgressBar';
import { toFarsiNumber } from '../services/localization';

interface RoadmapProps {
  categories: Category[];
  poems: Poem[];
  completedPoems: CompletedPoems;
}


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

export default function Roadmap({ categories, poems, completedPoems }: RoadmapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'].persian;
  const { width: windowWidth } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageSourcePropType | null>(null);

  const nodePositions = useMemo(() => {
    const positions = [];
    const nodeHeight = 100;
    const nodeMarginBottom = 60;
    const verticalSpacing = nodeHeight + nodeMarginBottom + 20;
    const containerPadding = 40;
    const contentWidth = windowWidth - 2 * containerPadding;

    for (let i = 0; i < categories.length; i++) {
      const isOdd = i % 2 !== 0;
      const offset = containerPadding + (isOdd ? contentWidth - 50 : 50);
      const y = i * verticalSpacing + 100;
      positions.push({ offset, y });
    }
    return positions;
  }, [categories, windowWidth]);

  const pathD = useMemo(() => {
    if (nodePositions.length < 2) return '';
    let d = `M ${(I18nManager.isRTL || Platform.OS === 'android') ? windowWidth - nodePositions[0].offset : nodePositions[0].offset} ${nodePositions[0].y}`;
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const p1 = nodePositions[i];
      const p2 = nodePositions[i + 1];
      const p1x = (I18nManager.isRTL || Platform.OS === 'android') ? windowWidth - p1.offset : p1.offset;
      const p2x = (I18nManager.isRTL || Platform.OS === 'android') ? windowWidth - p2.offset : p2.offset;
      const midX = (p1x + p2x) / 2;
      const midY = (p1.y + p2.y) / 2;
      d += ` Q ${p1x} ${midY}, ${midX} ${midY}`;
      d += ` Q ${p2x} ${midY}, ${p2x} ${p2.y}`;
    }
    return d;
  }, [nodePositions, windowWidth]);

  const contentHeight = nodePositions.length > 0 ? nodePositions[nodePositions.length - 1].y + 200 : 0;

  const handleCategoryPress = (catId: number) => {
    router.push(`/category/${catId}`);
  };

  const handleLongPress = (image: ImageSourcePropType) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const getCategoryProgress = (catId: number) => {
    const categoryPoems = poems.filter(p => p.cat_id === catId);
    const completedCategoryPoems = categoryPoems.filter(p => completedPoems[p.id]);
    return {
      total: categoryPoems.length,
      completed: completedCategoryPoems.length,
    };
  };

  const getCategoryImage = (category: Category) => {
    const key = category.url.split('/').pop();
    if (key && categoryImages[key]) {
      return categoryImages[key];
    }
    return defaultImage;
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackdrop}>
          <Pressable onPress={() => setModalVisible(false)} style={StyleSheet.absoluteFill} />
          {selectedImage &&
            <View style={styles.modalImageContainer}>
              <Image source={selectedImage} style={styles.modalImage} />
            </View>
          }
        </View>
      </Modal>

      <ScrollView contentContainerStyle={[styles.container, { height: contentHeight }]}>
        <Svg height={contentHeight} width={windowWidth} style={StyleSheet.absoluteFill}>
          <Path
            d={pathD}
            stroke={colors.path}
            strokeWidth="8"
            fill="none"
          />
        </Svg>
        <ThemedText type="title" style={[styles.title, { color: Colors.dark.text }]}>مسیر خرد</ThemedText>
        {categories.map((category, index) => {
          const { offset, y } = nodePositions[index];
          const progress = getCategoryProgress(category.id);
          const progressValue = progress.total > 0 ? progress.completed / progress.total : 0;
          const imageSource = getCategoryImage(category);

          return (
            <MotiView
              key={category.id}
              from={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 100 }}
              style={[styles.nodeContainer, { position: 'absolute', top: y - 50, start: offset - 50 }]}
            >
              <Pressable
                onPress={() => handleCategoryPress(category.id)}
                onLongPress={() => handleLongPress(imageSource)}
              >
                <Image source={imageSource} style={styles.nodeImage} />
              </Pressable>
              <Text style={styles.nodeText}>{category.text}</Text>
              <View style={styles.progressContainer}>
                <HorizontalProgressBar
                  progress={progressValue}
                  bgColor={colors.background}
                  progressColor={colors.path}
                />
                {progress.total > 0 && (
                  <Text style={styles.progressText}>
                  {toFarsiNumber(progress.completed)} / {toFarsiNumber(progress.total)}
                  </Text>
                )}
              </View>
            </MotiView>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 40,
    paddingTop: 5,
    paddingHorizontal: 40,
  },
  nodeContainer: {
    width: 100,
    alignItems: 'center',
  },
  nodeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  nodeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  progressContainer: {
    width: 100,
    marginTop: 8,
    alignItems: 'center',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
});
