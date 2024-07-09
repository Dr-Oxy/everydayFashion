import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { AppContext } from '@/utils/appContext';
import { NavigationProps, Item } from '@/utils/@types/context';

const Details = () => {
  const { selected, setSelected, onAdd } = useContext(AppContext);
  const [adding, setAdding] = useState(false);

  const navigation = useNavigation<NavigationProps>();

  const goBack = () => {
    navigation.navigate('index');
  };

  // increase item qty
  const increaseCart = () => {
    setSelected((prevSelected: any) =>
      prevSelected ? { ...prevSelected, qty: prevSelected?.qty + 1 } : selected,
    );
  };

  //decrease item qty
  const decreaseCart = (product: Item) => {
    setSelected((prevSelected: any) =>
      prevSelected
        ? { ...prevSelected, qty: (prevSelected?.qty || 0) - 1 }
        : product,
    );
  };

  // add to cart, change cta and pop alert
  const addToCart = (product: Item) => {
    setAdding(true);
    onAdd(product);

    Alert.alert(
      'Product Added!',
      `${product.name} has been successfully added to cart.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setAdding(false);
            goBack();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.nav}>
            <TabBarIcon name="arrow-back" color="white" />
            <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
          </Pressable>

          <View>
            <Image
              source={{
                uri: `https://api.timbu.cloud/images/${selected?.photos[0]?.url}`,
              }}
              style={styles.productImage}
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{selected?.name}</Text>

          <Text style={styles.desc}>{selected?.description}</Text>

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
            <Text style={styles.sub}>In Stock:</Text>
            <Text style={styles.sub}>
              {selected?.available_quantity} items left
            </Text>
          </View>

          <View style={styles.bottom}>
            <View style={styles.qtyWrap}>
              <Pressable
                disabled={selected?.qty === 1}
                onPress={() => decreaseCart(selected)}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>-</Text>
              </Pressable>

              <Pressable style={styles.qtyButton}>
                <Text style={styles.qtyText}>{selected.qty}</Text>
              </Pressable>

              <Pressable
                disabled={selected?.available_quantity <= selected?.qty}
                onPress={increaseCart}
                style={styles.qtyButton}
              >
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>

            <View style={styles.btnWrap}>
              <View style={styles.priceWrap}>
                <Text style={styles.price}>
                  ${Number(selected?.current_price[0]?.USD[0] * selected.qty)}
                </Text>
              </View>

              <Pressable
                onPress={() => addToCart(selected)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {adding ? 'Adding..' : 'Add to Cart'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#232323',
  },

  header: {
    paddingTop: 40,
    backgroundColor: '#393535',
    paddingHorizontal: 16,
    height: 380,
    position: 'relative',
  },

  nav: {
    flexDirection: 'row',
    gap: 4,
  },

  productImage: {
    backgroundColor: '#393535',
    height: 320,
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 16,
  },

  content: {
    flex: 1,
    backgroundColor: '#232323',
    padding: 20,
  },

  leading: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    color: 'white',
    fontFamily: 'Space-Mono',
  },

  title: {
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 42,
    color: 'orange',
    fontFamily: 'Space-Mono',
  },

  desc: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30,
    color: '#f3f3f3',
  },

  bottom: {
    marginTop: 40,
  },

  qtyWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 50,
  },

  qtyButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 1,
  },

  qtyText: {
    color: 'white',
    fontSize: 20,
  },

  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 18,
  },

  sub: {
    fontSize: 16,
    color: 'white',
  },

  priceWrap: {
    width: 100,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  price: {
    fontSize: 36,
    color: 'orange',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: 'orange',
    borderRadius: 8,
    flex: 1,
  },

  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'Space-Mono',
  },
});
