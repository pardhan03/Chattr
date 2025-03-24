import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
const GetStarted = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.headingText}>Chattr</Text>
        <Icon name="chat" size={200} color="#635DE6" />
      </View>
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subHeading}>
          Getting close to your circle with us.
        </Text>
        <Text style={styles.subText}>
          Don't forget to catch up with your friend for making the best
          connections.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingVertical: 100,
    backgroundColor: '#fff',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: '#635de6',
    fontWeight: 'bold',
    fontSize: 32,
  },
  subHeadingContainer: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  subHeading: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    paddingBottom: 12,
  },
  subText: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    paddingBottom: 8,
  },
  button: {
    backgroundColor: '#635DE8',
    padding: 4,
    borderRadius: 30,
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
});
