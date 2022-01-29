import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../Constants';
import Card from './Card';
import ITEMS from './items';

const getRandomItems = () => {
  let results = [-1, -1, -1];
  for (let i = 0; i < results.length; i++) {
    let rand;
    do {
      rand = Math.floor(Math.random() * ITEMS.length);
    } while (results.findIndex((v) => v === rand) !== -1);
    results[i] = rand;
  }
  return results.map((idx) => ITEMS[idx]);
};

export default function Cards({ onSelect }) {
  const [items, setItems] = useState(getRandomItems());

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
