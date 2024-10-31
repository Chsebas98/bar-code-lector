import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BarcodeGenerator from "../components/BarCodeGenerator";

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const redirectToPreviousRegister = () => {
		navigate("/registers");
	};
	return (
		<Container>
			<div className="mt-4 d-flex justify-content-between align-items-center">
				<h1>Aplicación de Códigos de Barras</h1>
				<Button variant="info" onClick={redirectToPreviousRegister}>
					Registros Previos
				</Button>
			</div>
			<BarcodeGenerator />
		</Container>
	);
};

export default HomePage;
