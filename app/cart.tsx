import { useContext } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { AppContext } from '@/utils/appContext';

type NavigationOptions = {
  [key: string]: any;
};

export default function Cart() {
  const navigation = useNavigation<NavigationOptions>();

  const { cart, setCart, onDelete } = useContext(AppContext);

  const goBack = () => {
    navigation.navigate('index');
  };

  const goToSuccess = () => {
    navigation.navigate('success');
    setCart([]);
  };

  const goToMenu = () => {
    navigation.navigate('index');
  };

  //Total cart
  const sumPrice = cart.reduce(
    (price, item) => price + item.qty * item.current_price[0]?.USD[0],
    0,
  );

  //separates the digit with a comma
  const total = new Intl.NumberFormat().format(sumPrice);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable onPress={goBack} style={styles.nav}>
          <TabBarIcon name="arrow-back" color="white" />
          <Text style={{ color: 'white', fontSize: 20 }}>Back</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.checkout}>
        <Text style={styles.leading}>Checkout </Text>

        <View>
          {cart?.length > 0 ? (
            cart?.map((item) => (
              <View style={styles.cartCard} key={item.id}>
                <View style={styles.cardTop}>
                  <View style={styles.imgWrap}>
                    <Image
                      style={styles.menuImage}
                      source={{
                        uri: `https://api.timbu.cloud/images/${item?.photos[0]?.url}`,
                      }}
                    />
                  </View>

                  <View>
                    <Text style={styles.menuTitle}>{item.name}</Text>

                    <Text style={styles.menuPrice}>
                      ${item.current_price[0]?.USD[0] * item.qty}
                    </Text>

                    <View
                      style={{
                        marginVertical: 4,
                        flexDirection: 'row',
                        gap: 8,
                      }}
                    >
                      <Text style={styles.small}>Qty:</Text>
                      <Text style={styles.small}>({item.qty})</Text>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => onDelete(item)}
                  style={styles.delButton}
                >
                  <TabBarIcon name="trash" color="white" />
                </Pressable>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.leading}>Your cart is empty.</Text>
            </View>
          )}
        </View>

        {cart?.length > 0 ? (
          <View style={styles.totalWrap}>
            <Pressable onPress={goToSuccess} style={styles.totalButton}>
              <Text style={styles.lead}>Make Payment: </Text>
              <Text style={styles.totalPrice}> ${total} </Text>
            </Pressable>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20, marginTop: 40 }}>
            <Pressable onPress={goToMenu} style={styles.button}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                Go shopping!
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#232323',
  },

  checkout: {
    flex: 1,
    backgroundColor: '#232323',
    position: 'relative',
  },

  header: {
    paddingTop: 40,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  nav: {
    flexDirection: 'row',
    gap: 4,
  },

  leading: {
    paddingHorizontal: 20,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: 'white',
    fontFamily: 'Space-Mono',
    marginBottom: 20,
    textAlign: 'center',
  },

  lead: {
    fontSize: 20,
    lineHeight: 40,
    color: 'black',
    fontWeight: '600',
  },

  sub: {
    fontSize: 28,
    lineHeight: 36,
    color: 'white',
  },

  small: {
    fontSize: 16,
    lineHeight: 26,
    color: 'white',
  },

  cartCard: {
    backgroundColor: '#393535',
    paddingVertical: 20,
    paddingHorizontal: 12,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  imgWrap: {
    borderRadius: 20,
    padding: 4,
    backgroundColor: 'black',
    alignSelf: 'flex-start',
  },

  menuImage: {
    height: 72,
    width: 80,
    resizeMode: 'contain',
  },

  menuTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: 'white',
  },

  menuPrice: {
    color: 'orange',
    fontSize: 20,
    fontWeight: '700',
  },

  button: {
    padding: 20,
    backgroundColor: 'orange',
    borderRadius: 12,
    marginTop: 12,
  },

  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgb(68, 2, 2)',
  },

  delButton: {
    height: 64,
    width: 64,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#232323',
  },

  totalWrap: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  totalPrice: {
    fontSize: 32,
    lineHeight: 40,
    color: 'black',
    fontWeight: '700',
  },

  totalButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 24,
    borderRadius: 12,
  },
});
