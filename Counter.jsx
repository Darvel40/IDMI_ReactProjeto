import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'react-native'

const Counter = props => {
    const [counter, setcounter] = useState(0);

    useEffect(() => {
        console.log("Counter alterado")
    }, [counter])

    //Função para incrementar counter
    const incrementa = () => {
        setcounter(counter+1);
    }

    return (
        <>
            <Text>{counter}</Text>
            <Button title='Decrementa' onPress={() => setcounter(counter-1)}></Button>
            <Button title='Incrementa' onPress={incrementa}></Button>
        </>
    )
}

Counter.propTypes = {}

export default Counter