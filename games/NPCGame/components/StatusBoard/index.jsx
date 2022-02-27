import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../Constants';
import { initStats } from '../../hooks/PlayerStatus';
import AttackSVG from 'retrogamebox/assets/images/attack_power.svg';

export default function StatusBoard({ player, enemy, round }) {
  return (
    <View style={styles.board}>
      <View style={styles.row}>
        <Stats name={'나'} stats={player} align='flex-start' />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.title}>ROUND</Text>
          <Text style={{ ...styles.title, fontSize: 30 }}>{round}</Text>
        </View>
        <Stats name={'적'} stats={enemy} align='flex-end' />
      </View>
    </View>
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
  return (
    <View
      style={{
        height: '100%',
        justifyContent: 'space-evenly',
        alignItems: align,
      }}
    >
      <Text style={{ ...styles.title, marginBottom: 10 }}>{name}</Text>
      <Text style={styles.title}>{HP_CURRENT + ' / ' + HP_MAX}</Text>

      <StatRow
        SVG={AttackSVG}
        title={ATTACK_POWER}
        reverse={align !== 'flex-start'}
      />

      <Text style={styles.title}>{DEFENCE_POWER}</Text>
      <Text style={styles.title}>{SPEED}</Text>
      <Text style={styles.title}>{CRITICAL}</Text>
      <Text style={styles.title}>{SPECIAL}</Text>
    </View>
  );
};

const StatRow = ({ SVG, title, reverse }) => (
  <View style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
    <SVG width={20} height={20} />
    <Text style={styles.title}>{title}</Text>
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
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'DGM',
    fontSize: 20,
    color: 'black',
  },
});
