import { Route, Routes } from "react-router-dom";
import Market from './Components/Market';
// import MarketCreateCard from "./Components/MarketCreateCard";
import MarketCreateCard from "./Components/MarketCreateCard";
import Shopping from "./Components/ShoppingCard";
import About from './Components/About';
import MyCard from "./Components/MyCards";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Settings from "./Components/Settings";
import Profile from "./Components/profile";
import EditCard from "./Components/EditCard";

import React,{useState} from "react";

export default function Router() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here and set isLoggedIn to true
    setIsLoggedIn(true);
  };

    return (
        <Routes>
            <Route path="/" element={<About />} />
            <Route path="/market" element={<Market />} />
            <Route path="/marketCreateCard" element={<MarketCreateCard />} />
            <Route  path="/editCard/:cardId" element={<EditCard />} />
            <Route path="/mycards" element={<MyCard />} />
            <Route path="/shoppingCard" element={<Shopping/>}/>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
    )
}