import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./application/pages/HomePage";
import PreviousRegisters from "./application/pages/PreviousRegistersPage";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/registers" element={<PreviousRegisters />} />
			</Routes>
		</Router>
	);
};

export default App;
