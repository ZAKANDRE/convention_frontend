import { putMethod, fetchDate } from './conventionsApi';

export const postSociety = async (
  addSocietyName,
  addSocietyAdresse,
  addSocietyNumber,
  selectedRow,
  conventionId,
  setMainLinks
) => {
  try {
    const societyPost = await fetch('http://127.0.0.1:8000/api/societies', {
      method: 'POST',
      headers: {
        'Accept': 'application/ld+json',
        'Content-Type': 'application/ld+json; charset=UTF-8'
      },
      body: JSON.stringify({
        name: addSocietyName,
        adresse: addSocietyAdresse,
        siren: parseInt(addSocietyNumber)
      })
    });

    if (!societyPost.ok) {
      const errorText = await societyPost.text();
      console.error('Server error response:', errorText);
      throw new Error(`Erreur POST society: ${societyPost.status} - ${errorText}`);
    }

    const data = await societyPost.json();
    const createdSocietyId = data.id;

    await putMethod(
      `http://127.0.0.1:8000/api/conventions/${conventionId}`,
      selectedRow.studentId,
      selectedRow.commanderId,
      selectedRow.afpaDirectorId,
      selectedRow.formationId,
      selectedRow.dateStart,
      selectedRow.dateEnd,
      `/api/societies/${createdSocietyId}`,
      selectedRow,
      selectedRow.progress
    );
        fetchDate(setMainLinks);

    return createdSocietyId;
  } catch (err) {
    throw new Error(err.message);
  }
};
