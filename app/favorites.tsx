import FavoritesScreen, { useFavorites } from '@/features/favorites';

export default function FavoritesBridge() {
  const props = useFavorites();
  return <FavoritesScreen {...props} />;
}
