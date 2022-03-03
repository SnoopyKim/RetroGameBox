import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import DialogWrapper from './DialogWrapper';
import { DialogContext } from '../../context/dialog/dialog-context';
import TextButton from '../buttons/TextButton';
import CloseIcon from '../../assets/images/icon_close.svg';
import NameIcon from '../../assets/images/icon_name.svg';
import { AuthContext } from '../../context/auth/auth-context';
import { DatabaseContext } from '../../context/database/database-context';
import SwitchTab from '../tabs/SwitchTab';

const GAME_ID_LIST = ['CRANE', 'JUMP', 'NPC'];

const RankDialog = () => {
  const { getRankList } = useContext(DatabaseContext);
  const { dismiss } = useContext(DialogContext);

  const [gameIndex, setGameIndex] = useState(0);
  const [rankList, setRankList] = useState([]);

  useEffect(() => {
    getRankList(GAME_ID_LIST[gameIndex]).then((result) => {
      const sortedRanks = result.sort((a, b) => b.score - a.score);
      if (sortedRanks.length > 10) {
        setRankList(sortedRanks.slice(0, 10));
      } else {
        setRankList(sortedRanks);
      }
    });
  }, [gameIndex, getRankList]);

  return (
    <DialogWrapper>
      <TouchableOpacity style={styles.close} onPress={dismiss}>
        <CloseIcon width={30} height={30} style={{ color: '#333' }} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>랭킹</Text>
      </View>
      <SwitchTab
        options={GAME_ID_LIST}
        defaultColor={'#ddd'}
        onSwitched={(prev, curr) => setGameIndex(curr)}
      />
      <View style={styles.rankingBoard}>
        <View style={styles.rankingHeader}>
          <Text style={styles.headerText}>순위</Text>
          <Text style={[styles.headerText, { flex: 2 }]}>닉네임</Text>
          <Text style={styles.headerText}>점수</Text>
        </View>
        {rankList.map((rank, i) => (
          <RankRow
            key={i.toString()}
            rank={i + 1}
            name={rank.name}
            score={rank.score}
          />
        ))}
        {rankList.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              네트워크 오류 혹은{'\n'}저장된 기록이 없습니다
            </Text>
          </View>
        )}
      </View>
    </DialogWrapper>
  );
};

const RankRow = ({ rank, name, score }) => {
  return (
    <View style={styles.rankRow}>
      <Text style={[styles.rowText, styles.rank]}>{rank}</Text>
      <Text style={[styles.rowText, styles.name]}>{name}</Text>
      <Text style={[styles.rowText, styles.score]}>{score}</Text>
    </View>
  );
};

export default RankDialog;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 20,
  },
  rankingBoard: {
    marginTop: 16,
  },
  rankingHeader: {
    flexDirection: 'row',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
    marginBottom: 6,
    paddingBottom: 6,
  },
  headerText: {
    flex: 1,
    fontFamily: 'DGM',
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  rankRow: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    fontFamily: 'DGM',
    color: '#333',
    textAlign: 'center',
  },
  rank: {
    fontSize: 16,
  },
  name: {
    flex: 2,
    fontSize: 14,
  },
  score: {
    fontSize: 16,
  },
  empty: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'DGM',
    color: '#333',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
  },
});
