import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const UserCard = ({gender, name}) => {
  const userImage =
    gender === 'he'
      ? require('../assets/Images/user.png')
      : require('../assets/Images/she_user.png');
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.userImage} source={userImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text>Last message</Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
  },
  textContainer: {
    marginLeft: 4,
  },
  text: {
    fontWeight: '500',
    color: '#000',
  },
});
