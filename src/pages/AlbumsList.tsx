import { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { api } from "../libs/axios";

import { Album } from "../@types/Album";
import { AlbumsListItem } from "../components/AlbumsListItem";

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

        // delay intencional para visualizar o loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="w-full h-full mt-6">
            <div className="max-w-5xl mx-auto flex flex-col gap-3">
                <h1 className="text-2xl font-bold text-center text-zinc-800">
                    Lista de Álbuns
                </h1>

                {isLoading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-4xl self-center text-sky-600 mt-4" />
                )}

                {!isLoading && (
                    <ul className="flex flex-wrap gap-3 flex-1">
                        {albums.map((album) => (
                            <AlbumsListItem key={album.id} album={album} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
