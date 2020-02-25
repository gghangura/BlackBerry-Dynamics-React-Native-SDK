/**
 * Copyright (c) 2020 BlackBerry Limited. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Sample code for React Native SQLite Storage: https://aboutreact.com/example-of-sqlite-database-in-react-native/ 
 */
 
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ActionButton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#4486f5',
    color: '#ffffff',
    padding: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    borderRadius: 10
  },
  text: {
    color: '#ffffff',
  },
});

export default ActionButton;
