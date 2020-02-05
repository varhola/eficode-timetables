import React, { useState, useReducer, useEffect } from 'react';
import { usePosition } from './hooks/usePosition';
import Plan from './Plan/Plan';
import styled from 'styled-components';

const AppGrid = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  background-color: #e1eaea;
  min-height: -webkit-fill-available;
  > h1 {
    align-self: center;
  }
  > h2 {
    align-self: center;
  }
`;

const CoordinateForm = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  justify-items:center;
  min-width: 90%;
  > div {
    margin:10px;
    background-color: #87abab;
    padding: 0 20px 20px 20px;
    border-radius:10px;
  }
`;

const StyledButton = styled.button`
  padding:10px;
  font-size:20px;
  border-radius:10px;
  background-color: #87abab;
`;

function reducer(state, { field, value }) {
  return { ...state, [field]: value }
}

function App(props) {

  const {latitude, longitude} = usePosition();
  const [plans, setPlans] = useState({});

  const [coordinates, dispatch] = useReducer(reducer,
    {
      from_lat: latitude,
      from_lon: longitude,
      to_lat: 60.1693803,
      to_lon: 24.9236575,
    });

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  }

  const getPlans = () => {
    fetch(
      "http://localhost:9000/plans", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(coordinates)
      }
    )
      .then(res => res.text())
      .then(res => JSON.parse(res))
      .then(res => setPlans(res))
      .catch(err => err);
  };

  useEffect(() => {
    dispatch({field: "from_lat", value: latitude})
    dispatch({field: "from_lon", value: longitude})
  }, [latitude, longitude]);

  return (
    <AppGrid>
      <h1 onClick={() => getPlans()}>Timetable App</h1>
      <h2>Coordinates</h2>
      <CoordinateForm>
        <div>
          <h3>From</h3>
          <label><b>latitude:</b></label>
          <br/>
          <input name="from_lat" value={coordinates.from_lat} onChange={handleChange}/>
          <br/>
          <label><b>longitude:</b></label>
          <br/>
          <input name="from_lon" value={coordinates.from_lon} onChange={handleChange}/>
        </div>
        <div>
          <h3>To</h3>
          <label><b>latitude:</b></label>
          <br/>
          <input name="to_lat" value={coordinates.to_lat} onChange={handleChange}/>
          <br/>
          <label><b>longitude:</b></label>
          <br/>
          <input name="to_lon" value={coordinates.to_lon} onChange={handleChange}/>
        </div>
      </CoordinateForm>
      <StyledButton type="submit" onClick={() => getPlans()}>Get route plans</StyledButton>
      <h2>Route plans</h2>
      {plans.data ? plans.data.plan.itineraries.map((itinierary) => <Plan initierary={itinierary}/>) : ""}
    </AppGrid>
  )

}

export default App;
