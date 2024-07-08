import React from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Item } from '@/utils/@types/context';

type ItemProps = {
  item: Item;
  onPress: () => void;
};

const ProductCard = ({ item, onPress }: ItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.productWrapper}>
      <View style={{ position: 'relative' }}>
        <Image
          source={{
            uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
          }}
          style={styles.productImage}
        />

        <Text style={styles.price}>${item.current_price[0]?.USD[0]}</Text>
      </View>

      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productWrapper: {
    flex: 0.5,
    marginBottom: 24,
    marginHorizontal: 4,
  },

  productImage: {
    backgroundColor: '#393535',
    height: 220,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 16,
  },

  price: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
    fontFamily: 'Space-Mono',
    backgroundColor: 'orange',
    borderRadius: 16,
    paddingHorizontal: 6,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Space-Mono',
    color: 'white',
    marginTop: 12,
  },
});
