import React from 'react';
import { Image, View } from 'react-native';
import { IMAGES } from '../../Constants';

function Enemy({ body }) {
  const { x, y } = body.position;
  const { max, min } = body.bounds;
  const width = max.x - min.x;
  const height = max.y - min.y;

  return (
    <View
      style={{
        position: 'absolute',
        top: y - height / 2,
        left: x - width / 2,
        width,
        height,
      }}
    >
      <Image
        style={{
          flex: 1,
          width: null,
          height: null,
          resizeMode: 'stretch',
        }}
        source={IMAGES.ENEMY}
      />
    </View>
  );
}

export default React.memo(Enemy);
