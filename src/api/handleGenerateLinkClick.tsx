export const handleGenerateLinkClick = async (rowId, newTab) => {
  const fullLinkBase = `https://antiquewhite-bee-570664.hostingersite.com/symfony/public/public-society/new/`;

  try {
    const response = await fetch(`https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/generate-token/${rowId}`);
    if (!response.ok) throw new Error('Erreur lors de la génération');

    const data = await response.json();
    const token = data.token;
    const fullUrl = `${fullLinkBase}${token}`;

    // Попробуем скопировать в буфер
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert('✅ Le lien a été copié dans le presse-papier.');
        return;
      } catch (err) {
        console.warn('Clipboard API a échoué:', err);
      }
    }

    // Альтернатива — textarea
    const textArea = document.createElement("textarea");
    textArea.value = fullUrl;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (success) {
      alert('✅ Le lien a été copié avec la méthode alternative.');
    } else if (newTab) {
      newTab.location.href = fullUrl;
    } else {
      alert('❌ Le navigateur a bloqué l\'ouverture du lien.\nVoici le lien :\n' + fullUrl);
    }
  } catch (error) {
    console.error(error);
    if (newTab) newTab.close();
    alert('❌ Une erreur est survenue lors de la génération du lien.');
  }
};


export const handleGenerateLinkClick1 = async (rowId) => {
  try {
    // Открываем временную вкладку заранее
    const newTab = window.open('', '_blank');

    const response = await fetch(`https://antiquewhite-bee-570664.hostingersite.com/symfony/public/api/generate-token/${rowId}`);
    if (!response.ok) throw new Error('Ошибка генерации ссылки');

    const data = await response.json();
    const token = data.token;

    const finalUrl = `https://antiquewhite-bee-570664.hostingersite.com/symfony/public/pdf/convention/public/${token}`;

    // Загружаем URL в ранее открытую вкладку
    if (newTab) {
      newTab.location.href = finalUrl;
    } else {
      // если окно было заблокировано
      alert('❌ Votre navigateur a bloqué l\'ouverture du lien. Veuillez autoriser les popups.');
    }

  } catch (error) {
    console.error(error);
    alert('❌ Pas réussi à aller vers le lien !');
  }
};

