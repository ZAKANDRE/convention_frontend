import {Button} from 'react-bootstrap';

export const ProgressCheckButton = ({row, digitValue, updateProgress, btn_txt, userInfo, disabled, setShowAlert}) => {
  return (
       <>
          {userInfo.roles[0] ==="ROLE_STUDENT" && digitValue === 25 && (
           <Button 
              variant='dark'
              disabled={row.progress >= 25 ? true : false}
              data-value={digitValue} 
              onClick={ (e) => {
                updateProgress(e);
                setShowAlert(true)
              }}
            >
              {btn_txt}
            </Button>
            )
          }

          {userInfo.roles[0] ==="ROLE_SOCIETY" && digitValue === 50 && (
            <Button 
                variant='dark'
                data-value={digitValue} 
                onClick={ (e) => {
                updateProgress(e);
                setShowAlert(true)
              }}
            >
              {btn_txt}
            </Button>
              )
          }

          {userInfo.roles[0] ==="ROLE_COMMANDER" && digitValue === 75 && (
            <Button 
                variant='dark'
                disabled={disabled}
                data-value={digitValue} 
                onClick={ (e) => {
                  updateProgress(e);
                  setShowAlert(true)
                }}
              >
              {btn_txt}
            </Button>
            )
          }

          {userInfo.roles[0] ==="ROLE_DIRECTOR" && digitValue === 100 && (
            <Button 
                variant='dark'
                disabled={disabled}
                data-value={digitValue} 
                onClick={ (e) => {
                  updateProgress(e);
                  setShowAlert(true)
              }}
            >
              {btn_txt}
            </Button>
            )
          }
        </>
  );
};         
