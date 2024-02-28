import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ContentLoading } from './styles';

export const Loading = () => {
  return (
    <ContentLoading>
      <ActivityIndicator size="large" color="#2D4379" />
    </ContentLoading>
  );
};
