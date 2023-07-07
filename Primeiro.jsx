import React from 'react'
import { Text } from 'react-native'
import { PropTypes } from 'prop-types'

const Primeiro = ({ texto, texto2}) => {
    //const texto = params.texto;
    return (
        <Text>{texto}</Text>
    )
}

Primeiro.defaultProps = {
    texto: "É o valor default",
}

Primeiro.propTypes = {
    texto: PropTypes.string,
}

export default Primeiro