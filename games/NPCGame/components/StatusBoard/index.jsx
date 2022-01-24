import { StyleSheet, Text, View } from 'react-native';
import Constants from '../../Constants';
import { initStats } from '../../hooks/PlayerStatus';

export default function StatusBoard() {
  const renderStats = (name, stats) => {
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
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{HP_MAX + ' / ' + HP_CURRENT}</Text>
        <Text style={styles.title}>{ATTACK_POWER}</Text>
        <Text style={styles.title}>{DEFENCE_POWER}</Text>
        <Text style={styles.title}>{SPEED}</Text>
        <Text style={styles.title}>{CRITICAL}</Text>
        <Text style={styles.title}>{SPECIAL}</Text>
      </View>
    );
  };

  return (
    <View style={styles.board}>
      <View style={styles.row}>
        <Stats name={'나'} stats={initStats} align='flex-start' />
        <Stats name={'적'} stats={initStats} align='flex-end' />
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
    <View style={{ alignItems: align }}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{HP_MAX + ' / ' + HP_CURRENT}</Text>
      <Text style={styles.title}>{ATTACK_POWER}</Text>
      <Text style={styles.title}>{DEFENCE_POWER}</Text>
      <Text style={styles.title}>{SPEED}</Text>
      <Text style={styles.title}>{CRITICAL}</Text>
      <Text style={styles.title}>{SPECIAL}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'DGM',
    fontSize: 20,
    color: 'black',
  },
});
