  let spinenrLoading = 
  <div className="spinner-border text-success" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>

export const getFormationName = (formationId : number,  users: {[key: string]: any}) =>{
  const formation = users[formationId];
  if(formation){
    return `${formation.name}`
  }
  return spinenrLoading;
};

export const getUserFirstName = (userId: number,  users: {[key: string]: any}) => {
  const userFName = users[userId];

  if (userFName ) {
    return `${userFName.first_name}`;
  }
  return spinenrLoading; 
};

export const getUserLastName = (userId: number,  users: {[key: string]: any}) => {
  const userLName = users[userId];
  if (userLName ) {
    return `${userLName.last_name}`;
  }
  return spinenrLoading; 
};

export const extractSocietyId = (row) => {
  if (!row || !row.society || !row.society["@id"]) return null;
  return row.society["@id"].replace('/api/societies/', '');
};
