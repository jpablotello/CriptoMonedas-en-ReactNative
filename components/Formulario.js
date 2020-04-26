import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import  axios from 'axios';

const Formulario = ({moneda, criptoMoneda, setMoneda, setCriptoMoneda, setConsultarApi}) => {

    const [ criptoMonedas, setCriptoMonedas ] = useState([]);

    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    };

    const obtenerCriptoMoneda = cripto => {
        setCriptoMoneda(cripto);
    };

    const cotizarPrecio = () => {
        if(moneda.trim() === '' || criptoMoneda.trim() === ''){
            mostrarAlerta();
            setConsultarApi(false);

            return;
        }

        setConsultarApi(true);

    };

    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                { text: 'OK'},
            ]
        )
    }

    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            setCriptoMonedas(resultado.data.Data);
            console.log(resultado.data.Data);
            console.log(criptoMonedas);
        };

        consultarApi();

//        cotizarPrecio();
    }, [])

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker 
                selectedValue={moneda}
                onValueChange={ moneda => obtenerMoneda(moneda)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar (EEUU)" value="USD" />
                <Picker.Item label="Peso (AR)" value="ARS" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            
            <Picker 
                selectedValue={criptoMoneda}
                onValueChange={ cripto => obtenerCriptoMoneda(cripto)}
                itemStyle={{ height: 120 }}
            >
                <Picker.Item label="- Seleccione -" value="" />
                { criptoMonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>

            <TouchableHighlight
                onPress={cotizarPrecio}
                style={styles.btnCotizar}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        textTransform: 'uppercase',
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})

export default Formulario

