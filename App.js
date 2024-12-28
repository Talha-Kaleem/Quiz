import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListScreen from './screens/ListScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
