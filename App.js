import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptoMoneda, setCriptoMoneda] = useState('');
  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});
  const [ loading, setLoading] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        setLoading(true);
        console.log('entrando a cotizar')
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        const resultado = await Axios.get(url);

        
        setTimeout(()=> {
          setResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
          setLoading(false);
          setConsultarApi(false);
        },3000)
      }
    }

    cotizarCriptomoneda();
  }, [consultarApi])

  const componente = loading ? <ActivityIndicator style={styles.spinner} size='large' color='5E49E2' /> : <Cotizacion resultado={resultado}/>

  return (
    <>
      <ScrollView>
        <Header />

        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />


        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptoMoneda={criptoMoneda}
            setMoneda={setMoneda}
            setCriptoMoneda={setCriptoMoneda}
            setConsultarApi={setConsultarApi}
          />

        </View>
        {componente}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  },
  spinner: {
    marginTop: 40
  }
});

export default App;
