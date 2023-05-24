import React from 'react';
import {View} from 'react-native';
import {Text, Button, Card, Avatar} from 'react-native-paper';
import {AuthContext, Roles} from '../util/AuthContext';
import {auth} from '../../config/FirebaseConfig';
import styles from '../util/styles';

const Profile = () => {
  const {signOut, userData} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Card style={{width: '100%', flex: 1}}>
        <Card.Title
          title={<Text variant="titleLarge">Profile</Text>}
          // eslint-disable-next-line react/no-unstable-nested-components
          left={props => <Avatar.Icon {...props} icon={'account'} />}
        />
        <Card.Content>
          {userData.role === Roles.Driver ? (
            <>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Name/Alias:</Text>
                <Text variant="titleLarge">{userData.name}</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">E-mail:</Text>
                <Text variant="titleLarge">{auth.currentUser?.email}</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">User ID:</Text>
                <Text variant="titleLarge">{auth.currentUser?.uid}</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Transport ID:</Text>
                <Text variant="titleLarge">{userData.transport}</Text>
              </View>
            </>
          ) : userData.role === Roles.User ? (
            <>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Name/Alias:</Text>
                <Text variant="titleLarge">{userData.name}</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">E-mail:</Text>
                <Text variant="titleLarge">{auth.currentUser?.email}</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">User ID:</Text>
                <Text variant="titleLarge">{auth.currentUser?.uid}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">User ID:</Text>
                <Text variant="titleLarge">{auth.currentUser?.uid}</Text>
              </View>
            </>
          )}
          <View>
            <Button
              icon="logout"
              mode="contained"
              onPress={signOut}
              style={{margin: 10}}>
              Sign Out
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default Profile;
