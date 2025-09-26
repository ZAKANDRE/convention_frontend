
import { useState } from 'react';

import { ActionsButtons } from '../ActionsButtons/ActionsButtons'
import { ActionIcon, RingProgress, Text, Center } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { handleGenerateLinkClick1 } from '../../api/handleGenerateLinkClick.tsx'; 
import { SignatureCanvas } from '../SignatureCanvas/SignatureCanvas.tsx';
import { Button } from 'react-bootstrap';
import { PdfIcon, ExploreIcon } from '../SvgIcons/SvgIcons.tsx';

import {
  getFormationName,
  getUserFirstName,
  getUserLastName
} from '../../utils/dataFormatters';

import './css/media/320tablerow.css';


  export const TableRow = ({row, users, getFormation, handleShow, handleShowSociety, setMainLinks, userInfo}) => { 
    const [open, setOpen] = useState(false);
      return (
        <>
          <tr key={row.id}>
            <td> {getUserFirstName(row.studentId, users)}          </td>
            <td> {getUserLastName(row.studentId, users)}           </td>
            <td> {getFormationName(row.formationId, getFormation)} </td> 
            <td>
                 <ActionsButtons 
                  row={row}
                  handleShow={handleShow}
                  handleShowSociety={handleShowSociety}
                  userInfo={userInfo}
                  />
            </td>
            <td> {new Date(row.dateStart).toLocaleDateString()} </td>
            <td> {new Date(row.dateEnd).toLocaleDateString()}   </td>
            <td  className='new'>
                  {row.progress !== 100 && (
                      <RingProgress
                          className='ring'
                          sections={[{ value: row.progress, color: 'blue' }]}
                          transitionDuration={1000}
                          size={90}
                          thickness={7}
                          label={
                            <Text c="blue" fw={700} ta="center" size="l">
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
                        size={90}
                        thickness={7}
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
                    <Button  onClick={()=> handleGenerateLinkClick1(row.id)} >
                      <PdfIcon/>
                    </Button>
                   </>
                }
              </td>
                     
              <td  className='explore-btn'>
                    <Button
                      variant='success'
                      onClick={() => setOpen(!open)}
                      aria-controls="example-collapse-text"
                      aria-expanded={open}
                      disabled={row.progress === 100}
                    >
                      <ExploreIcon />
                    </Button>
                      
              </td>
                    
          </tr> 
          {/* tr for signature canvas */}          
          <tr className='sign-row'>
              <td colSpan={9}>
                <SignatureCanvas convId1={row.id} open1={open} userRole={userInfo.roles[0]} row={row} setMainLinks={setMainLinks} setOpen={setOpen}/>
              </td>
          </tr>
        </>
      );
}