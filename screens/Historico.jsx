import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { List } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native';

const selectVictoryHistory = state => state?.victoryHistory || [];

const Historico = () => {

    const victoryHistory = useSelector(selectVictoryHistory);
    const [sortedHistory, setSortedHistory] = useState([]);

    useEffect(() => {
        // Reverter o array victoryHistory e criar uma cópia
        const sorted = victoryHistory.slice(0).reverse();

        // Atualizar o estado com o histórico de vitórias ordenado
        setSortedHistory(sorted);
    }, [victoryHistory]);

    return (
        <ScrollView>
        <List.Section>
            {sortedHistory.map((item, index) => (
                <List.Item
                key={index}
                title={item.winner === 1 ? "Blue" : "Red"}
                description={new Date(item.timestamp).toLocaleString()}
                left={props => <Ionicons {...props} name="person" size={40} color={item.winner === 1 ? "#0000ff" : "#ff0000"} />}
                />
            ))}
        </List.Section>
        </ScrollView>
    )
}

export default Historico