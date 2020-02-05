import React from 'react';
import styled from 'styled-components';

const StyledLegsList = styled.ul`
  > li {
    display: grid;
    grid-template-columns:1fr 2fr 2fr;
    padding:10px;
  }
`;

function LegsList({legs}) {
  return (
    <StyledLegsList>
      {legs.map((leg) =>
        <li className="legs-list-content">
          <span><b>{leg.mode}:</b><br/>{parseInt(leg.distance)} m</span>
          <span><b>From:</b><br/>{leg.from.name}</span>
          <span><b>To:</b><br/>{leg.to.name}</span>
        </li>
      )}
    </StyledLegsList>
  )
}

export default LegsList
