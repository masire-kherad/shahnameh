import Loading from "@/components/Loading";
import UserInfoModal from "@/components/UserInfoModal";
import { ProfileHeader } from "@/features/profile/components/ProfileHeader";
import { QuickNavigation } from "@/features/profile/components/QuickNavigation";
import { RewardModal } from "@/features/profile/components/RewardModal";
import { useProfile } from "@/features/profile/hooks/useProfile";
import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { ShowMeaningsToggle } from "./components/ShowMeaningsToggle";

export default function ProfileScreen() {
  const {
    userInfo,
    showMeanings,
    isRewardAvailable,
    isRewardModalVisible,
    isLoading,
    claimReward,
    dismissRewardModal,
    updateProfile,
    toggleMeanings,
  } = useProfile();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  if (isLoading) {
    return <Loading message="در حال بارگذاری پروفایل..." />;
  }

  return (
    <ImageBackground
      source={require("@/assets/images/bg.webp")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.scroll}>
        <ProfileHeader
          name={userInfo?.name}
          gender={userInfo?.gender}
          onEdit={() => setIsEditModalVisible(true)}
        />

        {/* Uncomment when currency is re-enabled */}
        {/* <DailyReward isAvailable={isRewardAvailable} onClaim={claimReward} /> */}
        <ShowMeaningsToggle checked={showMeanings} onToggle={toggleMeanings} />

        <QuickNavigation />
      </ScrollView>

      <UserInfoModal
        visible={isEditModalVisible}
        onClose={async (name, gender) => {
          await updateProfile(name, gender);
          setIsEditModalVisible(false);
        }}
        onCancel={() => setIsEditModalVisible(false)}
        initialName={userInfo?.name || ""}
        initialGender={userInfo?.gender || "male"}
      />

      <RewardModal
        visible={isRewardModalVisible}
        onClose={dismissRewardModal}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  scroll: { padding: 16, paddingBottom: 32 },
});
