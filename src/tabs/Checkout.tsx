import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {BarCodeScanner} from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Payment from './Payment';
import styles from '../util/styles';

const Checkout = () => {
  const API_KEY = Constants.expoConfig.android.config.googleMaps.apiKey;
  const dropoff = '6.8212616,80.0416015';

  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [fee, setFee] = useState(0);
  const [transport, setTransport] = useState(0);

  useEffect(() => {
    const getPermission = async () => {
      const {status: perm} = await BarCodeScanner.requestPermissionsAsync();
      setPermission(perm === 'granted');
    };

    getPermission();
  }, []);

  const getLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    setPermission(status === 'granted');

    let {
      coords: {latitude, longitude},
    } = await Location.getCurrentPositionAsync({});
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=${dropoff}&key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const distanceInMeters = data.routes[0].legs[0].distance.value;
        const distanceInKm = distanceInMeters / 1000;
        // PRICE RATE: $2 per Km
        setFee(parseFloat((distanceInKm * 2).toFixed(2)));
      });
    setScanned(true);
    setIsPaying(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBarCodeScanned = ({type, data}) => {
    const scanData = JSON.parse(data);
    setTransport(scanData.transport);
    getLocation();
  };

  return (
    <View style={styles.container}>
      {permission ? (
        !scanned && !isPaying ? (
          <>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            <Button
              onPress={() => setScanned(true)}
              mode="contained"
              style={{position: 'absolute', bottom: 1, margin: 10}}>
              Tap to Cancel
            </Button>
          </>
        ) : scanned && isPaying ? (
          <Payment
            paymentData={{fee, transport}}
            isPaying={isPaying}
            setIsPaying={setIsPaying}
          />
        ) : null
      ) : !permission ? (
        <Text>No access to camera</Text>
      ) : (
        <Text>Requesting permission...</Text>
      )}
      {scanned && !isPaying && (
        <Button onPress={() => setScanned(false)} mode="contained">
          Tap to Scan
        </Button>
      )}
    </View>
  );
};

export default Checkout;
