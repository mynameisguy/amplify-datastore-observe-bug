/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DataStore} from 'aws-amplify';
import {Todo} from './src/models';

const App: () => React$Node = () => {
  DataStore.observe(Todo).subscribe((msg) =>
    console.log('subscribed activated TODO ALL'),
  );
  DataStore.observe(Todo, (c) => c.name('eq', 'todo1')).subscribe((msg) =>
    console.log('subscribed activated TODO1'),
  );

  const firstTodo1 = new Todo({name: 'todo1', description: 'description1'});
  const firstTodo2 = new Todo({name: 'todo2', description: 'description2'});
  const addTodo1 = () => {
    DataStore.save(firstTodo1);
  };
  const updateTodo1 = () => {
    DataStore.save(
      Todo.copyOf(firstTodo1, (updated) => {
        updated.description = Math.random().toString(16).substr(2, 8);
      }),
    );
  };
  const addTodo2 = () => {
    DataStore.save(new Todo({name: 'todo2', description: 'description2'}));
  };
  const updateTodo2 = () => {
    DataStore.save(
      Todo.copyOf(firstTodo2, (updated) => {
        updated.description = Math.random().toString(16).substr(2, 8);
      }),
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Pressable onPress={addTodo1}>
            <Text style={styles.sectionTitle}>addTodo1</Text>
          </Pressable>
          <Pressable onPress={updateTodo1}>
            <Text style={styles.sectionTitle}>updateTodo1</Text>
          </Pressable>
          <Pressable onPress={addTodo2}>
            <Text style={styles.sectionTitle}>addTodo2</Text>
          </Pressable>
          <Pressable onPress={updateTodo2}>
            <Text style={styles.sectionTitle}>updateTodo2</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
