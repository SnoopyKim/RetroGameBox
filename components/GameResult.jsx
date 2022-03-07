import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import TextButton from './buttons/TextButton';
import { DatabaseContext } from '../context/database/database-context';

const GameResult = ({ gameID, score, resetGame, exitGame }) => {
  const { profile, recordRank } = useContext(DatabaseContext);
  const isGuest = profile === undefined;
  const canRecord = !isGuest && (profile[gameID] || 0) < score;

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>게임결과</Text>
        <View style={styles.scoreWrapper}>
          <Text style={styles.score}>점수: {score || 'NONE'} 점</Text>
          {isGuest ? (
            <Text style={styles.guest}>
              게스트 계정은 점수를 기록할 수 없습니다
            </Text>
          ) : (
            <Text style={styles.record}>
              최대 기록: {profile[gameID] || 'NONE'} 점
            </Text>
          )}
        </View>
        <View style={[styles.actionWrapper, { height: canRecord ? 150 : 100 }]}>
          {canRecord && (
            <TextButton
              title={'점수기록'}
              onPressed={() => recordRank(gameID, score)}
              borderColor={'white'}
              fontSize={20}
            />
          )}
          <TextButton
            title={'재도전'}
            onPressed={resetGame}
            borderColor={'white'}
            fontSize={20}
          />
          <TextButton
            title={'나가기'}
            onPressed={exitGame}
            borderColor={'white'}
            fontSize={20}
          />
        </View>
      </View>
    </View>
  );
};

export default GameResult;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000CC',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    color: 'white',
    letterSpacing: 10,
    fontFamily: 'DGM',
    fontSize: 48,
    textShadowColor: 'white',
    textShadowRadius: 10,
  },
  scoreWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  score: {
    color: 'white',
    fontFamily: 'DGM',
    fontSize: 22,
    marginBottom: 20,
  },
  guest: {
    color: 'tomato',
    fontFamily: 'DGM',
  },
  record: {
    color: 'white',
    fontFamily: 'DGM',
    fontSize: 22,
  },
  actionWrapper: {
    width: 200,
    justifyContent: 'space-between',
  },
});
