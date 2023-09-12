import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Album } from "../@types/Album";
import { api } from "../libs/axios";

export function AlbumsList() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function fetchAlbums() {
        api.get<Album[]>("/albums")
            .then((response) => {
                setAlbums(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar álbuns:", error);
            });
    }

    useEffect(() => {
        fetchAlbums();

        // delay intencional pra visualizar o loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div>
            <h1>Lista de Álbuns</h1>
            {isLoading && <h2>Carregando...</h2>}
            <ul>
                {!isLoading && (
                    <>
                        {albums.map((album) => (
                            <li key={album.id}>
                                {/* Crie um link para os detalhes do álbum com o ID do álbum na URL */}
                                <Link to={`/album/${album.id}`}>
                                    {album.title}
                                </Link>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
}
