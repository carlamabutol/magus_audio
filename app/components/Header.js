import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import * as React from 'react';

export const HeaderNavBar = () => {
  const Icon = () => (
    <View>
      <Text>X</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.x}>
            {Icon()}
        </TouchableOpacity>
      <View style={styles.btnRightContainer}>
        <View style={styles.btnRight}>
        <TouchableOpacity style={styles.x}>
            {Icon()}
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.x}>
            {Icon()}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnRight: {
    marginRight: 8,
  },
  x: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
