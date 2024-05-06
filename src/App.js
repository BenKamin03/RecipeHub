import "./App.css";
import Header from "./components/Header";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import Submit from "./pages/submit/Submit";

function App() {
	return (
		<div className="font-sans h-screen">
			<Header />
			{/* <Home /> */}
			{/* <Profile /> */}
			<Submit />
		</div>
	);
}

export default App;
