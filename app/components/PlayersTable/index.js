/**
 *
 * Table
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {StyledTable, Tbody, Td, Tr} from './tableStyles';

function Table(props) {
  return (
    <StyledTable>
      <Tbody>
      <Tr>
        <Td>First Name</Td>
        <Td>Last Name</Td>
        <Td>Rating</Td>
        <Td>Handedness</Td>
        <Td>Delete Player</Td>
      </Tr>
      {props.players.map(player => {
        return (
          <Tr key={player.id}>
            <Td>{player.first_name.charAt(0).toUpperCase() + player.first_name.slice(1)}</Td>
            <Td>{player.last_name.charAt(0).toUpperCase() + player.last_name.slice(1)}</Td>
            <Td>{player.rating}</Td>
            <Td>{player.handedness.charAt(0).toUpperCase() + player.handedness.slice(1)}</Td>
            <Td onClick={props.onClick.bind(this, player.id)} className="delete"><strong>Delete Player</strong></Td>
          </Tr>
        );
      })}
      </Tbody>
    </StyledTable>
  );
}

Table.propTypes = {
  players: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Table;
