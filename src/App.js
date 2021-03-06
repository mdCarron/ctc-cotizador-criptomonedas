import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import axios from "axios";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  margin-bottom: 50px;
  margin-top: 80px;
  font-family: "Bebas Neue", cursive;
  font-weight: 700;
  font-size: 50px;
  text-align: left;
  color: #ffffff;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [cripto, guardarCripto] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    if (moneda === "") return;

    const cotizarCriptomoneda = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      guardarCargando(true);

      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[cripto][moneda]);
      }, 1500);
    };

    cotizarCriptomoneda();
  }, [moneda, cripto]);

  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotizador Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCripto={guardarCripto}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
