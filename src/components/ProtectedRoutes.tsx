import { useEffect } from "react";
import { Outlet, useNavigate} from "react-router";
import React from "react";

const ProtectedRoutes: React.FC = () => {
    const token: string | null = localStorage.getItem("jwt_token");
    // On importe et utilise le type 'NavigateFunction' pour le hook.
    const navigate = useNavigate();

    useEffect(() => {
        // La fonction async est typée pour retourner une promesse vide : Promise<void>.
        const verifyToken = async (): Promise<void> => {
            if (token) {
                try {
                    // L'URL de votre endpoint de vérification doit être ajoutée ici.
                    const response: Response = await fetch("http://127.0.0.1:8000/api/users", {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    // Si la réponse n'est pas OK (ex: statut 401, 403), le token est invalide.
                    if (!response.ok) {
                        localStorage.removeItem("jwt_token");
                        navigate('/login', { replace: true });
                    }
                } catch (error) {
                    console.error("La vérification du token a échoué:", error);
                    localStorage.removeItem("jwt_token");
                    navigate('/login', { replace: true });
                }
            } else {
                // Si aucun token n'existe, on redirige directement.
                navigate('/login', { replace: true });
            }
        };

        verifyToken();
    }, [token, navigate]);

    // Si le token n'existe pas au premier rendu, on ne rend rien (null)
    // en attendant que le `useEffect` fasse la redirection.
    // S'il existe, on rend les routes enfants via <Outlet /> en attendant la vérification.
    return token ? <Outlet /> : null;
};

export default ProtectedRoutes;