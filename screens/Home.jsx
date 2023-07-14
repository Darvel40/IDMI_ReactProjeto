import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Segundo from '../Segundo';
import Counter from '../Counter';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

export default function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <Segundo/>
          <Counter/>
          <Button title='Settings' onPress={() => navigation.navigate("Settings")}></Button>
          <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
