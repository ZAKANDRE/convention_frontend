import {Button} from 'react-bootstrap';

export const ProgressCheckButton = ({digitValue, updateProgress, btn_txt}) => {

  return (
          <Button 
            data-value={digitValue} 
            onClick={ (e) => updateProgress(e)}
            >
              {btn_txt}
            </Button>
  );
};         
