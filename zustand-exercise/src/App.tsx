import "./App.css";
import { Toaster } from "react-hot-toast";
import { User } from "./Component/Users/User";

function App() {
	return (
		<>
			<Toaster />
			<User />
		</>
	);
}

export default App;
