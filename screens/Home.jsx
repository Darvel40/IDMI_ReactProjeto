import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';

export default function Home() {

    return (
        <View style={styles.container}>
          <Text style={styles.text}>Filipe Lisboa</Text>
          <Text style={styles.text3}>N° 2022266</Text>
          <Text style={styles.text2}>Trabalho React Native</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text2: {
    fontSize: 30,
    marginBottom: 20,
  },
  text3: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
