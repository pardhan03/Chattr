import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({route}) => {
  const {user} = route?.params;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const userImage =
    user?.gender === 'he'
      ? require('../assets/Images/user.png')
      : require('../assets/Images/she_user.png');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chats')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      text: inputText,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        id: user?.id,
        name: user?.name,
      },
    };

    await firestore().collection('chats').add(newMessage);
    setInputText('');
  };

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
          </View>
        </View>
        <View style={styles.callContainer}>
          <Ionicons name="call-outline" color="#000" size={24} />
          <Ionicons name="videocam-outline" color="#000" size={24} />
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageBubble,
              item.user.id === user?.id
                ? styles.myMessage
                : styles.otherMessage,
            ]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.sendContainer}>
        <TextInput
          placeholder="Your Message..."
          style={styles.messageInput}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Ionicons
            name="send"
            color="#6157DE"
            size={28}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6157DE',
    marginRight: 10,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
    marginLeft: 10,
  },
  messageText: {
    color: '#fff',
  },
  sendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 20,
    marginRight: 10,
  },
  sendIcon: {
    marginBottom: 10,
  },
});
