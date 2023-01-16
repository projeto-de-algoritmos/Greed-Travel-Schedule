import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ModalExample } from './Modal';

export function Schedule(){
  const row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  
  const [activities, setActivities] = useState([[], [], [], [], []]);

  const [column, setColumn] = useState([]);

  return (
    <>
      <ModalExample activities={activities} setActivities={setActivities} setColumn={setColumn}/>
      {column !== undefined && (
        <Table variant='striped' width={"75%"} marginY="5%">
          <Thead>
            <Tr>
              <Th>Horário</Th>
              <Th>Segunda</Th>
              <Th>Terça</Th>
              <Th>Quarta</Th>
              <Th>Quinta</Th>
              <Th>Sexta</Th>
              <Th>Sábado</Th>
              <Th>Domingo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {row.map((rowIndex) => (
              <Tr key={rowIndex}>
                <Td>{rowIndex+8}h</Td>
                {column.map((col) => (
                    <Td>{col[rowIndex]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
  </>
  )
}