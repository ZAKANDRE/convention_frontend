import { Button } from 'react-bootstrap';
import { handleGenerateLinkClick } from '../../api/handleGenerateLinkClick.tsx'; 
import { ViewSocietyIcon, LinkIcon } from '../SvgIcons/SvgIcons.tsx'

export const ActionsButtons = ({row, handleShow,handleShowSociety,userInfo }) => {
      return (
        <>
           <Button     
                  variant="info"
                  onClick={() => {
                    handleShow(row.id); 
                    handleShowSociety();
                  }}
                  className='me-3' 
            >
                  <ViewSocietyIcon />
            </Button> 
        
            <Button
              variant="success"
              onClick={() => {
                const newTab = window.open('', '_blank');
                if (newTab) {
                  newTab.document.write('<p style="font-family:sans-serif;text-align:center;margin-top:50px;">Chargement du lien...</p>');
                }
                handleGenerateLinkClick(row.id, newTab);
              }}
              disabled={userInfo?.roles?.[0] !== "ROLE_STUDENT" || row.progress > 25 }
            >
              <LinkIcon />  
            </Button>
        </>            
      );
}