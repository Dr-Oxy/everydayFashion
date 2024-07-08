import { useMemo } from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, Text } from 'react-native';

import { ProductLoader, TwoColumn, ProductCard } from '@/components';

import { useGetProducts } from '@/hooks/useProducts';

import { Item } from '@/utils/@types/context';

export default function HomeScreen() {
  const { data, isLoading, isError, error } = useGetProducts();

  const products = useMemo(() => {
    return data?.data?.items;
  }, [data?.data?.items]);

  const renderItem = ({ item }: { item: Item }) => {
    return <ProductCard item={item} />;
  };

  if (isError) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: 'red',
            fontSize: 20,
          }}
        >
          {' '}
          Error Loading data:{' '}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.leading}>Everyday Fashion</Text>
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
              // extraData={selected}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#232323',
  },

  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  leading: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    color: 'white',
    fontFamily: 'Space Mono',
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

  button: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#F3E3BF',
    borderRadius: 8,
    marginLeft: 'auto',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
  },
});
