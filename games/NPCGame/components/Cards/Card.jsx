import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IMAGES } from '../../Constants';

export default function Card({ data, onPress }) {
  const { CLASS, title, content } = data;

  const { imageSource, colorStyle } = (() => {
    let backgroundColor = '#333';
    let imageSource = IMAGES.NORMAL;
    switch (CLASS) {
      case 'E':
        backgroundColor = 'purple';
        imageSource = IMAGES.EPIC;
        break;
      case 'R':
        backgroundColor = 'royalblue';
        imageSource = IMAGES.RARE;
        break;
    }
    return { imageSource: imageSource, colorStyle: { backgroundColor } };
  })();

  return (
    <TouchableOpacity style={[styles.card, colorStyle]} onPress={onPress}>
      <Image
        style={styles.image}
        source={imageSource}
        fadeDuration={0}
        resizeMode='contain'
      />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: Constants.GAME_WIDTH * 0.8,
    height: Constants.GAME_HEIGHT / 6 + 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: Constants.GAME_HEIGHT * 0.12,
    height: Constants.GAME_HEIGHT * 0.12,
    resizeMode: 'contain',
    marginStart: 20,
    tintColor: 'whitesmoke',
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
    color: 'lightgray',
    marginTop: 8,
  },
});
