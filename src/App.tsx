import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumPhotos } from "./pages/AlbumPhotos";
import { AlbumsList } from "./pages/AlbumsList";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AlbumsList />} />
                <Route path="/album/:albumId" element={<AlbumPhotos />} />
            </Routes>
        </BrowserRouter>
    );
}
