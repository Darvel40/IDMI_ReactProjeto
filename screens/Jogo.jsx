import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const Jogo = () => {
    const { COLUMN_COUNT, ROW_COUNT } = useSelector(state => state);
    const WINNING_LENGTH = 4;

    const createBoard = () => {
        return Array.from(Array(ROW_COUNT), () => Array(COLUMN_COUNT).fill(0));
    };

    const checkForWin = (board, player) => {
        // Verificar vitória horizontal
        for (let row = 0; row < ROW_COUNT; row++) {
            for (let col = 0; col <= COLUMN_COUNT - WINNING_LENGTH; col++) {
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
        for (let row = 0; row <= ROW_COUNT - WINNING_LENGTH; row++) {
            for (let col = 0; col < COLUMN_COUNT; col++) {
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
        for (let row = 0; row <= ROW_COUNT - WINNING_LENGTH; row++) {
            for (let col = 0; col <= COLUMN_COUNT - WINNING_LENGTH; col++) {
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
        for (let row = 0; row <= ROW_COUNT - WINNING_LENGTH; row++) {
            for (let col = WINNING_LENGTH - 1; col < COLUMN_COUNT; col++) {
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

    const handleSquarePress = (row, col) => {
        const updatedBoard = [...board];
        for (let rowIndex = ROW_COUNT - 1; rowIndex >= 0; rowIndex--) {
            if (updatedBoard[rowIndex][col] === 0) {
                updatedBoard[rowIndex][col] = currentPlayer;

                if (checkForWin(updatedBoard, currentPlayer)) {
                    if (currentPlayer === 1) {
                        Alert.alert(`Jogador Azul Ganhou!`);
                    } else if (currentPlayer === 2) {
                        Alert.alert(`Jogador Vermelho Ganhou!`);
                    }
                    setBoard(createBoard());
                    setCurrentPlayer(1);
                    return;
                }

                break;
            }
        }

        if (updatedBoard.every((row) => row.every((cell) => cell !== 0))) {
            Alert.alert('Empate!');
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
