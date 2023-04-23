import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Button, TextInput} from 'react-native-paper';
import Constants from 'expo-constants';
import styles from './styles';

const API_KEY = Constants.expoConfig.android.config.googleMaps.apiKey;

const Checkout = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [distance, setDistance] = useState('');

  const calculateDistance = () => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup}&destination=${dropoff}&key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const distanceInMeters = data.routes[0].legs[0].distance.value;
        const distanceInKm = distanceInMeters / 1000;
        setDistance(distanceInKm.toFixed(2));
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Pickup location"
          value={pickup}
          mode="flat"
          onChangeText={setPickup}
        />
        <TextInput
          placeholder="Dropoff location"
          value={dropoff}
          mode="flat"
          onChangeText={setDropoff}
        />
        <Button
          onPress={calculateDistance}
          mode="contained"
          style={{margin: 10}}>
          Calculate Distance
        </Button>
        {distance ? <Text>{distance} km</Text> : null}
      </View>
    </View>
  );
};

export default Checkout;
