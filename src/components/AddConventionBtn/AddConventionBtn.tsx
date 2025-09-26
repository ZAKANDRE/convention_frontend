import { AddFolderIcon } from '../SvgIcons/SvgIcons.tsx'

import './AddConventionBtn.css';
import './media/320convbtn.css'
import './media/576convbtn.css'
import './media/992convbtn.css'
import './media/1200convbtn.css'

export const AddConventionBtn = ({handleShowModal,userInfo}) => {
    
    return (
                <div className='d-flex justify-content-end action-group-btn' id="AddConventionBtn">
                  <button className="btn btn-success offset-11  text-uppercase "
                    onClick={()=> {handleShowModal()}}
                    disabled={userInfo?.roles?.[0] !==  "ROLE_STUDENT" }
                    id="add-btn"
                  >
                    <AddFolderIcon />
                    <strong className="new-conv-text"> Créer une convention</strong>
                  </button>
                  </div>  
    );
}
  
  