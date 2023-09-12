import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlbumDetails } from "./pages/AlbumDetails";
import { AlbumsList } from "./pages/AlbumsList";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AlbumsList />} />
                <Route path="/album/:albumId" element={<AlbumDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
