import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@/utils/@types/context';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

const Success = () => {
  const navigation = useNavigation<NavigationProps>();

  const goBack = () => {
    navigation.navigate('index');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#232323' }}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.nav}>
          <TabBarIcon name="arrow-back" color="white" />
          <Text style={{ color: 'white', fontSize: 20 }}>Home</Text>
        </Pressable>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.success}>Order Successful!</Text>
      </View>
    </SafeAreaView>
  );
};

export default Success;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#232323',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#232323',
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  nav: {
    flexDirection: 'row',
    gap: 4,
  },

  success: {
    color: 'white',
    fontSize: 32,
  },
});
