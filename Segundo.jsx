import { StyleSheet, Text, View } from 'react-native';
import Primeiro from './Primeiro'

const Segundo = () => {
    const texto = "O Miguel é lindo e maravilhoso, eu amo a pila dele"
    return (
        <>
            <Primeiro texto={texto} texto2= "ola"/>
            <Text>Segundo</Text>
        </>
    )
}

export default Segundo