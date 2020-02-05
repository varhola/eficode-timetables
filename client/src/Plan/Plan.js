import React from 'react';
import LegsList from "./LegsList/LegsList"
import styled from 'styled-components';

const PlanBlock = styled.div`
  margin:20px;
  width:90%;
  border-radius:10px;
  background-color:#87abab;
  .header {
    padding:10px;
    > span {
      font-size: 15px;
      > b {
        font-size: 18px;
      }
    }
    display:flex;
    justify-content: space-evenly;
  }
`;

function Plan({initierary}) {
  const duration = `${parseInt(initierary.duration/60)} minutes`;
  const price = `${initierary.fares.reduce((sum, current) => sum + current.cents/100, 0)}  ${initierary.fares[0].currency}`;
  const options = { hour: 'numeric', minute: 'numeric' };
  const endTime = new Date(initierary.endTime).toLocaleDateString(undefined, options);
  return (
    <PlanBlock>
      <span className="header">
        <span><b>Duration:</b><br/>{duration}</span>
        <span><b>There:</b><br/>{endTime}</span>
        <span><b>Price:</b><br/>{price}</span>
      </span>
      <LegsList legs={initierary.legs}/>
    </PlanBlock>
  )
}

export default Plan
