import { Spinner } from '../components/Spinner/Spinner.tsx'


export const getFormationName = (formationId : number,  users: {[key: string]: any}) =>{
  const formation = users[formationId];
  if(formation){
    return `${formation.name}`
  }
  return <Spinner/>;
};

export const getUserFirstName = (userId: number,  users: {[key: string]: any}) => {
  const userFName = users[userId];

  if (userFName ) {
    return `${userFName.first_name}`;
  }
  return <Spinner/>; 
};

export const getUserLastName = (userId: number,  users: {[key: string]: any}) => {
  const userLName = users[userId];
  if (userLName ) {
    return `${userLName.last_name}`;
  }
  return <Spinner/>; 
};

export const extractSocietyId = (row) => {
  if (!row || !row.society || !row.society["@id"]) return null;
  return row.society["@id"].replace('/api/societies/', '');
};

export const sortUp = (setMainLinks, activeTab, activeTabId) => {
    if (!activeTab) return;
    
    setMainLinks(prevMainLinks => prevMainLinks.map(tab => {
      if (tab.id === activeTabId) {
        return {
          ...tab,
          rows: [...tab.rows].sort((a, b) => new Date(a.dateStart).getTime()  - new Date(b.dateStart).getTime() )
        };
      }
      return tab;
    }));
};

export const sortDown = (setMainLinks, activeTab, activeTabId) => {
    if (!activeTab) return;
    
    setMainLinks(prevMainLinks => prevMainLinks.map(tab => {
      if (tab.id === activeTabId) {
        return {
          ...tab,
          rows: [...tab.rows].sort((a, b) => new Date(b.dateStart).getTime()  - new Date(a.dateStart).getTime() )
        };
      }
      return tab;
    }));
  };