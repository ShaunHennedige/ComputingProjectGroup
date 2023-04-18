import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import styles from '../styles';

// https://docs.expo.dev/versions/latest/sdk/map-view/
// latitudeDelta and longitudeDelta refers to zoom/scale
const Map = () => {
  const [cord, setCord] = React.useState({
    latitude: 6.886918424989488,
    longitude: 79.91780374988613,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: cord.latitude,
          longitude: cord.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        onRegionChangeComplete={region =>
          setCord({latitude: region.latitude, longitude: region.longitude})
        }
      />
    </View>
  );
};

export default Map;
