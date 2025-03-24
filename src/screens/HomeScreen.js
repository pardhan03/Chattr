import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserCard from '../components/UserCard';
import {userData} from '../assets/utils/constant';
import {useNavigation} from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItems = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('userChat', {user: item})}>
      <UserCard gender={item?.gender} name={item?.name} />
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#d8e5ff', '#f0f3ff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.container}>
        <Text style={styles.title}>Chattr</Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="What are you looking for?"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <Ionicons name="search" size={20} color="#999" />
        </View>
      </LinearGradient>
      <FlatList
        data={userData}
        keyExtractor={item => item.id}
        renderItem={renderItems}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6a4fff',
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});
