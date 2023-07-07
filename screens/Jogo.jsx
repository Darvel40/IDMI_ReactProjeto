import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'react-native'
import Tile from '../components/Tile'
import { View } from 'react-native'

const Jogo = props => {
  return (
    <>
        <Text>Jogo</Text>
        <View style={{flexDirection: 'row'}}>
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </View>
        <View style={{flexDirection: 'row'}}>
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </View>
        <View style={{flexDirection: 'row'}}>
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </View>
        <View style={{flexDirection: 'row'}}>
            <Tile />
            <Tile />
            <Tile />
            <Tile />
        </View>
        
    </>
  )
}

Jogo.propTypes = {}

export default Jogo