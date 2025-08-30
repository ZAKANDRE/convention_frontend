
export const fetchAllUsers = async(link,setUser) => {
        const res1 = await fetch(`${link}`);
        if (!res1.ok) throw new Error('Erreur téléchargement users');
        const data1 = await res1.json();
        const rows1 = data1.member;

        const usersData = rows1.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
      setUser(usersData);
} 

export const fetchAllFormation = async (link, setGetFormation) => {
     const formation  = await fetch(`${link}`);
      if(!formation.ok) throw new Error('Erreur fetch formation');
      const dataFormation = await formation.json();
      const infoFormation = dataFormation.member;
      const formationDataObj = infoFormation.reduce((formationArray, item) => {
          formationArray[item.id] = item;
          return formationArray;
      },{});

      setGetFormation(formationDataObj);
}

export const fetchAllSocieties = async (link,setGetSociety) => {
    const society1 = await fetch(`${link}`);

    if(!society1.ok) throw new Error ('Erreur fetch society');

    const dataSociety = await society1.json();
    const check = dataSociety.member;

      const societyDataObj = check.reduce((formationArray, item) => {
          formationArray[item.id] = item;
          return formationArray;
      },{});

      setGetSociety(societyDataObj);

      
}