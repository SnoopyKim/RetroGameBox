import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Card({ data, onPress }) {
  const { title, content, value } = data;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={require('retrogamebox/assets/images/muscle.png')}
          fadeDuration={0}
          resizeMode='contain'
        />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Constants.GAME_WIDTH * 0.8,
    height: Constants.GAME_HEIGHT / 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: Constants.GAME_HEIGHT * 0.12,
    height: Constants.GAME_HEIGHT * 0.12,
    resizeMode: 'contain',
    marginStart: 20,
  },
  info: {
    flex: 1,
    alignItems: 'center',
    marginEnd: 10,
  },
  title: {
    fontFamily: 'DGM',
    fontSize: 18,
    color: 'whitesmoke',
  },
  content: {
    fontFamily: 'DGM',
    fontSize: 14,
    color: 'silver',
    marginTop: 8,
  },
});
