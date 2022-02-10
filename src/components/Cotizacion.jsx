import React from 'react'
import styled from "styled-components";

const Resultado = styled.div`
color: white;
font-family: "Lato", sans-serif;
display: flex;
align-items: center;
gap: 1rem;
margin-top:10px;
`;

const Precio = styled.p`
font-size: 24px;
span {
    font-weight: 700;
}
`;

const Texto = styled.p`
font-size: 18px;
span {
    font-weight: 700;
}
`;

const Imagen = styled.img`
display: block;
width: 150px;
`;

const Cotizacion = ({cotizacion}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = cotizacion;

  return (
    <>
    <Resultado>

        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Crypto Logo" />

        <div>

            <Precio>Precio actual: <span>{PRICE}</span></Precio>
            <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
            <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
            <Texto>Variación en las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>

        </div>
        

    </Resultado>
    
    </>
  )
}

export default Cotizacion