import CollaborationsScreen from '@/features/collaborations/components/CollaborationsScreen';
import { useCollaborations } from '@/features/collaborations/hooks/useCollaborations';
import React from 'react';

export default function CollaborationsPage() {
  const { collaborators, handleLinkPress, styles, tintColor } = useCollaborations();
  return (
    <CollaborationsScreen
      collaborators={collaborators}
      handleLinkPress={handleLinkPress}
      styles={styles}
      tintColor={tintColor}
    />
  );
}
