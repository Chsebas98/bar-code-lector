import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BarcodeReader from "../components/BarCodeReader";
import ExcelHandler from "../components/ExcelHandler";
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
			<BarcodeReader />
			<ExcelHandler />
		</Container>
	);
};

export default HomePage;
