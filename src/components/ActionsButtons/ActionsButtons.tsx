import { Button } from 'react-bootstrap';

export const ActionsButtons = ({row, handleShow,handleShowSociety,handleShowAddSociety,userInfo }) => {
    const handleGenerateLinkClick = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/generate-token/${row.id}`);
      if (!response.ok) throw new Error('Ошибка генерации ссылки');
  
      const data = await response.json();
      const token = data.token;
  
      window.open(`http://localhost:8000/public-society/new/${token}`, '_blank');
    } catch (error) {
      console.error(error);
      alert('Не удалось сгенерировать ссылку');
    }
  };
     return (
        <>
         {          <Button     variant="info"
                                onClick={() => {
                                handleShow(row.id); 
                                handleShowSociety();
                                console.log(row.id);
                                }}
                                className='me-3' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>
                      </Button> }
                      <Button variant="success" 
                              onClick={()=> {    handleGenerateLinkClick() }}
                              // onClick={()=> {   handleShow(row.id); handleShowAddSociety(row); }}
                              // disabled={userInfo.roles[0] !== "ROLE_SOCIETY"}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" className="bi bi-link" viewBox="0 0 16 16">
                          <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                          <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/>
                        </svg>
                    </Button> 
        </>            
     );
}