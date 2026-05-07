import HomeScreen, { useHome } from '@/features/home-screen';

export default function HomeScreenBridge() {
  const props = useHome();
  return <HomeScreen {...props} />;
}
