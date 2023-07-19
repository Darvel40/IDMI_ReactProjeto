import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setBoardSize } from '../store';
import { getBoardSize } from '../store';

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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ marginBottom: 15, marginLeft: 15, alignItems: 'center', flexDirection: 'row' }}>
        <Title>Colunas:</Title>
        <TextInput
          mode='outlined'
          value={newColumnCount}
          onChangeText={text => setNewColumnCount(text)}
          keyboardType="numeric"
          style={{ marginLeft: 15, height: 50, width: 50}}
        />
        <HelperText type="error">{columnError}</HelperText>
      </View>
      <View style={{ marginBottom: 15, marginLeft: 15, alignItems: 'center', flexDirection: 'row' }}>
        <Title>Linhas:</Title>
        <TextInput
          mode='outlined'
          value={newRowCount}
          onChangeText={text => setNewRowCount(text)}
          keyboardType="numeric"
          style={{ marginLeft: 28, height: 50, width: 50}}
        />
        <HelperText type="error">{rowError}</HelperText>
      </View>
      <Button mode="contained" onPress={handleSaveChanges} style={{ width: 230}} buttonColor='blue'>Salvar alterações</Button>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 18,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default Settings;
