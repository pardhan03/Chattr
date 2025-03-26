import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {Client, Account} from 'appwrite';
import {useNavigation} from '@react-navigation/native';
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67e3d478002687325815');

const account = new Account(client);

const AuthScreen = () => {
  const [name, SetName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [isSignUp, setIsSignUp] = useState(false);

  const navigation = useNavigation();

  //   console.log(
  //     account
  //       .createEmailPasswordSession('pardhanmanish7887@gmail.com', 'Pardhan@123')
  //       .then(res => {
  //         console.log(res);
  //       }),
  //   );
  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      if (isSignUp) {
        await account.create('unique()', email, password);
        Alert.alert('Success', 'Account created! Please log in.');
        navigation.navigate('Login');
      } else {
        await account.createEmailSession(email, password);
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Home');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const signUpUser = async (email, password) => {
    if (!email || !password) {
      return {success: false, error: 'Email and password are required'};
    }

    try {
      const user = await account.create(ID.unique(), email, password);
      console.log('User created:', user);
      navigation.navigate('Home');
      return {success: true, user};
    } catch (error) {
      console.log('Signup Error:', error.message);
      return {success: false, error: error.message};
    } finally {
      console.log('called the sign user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      {isSignUp && (
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={SetName}
          style={styles.input}
          autoCapitalize="none"
        />
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={signUpUser} style={styles.button}>
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Login'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsSignUp(!isSignUp);
        }}>
        <Text style={styles.switchText}>
          {isSignUp
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: 280,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    marginTop: 15,
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen;
