import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState(null);

  const handleTap = (type, value) => {
    if (type === 'number') {
      setDisplay(prev => (prev === '0' ? value : prev + value));
    }
    if (type === 'operator') {
      setOperator(value);
      setFirstValue(parseFloat(display));
      setDisplay('0');
    }
    if (type === 'equal') {
      const secondValue = parseFloat(display);
      let result = 0;
      switch (operator) {
        case '+': result = firstValue + secondValue; break;
        case '-': result = firstValue - secondValue; break;
        case '×': result = firstValue * secondValue; break;
        case '÷': result = firstValue / secondValue; break;
      }
      setDisplay(String(result));
      setOperator(null);
      setFirstValue(null);
    }
    if (type === 'clear') {
      setDisplay('0');
      setOperator(null);
      setFirstValue(null);
    }
  };

  const renderButton = (label, type) => (
    <TouchableOpacity
      style={[styles.button, type === 'operator' && styles.operatorButton]}
      onPress={() => handleTap(type, label)}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <View style={styles.buttonsRow}>
        {renderButton('7', 'number')}
        {renderButton('8', 'number')}
        {renderButton('9', 'number')}
        {renderButton('÷', 'operator')}
      </View>
      <View style={styles.buttonsRow}>
        {renderButton('4', 'number')}
        {renderButton('5', 'number')}
        {renderButton('6', 'number')}
        {renderButton('×', 'operator')}
      </View>
      <View style={styles.buttonsRow}>
        {renderButton('1', 'number')}
        {renderButton('2', 'number')}
        {renderButton('3', 'number')}
        {renderButton('-', 'operator')}
      </View>
      <View style={styles.buttonsRow}>
        {renderButton('0', 'number')}
        {renderButton('C', 'clear')}
        {renderButton('=', 'equal')}
        {renderButton('+', 'operator')}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#f5f5f5',
  },
  displayContainer: {
    padding: 20,
    backgroundColor: '#fff', 
    alignItems: 'flex-end',
  },
  displayText: {
    fontSize: 48,
    color: '#000',
  },
  buttonsRow: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#888',
    backgroundColor: '#e0e0e0',
  },
  operatorButton: {
    backgroundColor: '#fe9241',
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});
