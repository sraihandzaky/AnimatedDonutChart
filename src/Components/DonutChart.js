import React from 'react';
import {View, Animated, TextInput, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function DonutChart({
  value = 75,
  radius = 70,
  strokeWidth = 15,
  duration = 500,
  color = 'tomato',
  delay = 0,
  textColor,
  maxValue = 100,
}) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const circleRef = React.useRef();
  const inputRef = React.useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
    // YoYo Loop for the percentage
    // .start(() => {
    //   animation(toValue === 0 ? percentage : 0);
    // })
  };

  React.useEffect(() => {
    animation(value);

    animatedValue.addListener((v) => {
      const maxPercentage = (100 * v.value) / maxValue;

      if (circleRef?.current) {
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPercentage) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }

      if (inputRef?.current) {
        inputRef.current.setNativeProps({
          // for displaying the value
          //   text: `${Math.round(v.value)}`,

          //for displaying the percentage
          text: `${Math.round(maxPercentage)}%`,
        });
      }
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  });

  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: radius / 2, color: textColor ?? color},
          {fontWeight: '900', textAlign: 'center'},
        ]}
      />
    </View>
  );
}
