import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ImageButton = ({
  src,
  onPressed,
  width,
  height,
  title,
  titleSize,
  titleColor,
}) => {
  const defaultSize = Image.resolveAssetSource(src);

  return (
    <TouchableOpacity
      style={{
        width: width || defaultSize.width,
        height: height || defaultSize.height,
      }}
      onPress={onPressed}
      activeOpacity={0.7}
    >
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 10,
        }}
        source={src}
        resizeMode="stretch"
      >
        {title && (
          <Text
            style={{
              position: "absolute",
              fontFamily: "DGM",
              fontSize: titleSize || 20,
              color: titleColor || "black",
              padding: 15,
            }}
          >
            {title}
          </Text>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ImageButton;
