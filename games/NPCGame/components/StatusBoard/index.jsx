import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { IMAGES } from '../../Constants';

export default function StatusBoard({ player, enemy, round }) {
  return (
    <ImageBackground
      style={styles.board}
      source={IMAGES.BOARD}
      fadeDuration={0}
      resizeMode={'cover'}
    >
      <View style={styles.row}>
        <Stats name={'NPC'} stats={player} align='flex-start' />
        <View style={styles.round}>
          <Text
            style={{
              ...styles.title,
              fontSize: 48,
              marginBottom: 10,
              textShadowColor: '#333',
              textShadowRadius: 10,
            }}
          >
            {round}
          </Text>
          <Text
            style={{
              ...styles.title,
              fontSize: 36,
              textShadowColor: '#333',
              textShadowRadius: 10,
            }}
          >
            ROUND
          </Text>
        </View>
        <Stats name={'PLAYER'} stats={enemy} align='flex-end' />
      </View>
    </ImageBackground>
  );
}

const Stats = ({ name, stats, align = 'flex-start' || 'flex-end' }) => {
  const {
    HP_MAX,
    HP_CURRENT,
    ATTACK_POWER,
    DEFENCE_POWER,
    SPEED,
    CRITICAL,
    SPECIAL,
  } = stats;

  const reverse = align !== 'flex-start';

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: align,
      }}
    >
      <View
        style={[
          styles.nameWrapper,
          {
            marginStart: reverse ? 0 : -20,
            marginEnd: reverse ? -20 : 0,
            borderTopEndRadius: reverse ? 0 : 20,
            borderBottomEndRadius: reverse ? 0 : 20,
            borderTopStartRadius: reverse ? 20 : 0,
            borderBottomStartRadius: reverse ? 20 : 0,
          },
        ]}
      >
        <Text style={styles.name}>{name}</Text>
      </View>

      <StatRow
        image={IMAGES.HEALTH}
        title={HP_CURRENT + ' / ' + HP_MAX}
        reverse={reverse}
      />
      <StatRow image={IMAGES.ATTACK} title={ATTACK_POWER} reverse={reverse} />
      <StatRow image={IMAGES.SHIELD} title={DEFENCE_POWER} reverse={reverse} />
      <StatRow image={IMAGES.SPEED} title={SPEED} reverse={reverse} />
      <StatRow image={IMAGES.CRITICAL} title={CRITICAL} reverse={reverse} />
    </View>
  );
};

const StatRow = ({ image, title, reverse }) => (
  <View
    style={[styles.stat, { flexDirection: reverse ? 'row-reverse' : 'row' }]}
  >
    <Image
      style={[styles.image, { transform: [{ scaleX: reverse ? -1 : 1 }] }]}
      source={image}
      fadeDuration={0}
      resizeMode='contain'
    />
    <Text style={styles.title}>{title || 0}</Text>
  </View>
);

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  round: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  nameWrapper: {
    width: 140,
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 5,
    marginBottom: 5,
  },
  stat: {
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#333333aa',
  },
  name: {
    fontFamily: 'DGM',
    fontSize: 22,
    color: 'whitesmoke',
  },
  title: {
    fontFamily: 'DGM',
    fontSize: 20,
    color: 'whitesmoke',
    marginHorizontal: 5,
  },
});
