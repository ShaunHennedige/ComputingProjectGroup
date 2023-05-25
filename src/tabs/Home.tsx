import React from 'react';
import {View} from 'react-native';
import {Card, Text, Avatar} from 'react-native-paper';
import styles from '../util/styles';
import {AuthContext, Roles} from '../util/AuthContext';

const Home = () => {
  const {userData} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Card style={{width: '100%', flex: 1}}>
        <Card.Cover source={require('../../assets/intro.gif')} />
        <Card.Title
          title={
            <Text variant="titleLarge">
              {userData.role === Roles.Anon
                ? 'Welcome!'
                : `Welcome, ${userData.name}!`}
            </Text>
          }
          subtitle={'Your RouteSync statistics:'}
          // eslint-disable-next-line react/no-unstable-nested-components
          left={props => <Avatar.Icon {...props} icon={'chart-bar'} />}
        />
        <Card.Content>
          {userData.role === Roles.Driver ? (
            <>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Total revenue this month:</Text>
                <Text variant="titleLarge">Rs. 0</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Passengers this month</Text>
                <Text variant="titleLarge">0 passengers</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Your transport ID:</Text>
                <Text variant="titleLarge">{userData.transport}</Text>
              </View>
            </>
          ) : userData.role === Roles.User ? (
            <>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Total fare this month:</Text>
                <Text variant="titleLarge">Rs. 0</Text>
              </View>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">Trips taken this month:</Text>
                <Text variant="titleLarge">0</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.cardSection}>
                <Text variant="bodyLarge">NOTE</Text>
                <Text variant="titleLarge">
                  Statistics are not available for anonymous users
                </Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

export default Home;
