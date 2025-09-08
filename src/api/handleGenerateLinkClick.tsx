export const handleGenerateLinkClick = async (rowId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/generate-token/${rowId}`);
    if (!response.ok) throw new Error('Ошибка генерации ссылки');

    const data = await response.json();
    const token = data.token;
    await navigator.clipboard.writeText(`http://localhost:8000/public-society/new/${token}`);
    alert('Le lien a été copié avec succèss dans votre clipboard , utilisez ctrl + v pour l\'employyer !');
  } catch (error) {
    console.error(error);
    alert('Не удалось сгенерировать ссылку');
  }
};
export const handleGenerateLinkClick1 = async (rowId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/generate-token/${rowId}`);
    if (!response.ok) throw new Error('Ошибка генерации ссылки');

    const data = await response.json();
    const token = data.token;
    window.open(`http://localhost:8000/pdf/convention/public/${token}`);
  } catch (error) {
    console.error(error);
    alert('Pas reussi aller vers le lien!');
  }
};

