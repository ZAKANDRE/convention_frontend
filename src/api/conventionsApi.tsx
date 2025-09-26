
import { extractSocietyId } from '../utils/dataFormatters'

export const fetchDate = async (setMainLinks) => {
  const res = await fetch('https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/conventions');
  if (!res.ok) throw new Error('Erreur fetch convention');
  const data = await res.json();
  const rows = data.member
  const finishedConv = rows.filter(row => row.progress === 100);
  const notFinishedConv = rows.filter(row => row.progress < 100);
      setMainLinks([
        { id: 1, link: '#', label: 'Conventions de stage signés', value: 'stage', rows: finishedConv },
        { id: 2, link: '#', label: 'Conventions en traitement', value: 'traitement', rows: notFinishedConv },
      ]);
  return rows;
};

export const putMethod = async (link, st_id, cne_id,dir_id, form_id, d_st, d_end, soc_link, s_row, progress?:number,setMainLinks?:any ) => {
    try {const updateSocietyConvention = await fetch (`${link}`,{
          method: 'PUT',
          headers: {
              'Accept' : 'application/ld+json',
              'Content-Type' : 'application/ld+json; charset=UTF-8'
          },
          body: JSON.stringify({
              studentId: st_id,
              commanderId: cne_id,
              afpaDirectorId: dir_id,
              formationId: form_id,
              dateStart: d_st,
              dateEnd: d_end,
              users: s_row.users || [],
              society: `${soc_link}`,
              progress: progress
          })
        });
        if(!updateSocietyConvention.ok){
          throw new Error (`${updateSocietyConvention.status}`);
        }
        fetchDate(setMainLinks);
        } catch (error) {
        console.error('PUT method error:', error);
        throw error;
      }

};

export const postConvention = async (
  userInfo,
  inputDateStart,
  inputDateEnd,
  setMainLinks,
  handleCloseModal,
  setError
) => {
  if(inputDateEnd <= inputDateStart){
      alert("La date de fin est inférieure ou égale à la date de début du stage. Merci de la ressaisir !");
  }
  else {
      try {
        const conventionPost = await fetch('https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/conventions', {
          method: 'POST',
          headers: {
            'Accept': 'application/ld+json',
            'Content-Type': 'application/ld+json;charset=UTF-8'
          },
          body: JSON.stringify({
            studentId: userInfo.id,
            commanderId: 114,
            afpaDirectorId: 115,
            formationId: userInfo.formation.id,
            dateStart: inputDateStart,
            dateEnd: inputDateEnd,
            users: [],
            society: "/api/societies/303",
            progress: 0,
            tuteurId: 113,
            studentSignaturePath: "nothing",
            societySignaturePath: "nothing",
            commanderSignaturePath: "nothing",
            directorSignaturePath: "nothing"
          })
        });

        if (!conventionPost.ok) {
          throw new Error(`Erreur POST: ${conventionPost.status}`);
        }

        await fetchDate(setMainLinks);
        handleCloseModal();
      } catch (err) {
        setError(err.message);
      }
  }
};


export const deleteConvention = async(conventionId: number, setError, setMainLinks) => {
  try{
    const deleteConv = await fetch(`https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/conventions/${conventionId}`, {
      method: 'DELETE',
      headers: {
        'Accept' : 'application/ld+json'
      }
    });
    await fetchDate(setMainLinks);
    if(!deleteConv.ok){
      throw new Error(`HTTP error! Status: ${deleteConv.status}`);
    }
  } catch(err:any){
      setError(`HTTP error! Status: ${err.status}`);
  }
}
export const updateRing = (row, setMainLinks) => async (e, onSuccess) => {
  const value = Number(e.currentTarget.getAttribute('data-value')); 
  const socId = extractSocietyId(row);

  try {
    await putMethod(
      `antiquewhite-bee-570664.hostingersite.com/api/conventions/${row.id}`,
      row.studentId,
      row.commanderId,
      row.afpaDirectorId,
      row.formationId,
      row.dateStart,
      row.dateEnd, 
      `/api/societies/${socId}`, 
      row,
      value,
      setMainLinks
    );
    if (typeof onSuccess === 'function') {
      onSuccess();
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour du ring:", err);
  }
};


// 1. Измените сигнатуру функции
export const patchRing = async (id, progress_number, setMainLinks = null) => {
  try {
    const response = await fetch(`https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/conventions/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/ld+json',
        'Content-Type': 'application/merge-patch+json'
      },
      body: JSON.stringify({
        progress: progress_number
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur PATCH: ${response.status}`);
    }

    // 2. Вызывайте только если функция передана
    if (setMainLinks && typeof setMainLinks === 'function') {
      await fetchDate(setMainLinks);
    }
    
    console.log('PATCH successful for convention:', id);
    return true;
  } catch (err) {
    console.error('PATCH error:', err);
    return false;
  }
};

  