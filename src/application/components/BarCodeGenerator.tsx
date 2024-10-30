import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";

interface ErrorInterface {
	hasError: boolean;
	message: string;
}

interface DataInterface {
	id: string;
	bloque: string;
	nave: string;
	lado: string;
	cama: string;
	date: string;
}

const BarcodeGenerator: React.FC = () => {
	const [bloqueValue, setBloqueValue] = useState("");
	const [naveValue, setNaveValue] = useState("");
	const [ladoValue, setLadoValue] = useState("");
	const [camaValue, setCamaValue] = useState("");
	const [dateValue, setDateValue] = useState("");
	const [bloqueValueError, setBloqueValueError] = useState<ErrorInterface>({
		hasError: false,
		message: "",
	});
	const [naveValueError, setNaveValueError] = useState<ErrorInterface>({
		hasError: false,
		message: "",
	});
	const [ladoValueError, setLadoValueError] = useState<ErrorInterface>({
		hasError: false,
		message: "",
	});
	const [camaValueError, setCamaValueError] = useState<ErrorInterface>({
		hasError: false,
		message: "",
	});

	const [barcodeValue, setBarcodeValue] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		type: string
	) => {
		const value = e.target.value;
		switch (type) {
			case "bloque":
				setBloqueValueError({ hasError: false, message: "" });
				setBloqueValue(value);
				break;
			case "nave":
				setNaveValueError({ hasError: false, message: "" });
				setNaveValue(value);
				break;
			case "lado":
				setLadoValueError({ hasError: false, message: "" });
				setLadoValue(value);
				break;
			case "cama":
				setCamaValueError({ hasError: false, message: "" });
				setCamaValue(value);
				break;
			case "date":
				setDateValue(value);
				break;
			default:
				break;
		}
	};

	const validateField = () => {
		let hasError = false;
		if (bloqueValue === "") {
			hasError = true;
			setBloqueValueError({ hasError: true, message: "El bloque es requerido" });
		}
		if (naveValue === "") {
			hasError = true;
			setNaveValueError({ hasError: true, message: "La nave es requerida" });
		}
		if (ladoValue === "") {
			hasError = true;
			setLadoValueError({ hasError: true, message: "El lado es requerido" });
		}
		if (camaValue === "") {
			hasError = true;
			setCamaValueError({ hasError: true, message: "La cama es requerida" });
		}
		return hasError;
	};

	const formatDate = (date: Date): string => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	useEffect(() => {
		const date = new Date();
		const newDate: string = formatDate(date);
		setDateValue(newDate);
	}, []);

	const saveData = () => {
		const register: DataInterface = {
			id: uuidv4(),
			bloque: bloqueValue,
			nave: naveValue,
			lado: ladoValue,
			cama: camaValue,
			date: dateValue.toString(),
		};
		try {
			const storedData = localStorage.getItem("registers");
			const registers: DataInterface[] = storedData ? JSON.parse(storedData) : [];
			registers.push(register);
			localStorage.setItem("registers", JSON.stringify(registers));
			Swal.fire({
				icon: "success",
				title: "Registro Guardado",
				text: `Se ha guardado correctamente el registro de: ${barcodeValue}`,
			});
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Registro NO Guardado",
				text: `No se pudo guardar el registro: ${barcodeValue}`,
			});
		}
	};

	const generateBarcode = () => {
		const hasError = validateField();
		if (!hasError) {
			setBarcodeValue(
				`${bloqueValue}-${naveValue}-${ladoValue}-${camaValue}-${dateValue}`
			);
			saveData();
			setBloqueValue("");
			setNaveValue("");
			setLadoValue("");
			setCamaValue("");
			setDateValue("");
		}
	};

	const downloadBarcode = () => {
		const element = document.getElementById("barcode");
		if (element) {
			html2canvas(element).then((canvas) => {
				const link = document.createElement("a");
				link.href = canvas.toDataURL("image/png");
				link.download = "codigo_de_barras.png";
				link.click();
			});
		}
	};

	return (
		<div>
			<Form.Group controlId="formBasicInput">
				<Form.Label>Bloque de cosecha</Form.Label>
				<Form.Control
					type="text"
					placeholder="Bloque de cosecha"
					autoComplete="off"
					value={bloqueValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "bloque")
					}
				/>
				{bloqueValueError.hasError && (
					<span className="text-danger">{bloqueValueError.message}</span>
				)}
				<br />
				<Form.Label>Nave</Form.Label>
				<Form.Control
					type="text"
					placeholder="Nave"
					autoComplete="off"
					value={naveValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "nave")
					}
				/>
				{naveValueError.hasError && (
					<span className="text-danger">{naveValueError.message}</span>
				)}
				<br />
				<Form.Label>Lado</Form.Label>
				<Form.Control
					type="text"
					placeholder="Lado"
					autoComplete="off"
					value={ladoValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "lado")
					}
				/>
				{ladoValueError.hasError && (
					<span className="text-danger">{ladoValueError.message}</span>
				)}
				<br />
				<Form.Label>Cama</Form.Label>
				<Form.Control
					type="text"
					placeholder="Cama"
					autoComplete="off"
					value={camaValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "cama")
					}
				/>
				{camaValueError.hasError && (
					<span className="text-danger">{camaValueError.message}</span>
				)}
				<br />
				<Form.Label>Fecha de cosecha</Form.Label>
				<Form.Control
					type="datetime-local"
					placeholder="Fecha de cosecha"
					autoComplete="off"
					value={dateValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "date")
					}
				/>
			</Form.Group>
			<div className="my-4 d-flex align-items-center justify-content-evenly">
				<Button variant="primary" onClick={generateBarcode}>
					Generar Código de Barras
				</Button>
				{barcodeValue && (
					<Button variant="secondary" onClick={downloadBarcode} className="ml-2">
						Descargar Código de Barras
					</Button>
				)}
			</div>
			<section className="text-center">
				<div id="barcode">{barcodeValue && <Barcode value={barcodeValue} />}</div>
			</section>
		</div>
	);
};

export default BarcodeGenerator;
