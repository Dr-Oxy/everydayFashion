import React from 'react';

import { PropsWithChildren } from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

const TwoColumn = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.layout}>{children}</View>
    </ScrollView>
  );
};

export default TwoColumn;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#232323',
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
    rowGap: 8,
    columnGap: 8,
    paddingBottom: 20,
    flexWrap: 'wrap',
  },
});
