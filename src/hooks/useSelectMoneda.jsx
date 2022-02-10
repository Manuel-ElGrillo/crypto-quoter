import React from 'react'
import styled from "styled-components";

import { useState } from 'react';

const Label = styled.label`
    display: block;
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 15px 0;
`;

const Select = styled.select`
    font-size: 18px;
    width: 100%;
    padding: 14px;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const useSelectMoneda = (label, monedas) => {

    const [state, setState] = useState("");
  
    const SelectMoneda = () => {
        return <>
        
        <Label>{label}</Label>

        <Select value={state}
                onChange={event => setState(event.target.value)}>

            <option value="">-- Seleccione --</option>

            {monedas.map( moneda => { //Iterando sobre el arreglo de monedas del archivo Formulario.jsx
                return <>
                
                    <option value={moneda.id} 
                            key={moneda.id}>
                                {moneda.nombre}
                    </option>
                
                </>
            })}
        </Select>
        
        </>
    }

    return [ state, SelectMoneda ];

}

export default useSelectMoneda