
import { useState } from 'react';

import { ActionsButtons } from '../ActionsButtons/ActionsButtons'
import { ActionIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { handleGenerateLinkClick1 } from '../../api/handleGenerateLinkClick.tsx'; // путь адаптируй под свою структуру
import { SignatureCanvas } from '../SignatureCanvas/SignatureCanvas.tsx';
import { Button } from 'react-bootstrap';

import './css/media/320tablerow.css';
import {
  getFormationName,
  getUserFirstName,
  getUserLastName
} from '../../utils/dataFormatters';

   export const TableRow = ({row, users, getFormation, handleShow, handleShowSociety, handleShowAddSociety, setMainLinks, userInfo}) => { 
  const [open, setOpen] = useState(false);

      return (
                      <>

    <tr key={row.id} >
                  <td> 
                      {getUserFirstName(row.studentId, users)} 
                  </td>
                  
                  <td> 
                      {getUserLastName(row.studentId, users)} 
                  </td>
                  {/*<td>
                      {getUserLastName(row.afpaDirectorId, users)}  <br/> {getUserFirstName(row.afpaDirectorId,users)} 
                  </td>*/}
                  <td>
                      {getFormationName(row.formationId, getFormation)} 
                  </td> 
                  <td>
                    <ActionsButtons 
                                row={row}
                                handleShow={handleShow}
                                handleShowSociety={handleShowSociety}
                                handleShowAddSociety={handleShowAddSociety}
                                userInfo={userInfo}

                    />
                  </td>
                  <td>
                      {new Date(row.dateStart).toLocaleDateString()}
                  </td>
                  <td>
                      {new Date(row.dateEnd).toLocaleDateString()}
                  </td>
                  <td className='new'>
                
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
                      <>
                          <button 
                           onClick={()=> handleGenerateLinkClick1(row.id)}
                           className="btn btn-primary"
                            >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
                      </svg>
                   </button>
          </>
                    }
                  </td>
                  <td>
                    
                    <Button
                          variant='success'
                          onClick={() => setOpen(!open)}
                          aria-controls="example-collapse-text"
                          aria-expanded={open}
                          disabled={row.progress === 100}
                      >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                    </Button>
                    
                  </td>
                   
                </tr>            
                  <tr>
                    <td colSpan={9}>
                     <SignatureCanvas convId1={row.id} open1={open} userRole={userInfo.roles[0]} row={row} setMainLinks={setMainLinks} setOpen={setOpen}/>
                     </td>
                  </tr>
</>

                );
}