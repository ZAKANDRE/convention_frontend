import {
  getFormationName,
  getUserFirstName,
  getUserLastName
} from '../../utils/dataFormatters';
import { ActionsButtons } from '../ActionsButtons/ActionsButtons'
import { ProgressCheckButton } from '../ProgressCheckButton/ProgressCheckButton';
import { ActionIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

import {
  deleteConvention,
  updateRing
} from '../../api/conventionsApi';

   export const TableRow = ({row, users, getFormation, handleShow, handleShowSociety, handleShowAddSociety, setMainLinks, ringValues, setError}) => { 
    return (
    <tr key={row.id} >
                  <td> 
                      {getUserLastName(row.studentId, users)}<br/>{getUserFirstName(row.studentId, users)} 
                  </td>
                  <td> 
                      {getUserLastName(row.commanderId, users)} <br/> {getUserFirstName(row.commanderId, users)} 
                  </td>
                  <td>
                      {getUserLastName(row.afpaDirectorId, users)}  <br/> {getUserFirstName(row.afpaDirectorId,users)} 
                  </td>
                  <td>
                      {getFormationName(row.formationId, getFormation)} 
                  </td>
                  <td>
                    <ActionsButtons 
                                row={row}
                                handleShow={handleShow}
                                handleShowSociety={handleShowSociety}
                                handleShowAddSociety={handleShowAddSociety}
                    />
                  </td>
                  <td>
                      {new Date(row.dateStart).toLocaleDateString()}
                  </td>
                  <td>
                      {new Date(row.dateEnd).toLocaleDateString()}
                  </td>
                  <td>
                     {ringValues.map(val => (
                        <ProgressCheckButton  
                              key={val.id}
                              digitValue={val.value} 
                              updateProgress={updateRing(row, setMainLinks)} 
                              btn_txt={val.value}
                        /> 
                      ))}
                  </td>
                  <td>
                    {row.progress !== 100 && (
                      <RingProgress
                          className='ring'
                          sections={[{ value: row.progress, color: 'blue' }]}
                          transitionDuration={1000}
                          label={
                            <Text c="blue" fw={700} ta="center" size="xl">
                              {row.progress}%
                            </Text>
                          }
                        />
                      )}

                    {row.progress === 100 && (
                      <RingProgress
                        className='ring'
                        sections={[{ value: 100, color: 'teal' }]}
                          transitionDuration={1000}

                        label={
                          <Center>
                            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
                              <IconCheck size={22} />
                            </ActionIcon>
                          </Center>
                        }
                      /> 
                      )} 
                  </td>
                  <td>
                    {
                        <button type="button" className="btn btn-danger offset-11 mb-3 text-uppercase delete-btn" 
                            onClick={()=> {
                              deleteConvention(row.id,setError, setMainLinks)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-folder-minus" viewBox="0 0 16 16">
                                  <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"/>
                                  <path d="M11 11.5a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5"/>
                                </svg>
                        </button>
                    }
                  </td>
                </tr>
                );
}