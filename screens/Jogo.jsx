import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getBoardSize, addVictoryHistory  } from '../store';
import { Dialog, Portal, Button } from 'react-native-paper';

const Jogo = () => {
    const dispatch = useDispatch();
    const { columnCount, rowCount } = useSelector(getBoardSize);
    const WINNING_LENGTH = 4;

    const createBoard = () => {
        return Array.from(Array(rowCount), () => Array(columnCount).fill(0));
    };

    useEffect(() => {
        setBoard(createBoard(columnCount, rowCount));
        setCurrentPlayer(1);
    }, [columnCount, rowCount]);

    const checkForWin = (board, player) => {
        // Verificar vitória horizontal
        for (let row = 0; row < rowCount; row++) {
            for (let col = 0; col <= columnCount - WINNING_LENGTH; col++) {
                if (
                    board[row][col] === player &&
                    board[row][col + 1] === player &&
                    board[row][col + 2] === player &&
                    board[row][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        // Verificar vitória vertical
        for (let row = 0; row <= rowCount - WINNING_LENGTH; row++) {
            for (let col = 0; col < columnCount; col++) {
                if (
                    board[row][col] === player &&
                    board[row + 1][col] === player &&
                    board[row + 2][col] === player &&
                    board[row + 3][col] === player
                ) {
                    return true;
                }
            }
        }

        // Verificar vitória na diagonal (esquerda para direita)
        for (let row = 0; row <= rowCount - WINNING_LENGTH; row++) {
            for (let col = 0; col <= columnCount - WINNING_LENGTH; col++) {
                if (
                    board[row][col] === player &&
                    board[row + 1][col + 1] === player &&
                    board[row + 2][col + 2] === player &&
                    board[row + 3][col + 3] === player
                ) {
                    return true;
                }
            }
        }

        // Verificar vitória na diagonal (direita para esquerda)
        for (let row = 0; row <= rowCount - WINNING_LENGTH; row++) {
            for (let col = WINNING_LENGTH - 1; col < columnCount; col++) {
                if (
                    board[row][col] === player &&
                    board[row + 1][col - 1] === player &&
                    board[row + 2][col - 2] === player &&
                    board[row + 3][col - 3] === player
                ) {
                    return true;
                }
            }
        }

        return false;
    };

    const [board, setBoard] = useState(createBoard());
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogEmpateVisible, setDialogEmpateVisible] = useState(false);

    const onDialogDismiss = () => {
        setDialogVisible(false);
        setDialogEmpateVisible(false);
        setBoard(createBoard());
        setCurrentPlayer(1);
      };

    const handleSquarePress = (row, col) => {
        const updatedBoard = [...board];
        for (let rowIndex = rowCount - 1; rowIndex >= 0; rowIndex--) {
            if (updatedBoard[rowIndex][col] === 0) {
                updatedBoard[rowIndex][col] = currentPlayer;

                if (checkForWin(updatedBoard, currentPlayer)) {
                    if (currentPlayer === 1) {
                        setDialogVisible(true);
                        dispatch(addVictoryHistory(1, new Date().toISOString()));
                    } else if (currentPlayer === 2) {
                        setDialogVisible(true);
                        dispatch(addVictoryHistory(2, new Date().toISOString()));
                    }
                    return;
                }

                break;
            }
        }

        if (updatedBoard.every((row) => row.every((cell) => cell !== 0))) {
            setDialogEmpateVisible(true);
            setBoard(createBoard());
            setCurrentPlayer(1);
            return;
        }

        setBoard(updatedBoard);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };

    const renderCell = (row, col) => {
        const cellValue = board[row][col];
        let cellColor = 'white';
        if (cellValue === 1) {
            cellColor = 'blue';
        } else if (cellValue === 2) {
            cellColor = 'red';
        }
        return (
            <TouchableOpacity
                key={col}
                style={[styles.cell, { backgroundColor: cellColor }]}
                onPress={() => handleSquarePress(row, col)}
            />
        );
    };

    const renderRow = (row) => {
        return (
            <View key={row} style={styles.row}>
                {board[row].map((_, col) => renderCell(row, col))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                É a vez do jogador {currentPlayer === 1 ? 'Azul' : 'Vermelho'}
            </Text>
            <View style={styles.board}>{board.map((_, row) => renderRow(row))}</View>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={onDialogDismiss}>
                <Dialog.Title>
                    O Jogador {currentPlayer === 1 ? 'Azul' : 'Vermelho'} Ganhou!
                </Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={onDialogDismiss}>Fechar</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={dialogEmpateVisible} onDismiss={onDialogDismiss}>
                <Dialog.Title>
                    Empate!
                </Dialog.Title>
                <Dialog.Actions>
                    <Button onPress={onDialogDismiss}>Fechar</Button>
                </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    board: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 45,
        height: 45,
        margin: 5,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
    },
});

export default Jogo;
