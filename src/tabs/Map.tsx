import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Text, Button} from 'react-native-paper';
import MapView, {MapMarker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/FontAwesome';
import * as Location from 'expo-location';
import styles from '../util/styles';
import {db} from '../../config/FirebaseConfig';
import {collection, getDocs} from 'firebase/firestore';

const Map = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [mapRegion, setRegion] = useState({
    latitude: 6.886918424989488,
    longitude: 79.91780374988613,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  });
  const [permission, setPermission] = useState(null);
  const [markers, setMarkers] = useState([{id: '', latitude: 0, longitude: 0}]);
  const insets = useSafeAreaInsets();

  const getUserLoc = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    setPermission(status === 'granted');

    let {
      coords: {latitude, longitude},
    } = await Location.getCurrentPositionAsync({});
    setLocation({latitude, longitude});
    console.log(`${latitude},${longitude}`);

    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    });
  };

  const markerStream = async () => {
    const markerList = [];
    const query = await getDocs(collection(db, 'transportLoc'));
    query.forEach(doc => {
      markerList.push({
        id: doc.id,
        latitude: doc.get('location').latitude,
        longitude: doc.get('location').longitude,
      });

      setMarkers(markerList);
    });
  };

  useEffect(() => {
    getUserLoc();
    markerStream();
  }, []);
<<<<<<< Updated upstream

  const refreshMap = () => {
    getUserLoc();
    markerStream();
  };

=======
  
>>>>>>> Stashed changes
  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {permission ? (
        <>
          <MapView
            style={styles.maps}
            provider={PROVIDER_GOOGLE}
            region={mapRegion}
            onRegionChangeComplete={region => setRegion(region)}>
            <MapMarker title="You" coordinate={location}>
              <Icon size={32} name="user-circle-o" />
            </MapMarker>
            {markers.map((marker, i) => (
              <MapMarker
                title="Transport"
                description={`ID: ${marker.id}`}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                key={i}>
                <Image
                  source={require('../../assets/minibus.png')}
                  style={{height: 28}}
                  resizeMode="contain"
                />
              </MapMarker>
            ))}
          </MapView>
          <Button
            onPress={refreshMap}
            mode="contained"
            style={{position: 'absolute', bottom: 1, margin: 10}}>
            Refresh
          </Button>
        </>
      ) : !permission ? (
        <Text>No access to location</Text>
      ) : (
        <Text>Requesting permission...</Text>
      )}
    </View>
  );
};

export default Map;
