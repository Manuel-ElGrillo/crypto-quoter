import styled from 'styled-components';
import BgImg from "../src/img/imagen-criptos.png";

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

import { useState, useEffect } from 'react';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #ffffff;
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto auto;
  }
`;

function App() {

  const [monedaElegida, setMonedaElegida] = useState({});
  const [cotizacion, setCotizacion] = useState({});

  const [cargando, setCargando] = useState(false);

  // Obteniendo la cotización del día desde la API
  useEffect( () => {
    if(Object.keys(monedaElegida).length > 0) {
      setCargando(true);

      const getCotizacion = async () => {
        const {moneda, criptoMoneda} = monedaElegida;

        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

        const resp = await fetch(URL);

        const resultado = await resp.json();
        // console.log(resultado);

        // Accediendo a las propiedades de forma dinámica de la respuesta al tipo de moneda y criptomoneda
        setCotizacion(resultado.DISPLAY[criptoMoneda][moneda]);

        setCargando(false);
      }

      getCotizacion();
    }
  }, [monedaElegida]);

  return (
    <>
      <Contenedor>

        <Imagen src={BgImg}
                alt="Background Image"/>

        <div>

          <Heading>Cotiza Criptomonedas al instante</Heading>

          <Formulario setMonedaElegida={setMonedaElegida}/>

          {cargando && <Spinner/>}

          {cotizacion.PRICE && <Cotizacion cotizacion={cotizacion}/>}
          {/* PRICE como propiedad de la respuesta de la API */}

        </div>

      </Contenedor>
      
    </>
  );
}

export default App;
