import { Link } from "react-router-dom";
import { Album } from "../@types/Album";

import { BiSolidPhotoAlbum } from "react-icons/bi";

type Props = {
    album: Album;
};

export function AlbumsListItem({ album }: Props) {
    return (
        <Link
            to={`/album/${album.id}`}
            className="
                bg-zinc-700 text-gray-200 w-40 h-40 rounded p-2 border-2 border-zinc-950
                hover:bg-zinc-800
            "
        >
            <li key={album.id} className="flex flex-col gap-2">
                <BiSolidPhotoAlbum className="self-center w-6 h-6" />
                <span className="text-lg">{album.title}</span>
            </li>
        </Link>
    );
}
