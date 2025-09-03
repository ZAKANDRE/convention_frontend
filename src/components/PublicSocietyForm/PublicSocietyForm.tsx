import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PublicSocietyForm() {
  const { token } = useParams();
  const [society, setSociety] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/public-access/${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Ссылка недействительна или устарела");
        return res.json();
      })
      .then(setSociety)
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) return <div>Ошибка: {error}</div>;
  if (!society) return <div>Загрузка...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Данные компании:</h2>
      <p><strong>Nom:</strong> {society.name}</p>
      <p><strong>Adresse:</strong> {society.adresse}</p>
      <p><strong>SIREN:</strong> {society.siren}</p>
    </div>
  );
}