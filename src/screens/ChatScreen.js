import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/dist/Entypo';

import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}) => {
  const getUsers = async () => {
    try {
      const usersSnapshot = await firestore().collection('chattr').get();
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Users in chattr collection:', usersData);
    } catch (error) {
      console.log(error);
    }
  };

  const userDocument = firestore().collection('Users').doc('1');
  console.log(userDocument);

  const {user} = route?.params;

  const navigation = useNavigation();

  const userImage =
    user?.gender === 'he'
      ? require('../assets/Images/user.png')
      : require('../assets/Images/she_user.png');

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.userDetailHeader}>
        <View style={styles.userIconContainer}>
          <Ionicons
            name="chevron-back"
            color="#000"
            size={28}
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
          <Image style={styles.userImage} source={userImage} />
          <View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Icon
              name="dot-single"
              size={32}
              color="#2BB54D"
              style={styles.dot}
            />
          </View>
        </View>
        <View style={styles.callContainer}>
          <Ionicons name="call-outline" color="#000" size={24} />
          <Ionicons name="videocam-outline" color="#000" size={24} />
        </View>
      </View>
      <View style={styles.sendContainer}>
        <View style={{width: '90%'}}>
          <TextInput
            placeholder="Your Message..."
            style={styles.messageInput}
          />
        </View>
        <Ionicons
          name="send"
          color="#6157DE"
          size={28}
          style={styles.sendIcon}
        />
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6F6',
  },
  userDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 100,
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  userIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {color: '#000', fontWeight: '500'},
  backButton: {
    paddingRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
  },
  callContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 12,
  },
  sendContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  messageInput: {
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 20,
  },
  sendIcon: {
    marginBottom: 10,
  },
});
