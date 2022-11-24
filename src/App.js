import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import PersistLogin from "./features/auth/PersistLogin";
import Chat from "./pages/Chat/Chat";
import useAuth from "./hooks/useAuth";
import Public from "./componernts/Public/Public";
function App() {
    const { user } = useAuth();
    console.log(user);
    return (
        <div className="App">
            <div className="blur" style={{ top: "-18%", right: "0" }}></div>
            <div className="blur" style={{ top: "36%", left: "-8%" }}></div>
            <Routes>
                <Route path="/" element={<Public />} />
                <Route path="/login" element={<Auth />} />
                <Route element={<PersistLogin />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile/:userId" element={<Profile />} />
                    <Route path="/chat" element={<Chat />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
