import React, {useContext} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../util/AuthContext';
import styles from '../util/styles';

const Generate = () => {
  const {userData} = useContext(AuthContext);
  const date = new Date().toJSON().slice(0, 10);

  const QRvalue = () => {
    const data = {
      transport: userData.transport,
      date: date,
    };

    return JSON.stringify(data);
  };

  return (
    <View style={styles.container}>
      <QRCode value={QRvalue()} size={256} />
      <Text style={{margin: 24}}>
        QR generated for transport {userData.transport} on {date}
      </Text>
    </View>
  );
};

export default Generate;
