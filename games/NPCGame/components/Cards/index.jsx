import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../Constants';
import Card from './Card';
import { drawRandomCards } from './items';

export default function Cards({ onSelect }) {
  const [items, setItems] = useState(drawRandomCards(3));
  return (
    <>
      <Text style={styles.title}>NPC도 성장한다구!</Text>
      <View style={styles.cardContainer}>
        <Card data={items[0]} onPress={() => onSelect(items[0])} />
        <Card data={items[1]} onPress={() => onSelect(items[1])} />
        <Card data={items[2]} onPress={() => onSelect(items[2])} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    fontFamily: 'DGM',
    fontSize: 20,
    textAlign: 'center',
  },
  cardContainer: {
    height: Constants.GAME_HEIGHT / 2 + 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
