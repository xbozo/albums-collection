import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { api } from "../libs/axios";

import { Album } from "../@types/Album";

interface Photo {
    albumId: number;
    id: number;
    title: string;
    thumbnailUrl: string;
}

export function AlbumPhotos() {
    const { albumId } = useParams();

    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function fetchAlbum() {
        // para setar o título do álbum
        api.get(`/albums/${albumId}`)
            .then((response) => {
                setAlbum(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar detalhes do álbum:", error);
            });
    }

    function fetchAlbumPhotos() {
        api.get(`/photos?albumId=${albumId}`)
            .then((response) => {
                setPhotos(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar fotos do álbum:", error);
            });
    }

    useEffect(() => {
        fetchAlbum();
        fetchAlbumPhotos();

        // delay intencional pra visualizar o loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    console.log(album);

    return (
        <div>
            {isLoading && <h1>Carregando...</h1>}

            {!isLoading && (
                <>
                    <h1>Detalhes do Álbum</h1>
                    <h2>Título: {album?.title}</h2>

                    <h3>Fotos</h3>
                    <ul>
                        {photos.map((photo) => (
                            <li key={photo.id}>
                                <img
                                    src={photo.thumbnailUrl}
                                    alt={photo.title}
                                />
                                <p>{photo.title}</p>
                            </li>
                        ))}
                    </ul>

                    <Link to="/">Voltar para a lista de álbuns</Link>
                </>
            )}
        </div>
    );
}
