import { useState } from 'react';
import { Button, Pressable, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import axios from 'axios';

const API_KEY = 'd13447ffdefb53abd38f14b445a33e29'

export default function App() {
  const [cidade, setCidade] = useState("")
  const [tempo, setTempo] = useState(null)
  const [erro, setErro] = useState(null)

  const getTempo = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric`)
      if (response.status == 404) {
        setErro('Cidade não encontrada')
        setTempo(null)
      } else {
        setTempo(response.data)
        setErro(null)
      }
    } catch (error) {
      setTempo(null)
      setErro('Erro ao buscar a previsão')
    }
  }

  // determinando a cor da temperatura
  const corTemp = (tempNum) => {
    if(tempNum <= 27){
      return 'blue'
    } else {
      return 'red'
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('./assets/favicon.png')}/>
      {/*<Image source={uri:'endereco-da imagem'}/>*/}
      
      <Text>Informe o nome de uma Cidade:</Text>
      <TextInput
        placeholder='Nome da cidade'
        value={cidade}
        onChangeText={(text) => setCidade(text)}
      />
      <Button
        title='BUSCAR CLIMA'
        onPress={getTempo}
      />
      {/*<Image
      source={require('./assets/')/>*/}
      
      
      { erro && <Text>{erro}</Text>}

      {tempo && !erro &&(
        <View>
          <Text style={{ color: corTemp(tempo.main.temp)}}> {tempo.main.temp}°C</Text>
          <Text style={{ color: corTemp(tempo.main.temp)}}> {tempo.main.temp_min}°C</Text>
          <Text style={{ color: corTemp(tempo.main.temp)}}> {tempo.main.temp_max}°C</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    TextSize: 20
  },
});
