import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = () => (
  <View>
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title="Home" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
    <Card>
      <Card.Cover source={{uri: 'https://picsum.photos/id/690/200/300'}} />
      <Card.Content>
        <Title>Welcome to Passenger Transport App!</Title>
        <Paragraph>
          This app is under construction. Passengers will be able to handle all
          their Transport related needs such as payment, tracking and other
          information management.
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Icon.Button
          name="favorite"
          backgroundColor="#fff"
          color="#000"
          onPress={() => {}}>
          Like
        </Icon.Button>
        <Icon.Button
          name="share"
          backgroundColor="#fff"
          color="#000"
          onPress={() => {}}>
          Share
        </Icon.Button>
      </Card.Actions>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
