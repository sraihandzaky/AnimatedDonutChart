import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DonutChart from '../Components/DonutChart';

const data = [
  {
    value: 8,
    color: 'tomato',
    max: 10,
  },
  {
    value: 14,
    color: 'skyblue',
    max: 20,
  },
  {
    value: 92,
    color: 'gold',
    max: 100,
  },
  {
    value: 240,
    color: '#222',
    max: 500,
  },
];

export default function AnimatedDonutChart() {
  return (
    <View style={styles.container}>
      {data.map((item, i) => {
        return (
          <DonutChart
            key={i}
            value={item.value}
            maxValue={item.max}
            color={item.color}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 8,
  },
});
