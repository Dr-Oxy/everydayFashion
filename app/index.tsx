import { useMemo, useContext } from 'react';

import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ProductLoader, TwoColumn, ProductCard } from '@/components';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { useGetProducts } from '@/hooks/useProducts';
import { Item, NavigationProps } from '@/utils/@types/context';
import { AppContext } from '@/utils/appContext';

export default function HomeScreen() {
  const { cart } = useContext(AppContext);

  const navigation = useNavigation<NavigationProps>();
  const { setSelected } = useContext(AppContext);
  const { data, isLoading, isError, error } = useGetProducts();

  const products = useMemo(() => {
    return data?.data?.items;
  }, [data?.data?.items]);

  const handleItemClick = (product: Item) => {
    setSelected({ ...product, qty: 1 });

    navigation.navigate('details');
  };

  // render item
  const renderItem = ({ item }: { item: Item }) => {
    return <ProductCard onPress={() => handleItemClick(item)} item={item} />;
  };

  if (isError) {
    return (
      <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>Error Loading data:</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.leading}>Everyday Fashion</Text>

          <Pressable
            onPress={() => navigation.navigate('cart')}
            style={styles.cartButton}
          >
            <TabBarIcon name="cart" color="white" />

            {cart?.length > 0 && <View style={styles.dot}></View>}
          </Pressable>
        </View>

        {isLoading ? (
          <TwoColumn>
            {Array(8)
              .fill('')
              .map((_, i) => (
                <ProductLoader key={i} />
              ))}
          </TwoColumn>
        ) : (
          <View style={styles.productContainer}>
            <FlatList
              numColumns={2}
              data={products}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  errorWrapper: {
    flex: 1,
    backgroundColor: '#232323',
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    fontSize: 20,
  },

  wrapper: {
    flex: 1,
    backgroundColor: '#232323',
    paddingTop: 40,
  },

  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leading: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    color: 'white',
    fontFamily: 'Space Mono',
  },

  cartButton: {
    height: 64,
    width: 64,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#393535',
    position: 'relative',
  },

  dot: {
    height: 16,
    width: 16,
    borderRadius: 40,
    backgroundColor: 'orange',
    position: 'absolute',
    top: -6,
    right: 0,
  },

  sub: {
    marginTop: 10,
    fontSize: 20,
    color: 'white',
  },

  productContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 8,
    backgroundColor: '#232323',
  },
});
