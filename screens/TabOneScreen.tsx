import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Animated, Text, View, PanResponder } from 'react-native';
import { RootTabScreenProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    backgroundColor: '#DC143C',
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const position = useRef(new Animated.ValueXY()).current;
  const size = useRef(new Animated.Value(0.5)).current;
  const rotateRef = useRef(new Animated.Value(0)).current;
  const rotateInterpolate = rotateRef.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const animateSize = {
    transform: [
      {
        scale: size,
      },
      {
        rotate: rotateInterpolate,
      },
    ],
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: () => {
      Animated.parallel([
        Animated.timing(rotateRef, {
          toValue: 1,
          useNativeDriver: false,
        }),
        Animated.timing(size, {
          toValue: 2,
          useNativeDriver: false,
        }),
        Animated.spring(
          position,
          {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }, // Back to zero
        ),
      ]).start();
    },
    onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
      useNativeDriver: false,
    }),
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.ball, position.getLayout(), animateSize]}
        {...panResponder.panHandlers}
      />
    </View>
  );
}
