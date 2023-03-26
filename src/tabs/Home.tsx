import React from 'react';
import {View} from 'react-native';
import {Card, Title, Paragraph, IconButton} from 'react-native-paper';
import styles from '../styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{uri: 'https://picsum.photos/id/690/200/300'}} />
        <Card.Content>
          <Title>Welcome to Passenger Transport App!</Title>
          <Paragraph>
            This app is under construction. Passengers will be able to handle
            all their Transport related needs such as payment, tracking and
            other information management.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <IconButton icon="heart-plus" onPress={() => {}} />
          <IconButton icon="share" onPress={() => {}} />
        </Card.Actions>
      </Card>
    </View>
  );
}
