import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';

const Payment = (props: {
  paymentData: {fee: number; transport: number};
  isPaying: boolean;
  setIsPaying: (state: boolean) => void;
}) => {
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');

  const onMessage = async (e: any) => {
    let data = e.nativeEvent.data;
    props.setIsPaying(false);
    console.log(props.paymentData);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      alert(
        `Fare paid for transport ${props.paymentData.transport}. Have a great day!`,
      );
      // include logic
    } else {
      alert('Payment failed. Please try again.');
      // include logic
    }
  };

  return (
    <>
      <Modal
        visible={props.isPaying}
        onDismiss={() => props.setIsPaying(false)}
        onRequestClose={() => props.setIsPaying(false)}
        animationType={'slide'}
        transparent>
        <View style={styles.webViewCon}>
          <View style={styles.wbHead}>
            <TouchableOpacity
              style={{padding: 13}}
              onPress={() => props.setIsPaying(false)}>
              <Feather name={'x'} size={24} />
            </TouchableOpacity>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: '#00457C',
              }}>
              Checkout
            </Text>
            <View style={{padding: 13, opacity: prog ? 1 : 0}}>
              <ActivityIndicator size={24} color={progClr} />
            </View>
          </View>
          <WebView
            source={{
              uri: `https://computing-project-app.web.app/?d=${props.paymentData.fee}`,
            }}
            style={{flex: 1}}
            onLoadStart={() => {
              setProg(true);
              setProgClr('#000');
            }}
            onLoadProgress={() => {
              setProg(true);
              setProgClr('#00457C');
            }}
            onLoadEnd={() => {
              setProg(false);
            }}
            onLoad={() => {
              setProg(false);
            }}
            onMessage={onMessage}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});

export default Payment;
