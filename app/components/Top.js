import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';


export const TopNavBar = () => {
  const Icon = () => (
    <View>
      <Text>X</Text>
    </View>
  );
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{ width: width / 3 }}>
      <TouchableOpacity style={styles.x}>
            {Icon()}
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.titleContainer,
          {
            width: width / 3,
          },
        ]}
      >
        <Text style={styles.title}>Header</Text>
      </View>
      <View style={{ width: width / 3 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
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