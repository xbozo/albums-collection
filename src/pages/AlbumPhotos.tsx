import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { api } from "../libs/axios";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Album } from "../@types/Album";
import { Photo } from "../@types/Photo";

export function AlbumPhotos() {
    const { albumId } = useParams();

    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function fetchAlbum() {
        // buscar o álbum pra obter seu título
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
        <div className="w-full h-full mt-6">
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-center text-zinc-800">
                    Detalhes do Álbum
                </h1>

                {isLoading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-4xl self-center text-sky-600 mt-4" />
                )}

                {!isLoading && (
                    <>
                        <h2 className="text-xl font-bold text-zinc-800 mt-4">
                            Título: {album?.title}
                        </h2>

                        <h3 className="text-xl font-bold text-zinc-800">
                            Possui: {photos.length} fotos
                        </h3>
                        <ul className="flex flex-col gap-5">
                            {photos.map((photo) => (
                                <li key={photo.id} className="flex-1">
                                    <p className="text-lg">{photo.title}</p>
                                    <img
                                        src={photo.thumbnailUrl}
                                        alt={photo.title}
                                    />
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/"
                            className="p-3 bg-red-500 text-center text-white font-extrabold rounded m-2 hover:bg-red-600"
                        >
                            <button>Voltar para a lista de álbuns</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
