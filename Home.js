import {
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

const Home = () => {
  const [number, setNumber] = useState(0);
  const [orientation, setOrientation] = useState(() => {
    const {width, height} = Dimensions.get('screen');
    if (width > height) return 'landscape';
    return 'portrait';
  });
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  //   console.log(data);
  useEffect(() => {
    const subscriber = Dimensions.addEventListener('change', () => {
      console.log('Perubahan Orientasi');
      setOrientation(orientation =>
        orientation === 'portrait' ? 'landscape' : 'portrait',
      );
    });

    // componentWillUnmount => return
    return () => subscriber.remove();
  }, []);

  return (
    <View style={styles.homeBackground}>
      <Text style={styles.homeText}>Home</Text>
      <Button color="black" title="Click Me" />
      <Pressable
        style={styles.homeBtn}
        // delayLongPress={5000}
        // onPressIn={() => console.log(1)}
        onPress={() => setNumber(number => number - 1)}
        // onPressOut={() => console.log(3)}
        onLongPress={() => setNumber(number => number + 1)}>
        <Text style={styles.homeBtnText}>Press Me To Change Counter</Text>
      </Pressable>
      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => navigation.navigate('Drawer')}>
        <Text style={styles.homeBtnText}>Go to Drawer</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.homeCounter}>{number}</Text>
      </View>
      {/* <View style={styles.nameContainer}>
        {data.length &&
          data.map(datum => {
            return (
              <View key={datum.id} style={styles.nameCard}>
                <Text>{datum.name}</Text>
                <Text>{datum.username}</Text>
                <Text>{datum.email}</Text>
              </View>
            );
          })}
      </View> */}
      {data.length ? (
        <FlatList
          key={`flatlist-${orientation}`}
          data={data}
          numColumns={orientation === 'portrait' ? 2 : 3}
          renderItem={({item}) => {
            return (
              <View
                key={item.id}
                style={{
                  ...styles.nameCard,
                  minWidth: orientation === 'portrait' ? '50%' : '33%',
                }}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.nameText}>{item.username}</Text>
                <Text style={styles.nameText}>{item.email}</Text>
              </View>
            );
          }}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default Home;
