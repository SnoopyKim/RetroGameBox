import { StatusBar } from "expo-status-bar";
import Matter from "matter-js";
import { useRef, useState, useEffect, useContext } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import Enemy from "./components/Enemy";
import Floor from "./components/Floor";
import Player from "./components/Player";
import StatusBoard from "./components/StatusBoard";
import Constants, { IMAGES } from "./Constants";
import AttackSystem from "./systems/AttackSystem";
import Rocks from "./components/Rocks";
import AssetLoading from "../../components/AssetLoading";
import { usePlayerStatus } from "./hooks/PlayerStatus";
import { useEnemyStatus } from "./hooks/EnemyStatus";
import Cards from "./components/Cards";
import ExitIcon from "../../assets/images/icon_exit.svg";
import { DialogContext } from "../../context/dialog/dialog-context";
import GameResult from "../../components/GameResult";

const initState = {
  running: true,
  round: 1,
  status: "SELECT",
};
const backgroundImg = require("../../assets/images/main_bg.png");

const NPCGameScreen = ({ navigation }) => {
  const { showConfirmDialog } = useContext(DialogContext);
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [gameState, setGameState] = useState(initState);
  const timer = useRef(null);

  const [playerStatus, playerDispatch] = usePlayerStatus();
  const [enemyStatus, enemyDispatch] = useEnemyStatus();

  useEffect(() => {
    if (!gameState.running) return;

    if (gameState.status === "WIN") {
      timer.current = setTimeout(() => {
        playerDispatch({ type: "RECOVER" });
        enemyDispatch({ type: "LEVEL", value: gameState.round - 1 });
        setGameState({
          ...gameState,
          round: gameState.round + 1,
          status: "SELECT",
        });
      }, 3000);
    }
    if (gameState.status === "LOSE") {
      timer.current = setTimeout(
        () => setGameState({ ...gameState, running: false }),
        3000
      );
    }

    return () => {
      clearTimeout(timer.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (
      gameState.status === "SELECT" &&
      gameEngine.current &&
      matterEngine.current
    ) {
      Matter.Engine.clear(matterEngine.current);
      gameEngine.current.swap(initEntities());
    }
    if (gameState.status !== "FIGHT") return;

    if (enemyStatus.HP_CURRENT === 0) {
      gameEngine.current.dispatch({ type: "WIN" });
    } else if (playerStatus.HP_CURRENT === 0) {
      gameEngine.current.dispatch({ type: "LOSE" });
    }
  }, [playerStatus, enemyStatus, gameState]);

  const initEntities = () => {
    matterEngine.current = Matter.Engine.create({ enableSleeping: false });
    matterEngine.current.gravity.y = 0;

    let floor = Matter.Bodies.rectangle(
      Constants.GAME_WIDTH / 2,
      Constants.GAME_HEIGHT - 20,
      Constants.GAME_WIDTH,
      40,
      { isStatic: true }
    );

    let player = Matter.Bodies.rectangle(
      50,
      Constants.GAME_HEIGHT - 70,
      60,
      60,
      {
        isStatic: true,
        name: "player",
        atkSpeed: playerStatus.SPEED,
        chamfer: { radius: [15, 15, 0, 0] },
        collisionFilter: {
          category: 0x0002,
        },
      }
    );

    let enemy = Matter.Bodies.rectangle(
      Constants.GAME_WIDTH - 50,
      Constants.GAME_HEIGHT - 70,
      60,
      60,
      {
        isStatic: true,
        name: "enemy",
        atkSpeed: enemyStatus.SPEED,
        chamfer: { radius: [15, 15, 0, 0] },
        collisionFilter: {
          category: 0x0001,
        },
      }
    );

    Matter.World.add(matterEngine.current.world, [floor, player, enemy]);
    Matter.Events.on(matterEngine.current, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (bodyB.name === "rock") {
          gameEngine.current.dispatch({ type: "ERASE", rock: bodyB });
          if (bodyA.name === "enemy") {
            // ?????? ??????
            let damageValue = playerStatus.ATTACK_POWER;
            if (bodyB.throw === "player" && bodyB.ct <= playerStatus.CRITICAL) {
              damageValue *= 2;
            }
            enemyDispatch({
              type: "DAMAGE",
              value: damageValue,
            });
          } else if (bodyA.name === "player") {
            // ??????????????? ??????
            playerDispatch({
              type: "DAMAGE",
              value: enemyStatus.ATTACK_POWER,
            });
          }
        }
      });
    });

    return {
      matter: matterEngine.current,
      gameStatus: gameState.status,
      floor: {
        body: floor,
        renderer: <Floor />,
      },
      rocks: {
        bodies: [],
        renderer: <Rocks />,
      },
      player: {
        body: player,
        renderer: <Player />,
      },
      enemy: {
        body: enemy,
        renderer: <Enemy />,
      },
    };
  };

  const exitGame = () => {
    showConfirmDialog("?????? ??????", "????????? ??????????????????????", () => {
      navigation.goBack();
    });
  };

  const resetGame = () => {
    playerDispatch({ type: "INIT" });
    enemyDispatch({ type: "INIT" });
    setGameState(initState);
  };

  const onEvent = (event) => {
    switch (event.type) {
      case "WIN":
        setGameState({
          ...gameState,
          status: "WIN",
        });
        break;
      case "LOSE":
        setGameState({
          ...gameState,
          status: "LOSE",
        });
        break;
      case "START":
        setGameState({ ...gameState, status: "FIGHT" });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.canvas}>
      <AssetLoading images={Object.values(IMAGES)}>
        <StatusBar style="light" />
        <ImageBackground
          style={{ flex: 1.1 }}
          source={backgroundImg}
          fadeDuration={0}
          resizeMode={"cover"}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.exit} onPress={exitGame}>
              <ExitIcon width={26} height={26} style={{ color: "#333" }} />
            </TouchableOpacity>
          </View>
          <GameEngine
            ref={gameEngine}
            style={styles.gameContainer}
            entities={initEntities()}
            systems={[AttackSystem]}
            running={gameState.running}
            onEvent={onEvent}
          >
            {{
              WIN: <ResultText text={"?????????!"} />,
              LOSE: <ResultText text={"??????..."} />,
              SELECT: (
                <Cards
                  onSelect={(item) => {
                    playerDispatch({ type: "CHANGE", value: item.value });
                    gameEngine.current.dispatch({ type: "START" });
                  }}
                />
              ),
            }[gameState.status] || <></>}
          </GameEngine>
        </ImageBackground>
        <View style={styles.boardContainer}>
          <StatusBoard
            player={playerStatus}
            enemy={enemyStatus}
            round={gameState.round}
          />
        </View>
      </AssetLoading>

      {!gameState.running && (
        <GameResult
          gameID={"NPC"}
          score={gameState.round}
          resetGame={resetGame}
          exitGame={() => navigation.goBack()}
        />
      )}
    </SafeAreaView>
  );
};

const ResultText = ({ text }) => {
  return (
    <View style={styles.resultWrapper}>
      <Text style={styles.resultText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 56,
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  exit: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  gameContainer: {
    // position: 'absolute',
    width: Constants.GAME_WIDTH,
    height: Constants.GAME_HEIGHT,
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    overflow: "hidden",
  },
  boardContainer: {
    // position: 'absolute',
    flex: 0.5,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT - Constants.GAME_HEIGHT,
    // top: Constants.GAME_HEIGHT,
  },
  resultWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Constants.GAME_HEIGHT / 3,
  },
  resultText: {
    color: "whitesmoke",
    fontFamily: "DGM",
    fontSize: 48,
    textShadowColor: "#333",
    textShadowRadius: 5,
  },
});

export default NPCGameScreen;
