import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {BarCodeScanner} from 'expo-barcode-scanner';
import styles from '../util/styles';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    // eslint-disable-next-line no-alert
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // logic for handling the scanned qr goes here
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting for camera permission</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        !scanned && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )
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
