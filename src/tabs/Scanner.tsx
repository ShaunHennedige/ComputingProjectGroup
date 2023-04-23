import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {BarCodeScanner} from 'expo-barcode-scanner';
import styles from '../util/styles';

const Scanner = () => {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    const getPermission = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === 'granted');
    };

    getPermission();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // logic for handling the scanned qr goes here
  };

  return (
    <View style={styles.container}>
      {permission ? (
        !scanned && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )
      ) : !permission ? (
        <Text>No access to camera</Text>
      ) : (
        <Text>Requesting permission...</Text>
      )}
      {scanned && (
        <Button onPress={() => setScanned(false)} mode="contained">
          Tap to Scan
        </Button>
      )}
    </View>
  );
};

export default Scanner;
