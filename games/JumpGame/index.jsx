import { StatusBar } from "expo-status-bar";
import Matter from "matter-js";
import { useReducer, useRef, useState, useEffect, useContext } from "react";
import { render } from "react-dom";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  View,
} from "react-native";
import Constants from "./Constants";
import Floor from "./components/Floor";
import Spike from "./components/Spike";
import SpikeR from "./components/SpikeR";
import Fire from "./components/Fire";
import Ground from "./components/Ground";
import Player from "./components/Player";
import Reward from "./components/Reward";
import JumpBar from "./components/JumpBar";
import MoveSystem from "./MoveSystem";
import { GameEngine } from "react-native-game-engine";
import AssetLoading from "../../components/AssetLoading";
import ExitIcon from "../../assets/images/icon_exit.svg";
import { DialogContext } from "../../context/dialog/dialog-context";
import GameResult from "../../components/GameResult";
import { DatabaseContext } from "../../context/database/database-context";

const initState = {
  running: true,
  score: 1000,
  status: "PLAY",
};
const backgroundImg = require("../../assets/images/main_bg.png");

const JumpGameScreen = ({ navigation }) => {
  const { profile, unsubscribeProfile } = useContext(DatabaseContext);
  const { showConfirmDialog } = useContext(DialogContext);
  const gameEngine = useRef(null);
  const matterEngine = useRef(null);

  const [gameState, setGameState] = useState(initState);

  const timer = useRef(null);

  const initEntities = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    //1 2 3층
    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 1.2 - 25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true, name: "floor" }
    );
    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      floor.position.y - 150,
      Constants.MAX_WIDTH / 2.5,
      20,
      { isStatic: true, name: "floor" }
    );
    let wallLeft = Matter.Bodies.rectangle(
      -25,
      Constants.MAX_HEIGHT / 2,
      50,
      Constants.MAX_HEIGHT,
      { isStatic: true }
    );
    let wallRight = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + 25,
      Constants.MAX_HEIGHT / 2,
      50,
      Constants.MAX_HEIGHT,
      { isStatic: true }
    );
    let wallTop = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      0,
      Constants.MAX_WIDTH,
      20,
      { isStatic: true }
    );
    let stair1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - 25,
      Constants.MAX_HEIGHT / 1.2 - 80,
      50,
      60,
      { isStatic: true, name: "floor", check: "check1" }
    );
    let stair2 = Matter.Bodies.rectangle(20, floor2.position.y - 60, 40, 20, {
      isStatic: true,
      name: "floor",
    });
    let stair3 = Matter.Bodies.rectangle(120, stair2.position.y - 60, 40, 20, {
      isStatic: true,
      name: "floor",
    });
    let stair4 = Matter.Bodies.rectangle(20, stair3.position.y - 60, 40, 20, {
      isStatic: true,
      name: "floor",
      check: "check2",
    });
    let wallMid = Matter.Bodies.rectangle(
      stair3.position.x + 40,
      stair2.position.y - 50,
      42,
      Constants.MAX_HEIGHT / 8,
      { isStatic: true }
    );
    let floor3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 1.8,
      wallMid.position.y + Constants.MAX_HEIGHT / 16 - 10,
      Constants.MAX_WIDTH / 4,
      20,
      { isStatic: true, name: "floor" }
    );
    let floor4 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 5,
      wallMid.position.y - 250,
      Constants.MAX_WIDTH / 2.5,
      20,
      { isStatic: true, name: "floor" }
    );
    let stair5 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + 25,
      floor3.position.y,
      50,
      20,
      {
        isStatic: true,
        name: "floor",
      }
    );
    let stair6 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2 + 90,
      floor4.position.y + 130,
      50,
      20,
      { isStatic: true, name: "floor", check: "check3" }
    );
    let stair7 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2 + 20,
      floor4.position.y + 70,
      50,
      20,
      { isStatic: true, name: "floor" }
    );
    let stair8 = Matter.Bodies.rectangle(
      stair6.position.x,
      stair6.position.y - 160,
      50,
      20,
      { isStatic: true, name: "floor" }
    );
    let stair9 = Matter.Bodies.rectangle(
      stair7.position.x,
      stair7.position.y - 160,
      50,
      20,
      { isStatic: true, name: "floor" }
    );
    let spike1 = Matter.Bodies.rectangle(100, floor.position.y - 30, 30, 20, {
      isStatic: true,
      name: "spike",
    });
    let spike2 = Matter.Bodies.rectangle(230, floor.position.y - 30, 30, 20, {
      isStatic: true,
      name: "spike",
    });
    let spike3 = Matter.Bodies.rectangle(175, floor2.position.y + 15, 30, 20, {
      isStatic: true,
      name: "spike",
    });
    let spike4 = Matter.Bodies.rectangle(
      wallMid.position.x,
      wallMid.position.y - Constants.MAX_HEIGHT / 16 - 5,
      30,
      10,
      {
        isStatic: true,
        name: "spike",
      }
    );
    let spike5 = Matter.Bodies.rectangle(
      stair6.position.x,
      stair6.position.y + 15,
      30,
      20,
      {
        isStatic: true,
        name: "spike",
      }
    );
    let spike6 = Matter.Bodies.rectangle(
      stair7.position.x,
      stair7.position.y + 15,
      30,
      20,
      {
        isStatic: true,
        name: "spike",
      }
    );
    let spike7 = Matter.Bodies.rectangle(
      stair8.position.x,
      stair8.position.y + 15,
      30,
      20,
      {
        isStatic: true,
        name: "spike",
      }
    );

    let spike8 = Matter.Bodies.rectangle(
      stair9.position.x,
      stair9.position.y + 15,
      30,
      20,
      {
        isStatic: true,
        name: "spike",
      }
    );
    let reward1 = Matter.Bodies.rectangle(20, floor4.position.y - 35, 50, 50, {
      isStatic: true,
      name: "reward",
    });
    let reward2 = Matter.Bodies.rectangle(110, floor4.position.y - 35, 50, 50, {
      isStatic: true,
      name: "reward",
    });
    let reward3 = Matter.Bodies.rectangle(65, floor4.position.y - 30, 50, 50, {
      isStatic: true,
      name: "reward",
    });

    // 플레이어 캐릭터
    let player = Matter.Bodies.circle(50, floor.position.y - 50, 25, {
      isStatic: false,
      name: "player",
    });
    let jumpBar = Matter.Bodies.rectangle(
      player.position.x,
      Constants.MAX_HEIGHT + 100,
      0,
      0,
      { isStatic: true }
    );

    Matter.World.add(world, [
      player,
      floor,
      floor2,
      floor3,
      floor4,
      wallLeft,
      wallRight,
      wallMid,
      wallTop,
      stair1,
      stair2,
      stair3,
      stair4,
      stair5,
      stair6,
      stair7,
      stair8,
      stair9,
      spike1,
      spike2,
      spike3,
      spike4,
      spike5,
      spike6,
      spike7,
      spike8,
      jumpBar,
      reward1,
      reward2,
      reward3,
    ]);

    Matter.Events.on(engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (bodyB.name === "player") {
          if (bodyA.name === "spike") {
            gameEngine.current.dispatch({ type: "spiked" });
          }
          if (bodyA.name === "floor") {
            gameEngine.current.dispatch({ type: "landed" });
          }
          if (bodyA.check === "check1") {
            gameEngine.current.dispatch({ type: "check1" });
          }
          if (bodyA.check === "check2") {
            gameEngine.current.dispatch({ type: "check2" });
          }
          if (bodyA.check === "check3") {
            gameEngine.current.dispatch({ type: "check3" });
          }
          if (bodyA.name === "reward") {
            setGameState((prev) => ({
              ...prev,
              status: "CLEAR",
              running: false,
            }));
            gameEngine.current.dispatch({ type: "clear" });
            console.log("indexEvent:" + gameState.status);
          }
        }
      });
    });

    return {
      moveSystem: { engine: engine, world: world },
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        renderer: Ground,
      },
      floor2: {
        body: floor2,
        size: [Constants.MAX_WIDTH / 2.5, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      floor3: {
        body: floor3,
        size: [Constants.MAX_WIDTH / 4, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      floor4: {
        body: floor4,
        size: [Constants.MAX_WIDTH / 2.5, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      wallMid: {
        body: wallMid,
        size: [42, Constants.MAX_HEIGHT / 8],
        color: "#a300ef",
        renderer: Floor,
      },
      stair1: {
        body: stair1,
        size: [50, 60],
        color: "#61f1f9",
        renderer: Floor,
      },
      stair2: {
        body: stair2,
        size: [40, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      stair3: {
        body: stair3,
        size: [40, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      stair4: {
        body: stair4,
        size: [40, 20],
        color: "#61f1f9",
        renderer: Floor,
      },
      stair5: {
        body: stair5,
        size: [50, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      stair6: {
        body: stair6,
        size: [50, 20],
        color: "#61f1f9",
        renderer: Floor,
      },
      stair7: {
        body: stair7,
        size: [50, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      stair8: {
        body: stair8,
        size: [50, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      stair9: {
        body: stair9,
        size: [50, 20],
        color: "#a300ef",
        renderer: Floor,
      },
      player: {
        body: player,
        size: [50, 50],
        color: "red",
        renderer: <Player />,
        direction: false,
      },
      reward1: {
        body: reward1,
        size: [50, 50],
        color: "red",
        srce: true,
        renderer: <Reward />,
      },
      reward2: {
        body: reward2,
        size: [50, 50],
        color: "red",
        direction: true,
        renderer: <Reward />,
      },
      reward3: {
        body: reward3,
        size: [40, 50],
        color: "red",
        renderer: <Fire />,
      },
      jumpBar: {
        body: jumpBar,
        size: [100, 10],
        color: "yellow",
        renderer: JumpBar,
      },
      spike1: {
        body: spike1,
        size: [100, 40],
        renderer: Spike,
      },
      spike2: {
        body: spike2,
        size: [100, 40],
        renderer: Spike,
      },
      spike3: {
        body: spike3,
        size: [100, 40],
        renderer: SpikeR,
      },
      spike4: {
        body: spike4,
        size: [80, 30],
        renderer: Spike,
      },
      spike5: {
        body: spike5,
        size: [100, 40],
        renderer: SpikeR,
      },
      spike6: {
        body: spike6,
        size: [100, 40],
        renderer: SpikeR,
      },
      spike7: {
        body: spike7,
        size: [100, 40],
        renderer: SpikeR,
      },
      spike8: {
        body: spike8,
        size: [100, 40],
        renderer: SpikeR,
      },
    };
  };
  const exitGame = () => {
    showConfirmDialog("게임 종료", "게임을 나가시겠습니까?", () => {
      navigation.goBack();
    });
  };
  const resetGame = () => {
    setGameState(initState);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={backgroundImg}
        resizeMode="cover"
      >
        <AssetLoading>
          <StatusBar style="dark" />
          <GameEngine
            ref={gameEngine}
            style={styles.gameContainer}
            entities={initEntities()}
            systems={[MoveSystem]}
            running={gameState.running}
            onEvent={(e) => {
              if (e.type === "spiked") {
                setGameState({ score: gameState.score - 5 });
              }
            }}
          ></GameEngine>
        </AssetLoading>
      </ImageBackground>
      <View style={styles.textTimeBox}>
        <Text style={{ fontFamily: "DGM", fontSize: 25 }}>
          점수:{gameState.score} 최고기록:{profile?.JUMP || "NONE"}
        </Text>
      </View>
      <View style={styles.controls}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btns}
            onPressIn={() => {
              gameEngine.current.dispatch({ type: "MoveStartL" });
            }}
            onPressOut={() => {
              gameEngine.current.dispatch({ type: "MoveEndL" });
            }}
          >
            <View style={styles.btnSlot}>
              <Image
                source={require("../../assets/images/redBtn.png")}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              ></Image>
              <Text style={styles.textBox}>◀</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btns}
            onPressIn={() => {
              gameEngine.current.dispatch({ type: "MoveStartR" });
            }}
            onPressOut={() => {
              gameEngine.current.dispatch({ type: "MoveEndR" });
            }}
          >
            <View style={styles.btnSlot}>
              <Image
                source={require("../../assets/images/redBtn.png")}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              ></Image>
              <Text style={styles.textBox}>▶</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btns}
            onPressIn={() => {
              setGameState({ ...gameState, running: true });
              gameEngine.current.dispatch({ type: "JumpStart" });
            }}
            onPressOut={() => {
              gameEngine.current.dispatch({ type: "JumpEnd" });
            }}
          >
            <View style={styles.btnSlot}>
              <Image
                source={require("../../assets/images/purpleBtn.png")}
                resizeMode="contain"
                style={{ width: 120, height: 120 }}
              ></Image>
              <Text style={styles.textBox}>
                {gameState.running ? "점프" : "시작"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {gameState.status === "CLEAR" && (
        <GameResult
          gameID={"JUMP"}
          score={gameState.score}
          resetGame={resetGame}
          exitGame={() => navigation.goBack()}
        />
      )}
      <View style={styles.header}>
        <TouchableOpacity onPress={exitGame}>
          <ExitIcon width={26} height={26} style={{ color: "white" }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#964b00",
  },
  backgroundImage: {
    flex: 1,
    alignSelf: `stretch`,
    width: null,
    marginBottom: Constants.MAX_HEIGHT / 5,
  },
  gameContainer: {
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
    overflow: "hidden",
  },
  controls: {
    flex: 1,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT / 4,
    position: "absolute",
    backgroundColor: "black",
    justifyContent: "center",
    alignContent: "center",
    top: Constants.MAX_HEIGHT / 1.2,
    flexDirection: "column",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
    width: Constants.MAX_WIDTH,
  },
  textTimeBox: {
    position: "absolute",
    top: Constants.MAX_HEIGHT / 1.27,
    color: "white",
  },
  btnSlot: {
    width: 100,
    height: 100,
    position: "absolute",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  btns: {
    width: 100,
    height: 100,
    margin: 5,
    alignItems: "flex-end",
    backgroundColor: "white",
    borderRadius: 140,
    justifyContent: "center",
  },
  textBox: {
    fontSize: 25,
    fontFamily: "DGM",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    position: "absolute",
    width: Constants.MAX_WIDTH,
    height: 56,
    paddingTop: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default JumpGameScreen;
