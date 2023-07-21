import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardSize, getBoardSize } from '../store';

const Settings = () => {
  const dispatch = useDispatch();
  const { columnCount, rowCount } = useSelector(getBoardSize);
  const [newColumnCount, setNewColumnCount] = useState(columnCount.toString());
  const [newRowCount, setNewRowCount] = useState(rowCount.toString());
  const [columnError, setColumnError] = useState('');
  const [rowError, setRowError] = useState('');

  // Atualizar os campos de entrada quando as variáveis da store forem modificadas
  useEffect(() => {
    setNewColumnCount(columnCount.toString());
    setNewRowCount(rowCount.toString());
  }, [columnCount, rowCount]);

  const handleSaveChanges = () => {
    const parsedColumnCount = parseInt(newColumnCount);
    const parsedRowCount = parseInt(newRowCount);

    if (isNaN(parsedColumnCount) || isNaN(parsedRowCount)) {
      return;
    }

    // Definir valores de máximo e mínimo permitidos
    const minColumnCount = 4;
    const maxColumnCount = 7;
    const minRowCount = 4;
    const maxRowCount = 10;

    // Verificar se as colunas estão dentro dos limites
    if (parsedColumnCount < minColumnCount || parsedColumnCount > maxColumnCount) {
      setColumnError(`As Colunas tem que ser entre ${minColumnCount} a ${maxColumnCount}`);
      return;
    } else {
      setColumnError('');
    }

    // Verificar se as linhas estão dentro dos limites
    if (parsedRowCount < minRowCount || parsedRowCount > maxRowCount) {
      setRowError(`As Linhas tem que ser entre ${minRowCount} and ${maxRowCount}`);
      return;
    } else {
      setRowError('');
    }

    dispatch(setBoardSize(parsedColumnCount, parsedRowCount));
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Title>Colunas:</Title>
        <TextInput
          mode='outlined'
          value={newColumnCount}
          onChangeText={text => setNewColumnCount(text)}
          keyboardType="numeric"
          style={styles.textinput}
        />
        
      </View>
      <HelperText type="error">{columnError}</HelperText>
      <View style={styles.container2}>
        <Title>Linhas:</Title>
        <TextInput
          mode='outlined'
          value={newRowCount}
          onChangeText={text => setNewRowCount(text)}
          keyboardType="numeric"
          style={styles.textinput2}
        />
        
      </View>
      <HelperText type="error">{rowError}</HelperText>
      <Button mode="contained" onPress={handleSaveChanges} style={styles.button} buttonColor='blue'>Salvar alterações</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  container2: {
    marginBottom: 15, 
    marginLeft: 15, 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  textinput: {
    marginLeft: 15,  
    height: 50, 
    width: 50
  },
  textinput2: {
    marginLeft: 28, 
    height: 50, 
    width: 50
  },
  button: {
    width: 230
  },
});

export default Settings;
