import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import App from "./components/App";
import Modal from "./components/Modal";
import UserInstructions from "./components/UserInstructions";

function Main() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<App />} />
            <Route path="instructions" element={<Modal>
                <UserInstructions />
            </Modal>} />
        </Routes>
    </BrowserRouter>
}

export default Main;