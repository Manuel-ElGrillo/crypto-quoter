import React from 'react'
import styled from 'styled-components';
import useSelectMoneda from '../hooks/useSelectMoneda';
import { useEffect, useState } from 'react';
import MensajeError from './MensajeError';


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: all 300ms ease;

    &:hover {
        cursor: pointer;
        background-color: #7A7BFD;
    }
`;

const Formulario = ({setMonedaElegida}) => {

    const monedas = [
        {id: "USD", nombre: "Dólar estadounidense"},
        {id: "EUR", nombre: "Euro"},
        {id: "GBP", nombre: "Libra esternila"},
    ]

    const [criptos, setCriptos] = useState([]);

    const [mensajeError, setMensajeError] = useState(false);

    const [moneda, SelectMoneda] = useSelectMoneda("Elige tu Divisa", monedas); //Pasando un parametro por defecto o estado inicial como un useState
    const [criptoMoneda, SelectCriptoMoneda] = useSelectMoneda("Elige tu Criptomoneda", criptos);

    

    //Consultando una API desde cryptocompare.com
    useEffect(() => {
        const consultarAPI = async () => {
            const URL = "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

            const resp = await fetch(URL);
            // console.log("Respuesta", resp);

            const resultado = await resp.json();
            // console.log("Resultado", resultado.Data);

            //Construyendo un arreglo para esta información
            const arrayCriptos = resultado.Data.map( criptoMoneda => {
                // console.log(criptoMoneda);
                // console.log("Coin Info", criptoMoneda.CoinInfo);

                const criptoInfo = {
                        id: criptoMoneda.CoinInfo.Name,
                        nombre: criptoMoneda.CoinInfo.FullName,
                }
                // console.log(criptoInfo);

                return criptoInfo;

            })

            setCriptos(arrayCriptos);
        }

        consultarAPI();

    }, []);


    // Validando el formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        if ([moneda, criptoMoneda].includes("")) {
            setMensajeError(true);
            return;
        }

        setMensajeError(false);

        //Pasando las monedas elegidas a App.jsx
        setMonedaElegida({moneda, criptoMoneda});
        
    }
   

  return (
    <>

    {mensajeError && <MensajeError/>}
    
    <form onSubmit={handleSubmit}>

        <SelectMoneda/>

        <SelectCriptoMoneda />

        <InputSubmit type="submit"
                     value="Cotizar" />        

    </form>
    
    </>
  )
}

export default Formulario