import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Submit from "./pages/submit/Submit";
import Browse from "./pages/browse/Browse";
import Chefs from "./pages/chefs/Chefs";
import Recipe from "./pages/recipe/Recipe";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Saved from "./pages/saved/Saved";
import Cuisines from "./pages/cuisines/Cuisines";
import Footer from "./components/Footer";
import Login from "./pages/login/Login";
import { useState } from "react";
import Session from "./middleware/Session";
import Following from "./pages/following/Following";
import Register from "./pages/register/Register";
import EditProfile from "./pages/edit/EditProfile";
import Settings from "./pages/settings/Settings";


function App() {

	const [isLoggedIn, setIsLoggedIn] = useState(Session.isLoggedIn);

	const updateSession = (session) => {
		setIsLoggedIn(session)
	}

	Session.addSessionListener(updateSession)

	return (
		<div className="font-sans h-screen">
			<Header isLoggedIn={isLoggedIn} />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/submit" element={<Submit />} />
					<Route path="/browse" element={<Browse />} />
					<Route path="/chefs" element={<Chefs />} />
					<Route path="/recipe" element={<Recipe />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/cuisines" element={<Cuisines />} />
					<Route path="/login" element={<Login />} />
					<Route path="/following" element={<Following />} />
					<Route path="/register" element={<Register />} />
					<Route path="/edit-profile" element={<EditProfile />} />
					<Route path="/settings" element={<Settings />} />
					{/* Redirect to home page for unmatched routes */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
			<Footer />
		</div>
	);
}

export default App;
