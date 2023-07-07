import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const Tile = props => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={styles.container}>
    <TouchableOpacity style={isPressed ? styles.tilePressed : styles.tile} onPress={() => setIsPressed(!isPressed)} >
    </TouchableOpacity>
    </View>
  )
}

Tile.propTypes = {}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    tile: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        width: 75,
        height: 75,
    },
    tilePressed: {
        alignItems: 'center',
        backgroundColor: '#0000FF',
        padding: 10,
        width: 75,
        height: 75,
    }
});

export default Tile;