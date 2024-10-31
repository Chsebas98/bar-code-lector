import React, { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import { DataInterface, ErrorInterface } from "../../interfaces/interfaces";

const BarcodeGenerator: React.FC = () => {
	const [variedadValue, setVariedad] = useState("");
	const [bloqueValue, setBloqueValue] = useState("");
	const [ladoValue, setLadoValue] = useState("");
	const [naveValue, setNaveValue] = useState("");
	const [camaValue, setCamaValue] = useState("");
	const [dateValue, setDateValue] = useState("");
	const [bloqueValueError, setBloqueValueError] = useState<ErrorInterface>({
		hasError: false,
		message: "",
	});
	const [variedadError, setVariedadError] = useState<ErrorInterface>({
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
			case "variedad":
				setVariedadError({ hasError: false, message: "" });
				setVariedad(value);
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
		if (variedadValue === "") {
			hasError = true;
			setVariedadError({ hasError: true, message: "La variedad es requerida" });
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

	const saveData = (barcodeValue: string) => {
		const register: DataInterface = {
			id: uuidv4(),
			variedad: variedadValue,
			bloque: bloqueValue,
			lado: ladoValue,
			nave: naveValue,
			cama: camaValue,
			date: dateValue,
			barCode: barcodeValue,
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
			//clearFields();
		} catch (error) {
			console.log(error);
			Swal.fire({
				icon: "error",
				title: "Registro NO Guardado",
				text: `No se pudo guardar el registro: ${barcodeValue}`,
			});
		}
	};

	const clearFields = () => {
		setBloqueValue("");
		setVariedad("");
		setNaveValue("");
		setLadoValue("");
		setCamaValue("");
		const date = new Date();
		const newDate: string = formatDate(date);
		setDateValue(newDate);
		setBarcodeValue("");
	};

	const generateBarcode = () => {
		const hasError = validateField();
		if (!hasError) {
			const newBarcodeValue = `${variedadValue}-${bloqueValue}-${ladoValue}-${naveValue}-${camaValue}-${dateValue}`;
			setBarcodeValue(newBarcodeValue);
		}
	};

	useEffect(() => {
		if (barcodeValue) {
			saveData(barcodeValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [barcodeValue]);

	const downloadBarcode = () => {
		const element = document.getElementById("barcode");
		if (element) {
			html2canvas(element).then((canvas) => {
				const link = document.createElement("a");
				link.href = canvas.toDataURL("image/png");
				link.download = `codigo_de_barras_${barcodeValue}.png`;
				link.click();
			});
		}
	};

	return (
		<div>
			<div className="d-flex justify-content-end">
				<Button variant="success" onClick={clearFields}>
					Nuevo Registro
				</Button>
			</div>
			<Form.Group controlId="formBasicInput">
				<Form.Label>Variedad</Form.Label>
				<Form.Control
					type="text"
					placeholder="Ingrese la variedad"
					autoComplete="off"
					value={variedadValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "variedad")
					}
				/>
				{variedadError.hasError && (
					<div className="text-end">
						<span className="text-danger">{variedadError.message}</span>
					</div>
				)}
				<br />
				<Form.Label>Bloque de cosecha</Form.Label>
				<Form.Control
					type="text"
					placeholder="Ingrese el bloque de cosecha"
					autoComplete="off"
					value={bloqueValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "bloque")
					}
				/>
				{bloqueValueError.hasError && (
					<div className="text-end">
						<span className="text-danger">{bloqueValueError.message}</span>
					</div>
				)}
				<br />
				<Form.Label>Lado</Form.Label>
				<Form.Control
					type="text"
					placeholder="Ingrese el lado"
					autoComplete="off"
					value={ladoValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "lado")
					}
				/>
				{ladoValueError.hasError && (
					<div className="text-end">
						<span className="text-danger">{ladoValueError.message}</span>
					</div>
				)}
				<br />
				<Form.Label>Nave</Form.Label>
				<Form.Control
					type="text"
					color="info"
					placeholder="Ingrese la nave"
					autoComplete="off"
					value={naveValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "nave")
					}
				/>
				{naveValueError.hasError && (
					<div className="text-end">
						<span className="text-danger">{naveValueError.message}</span>
					</div>
				)}
				<br />
				<Form.Label>Cama</Form.Label>
				<Form.Control
					type="text"
					placeholder="Ingrese la cama"
					autoComplete="off"
					value={camaValue}
					onChange={(e) =>
						handleChange(e as React.ChangeEvent<HTMLInputElement>, "cama")
					}
				/>
				{camaValueError.hasError && (
					<div className="text-end">
						<span className="text-danger">{camaValueError.message}</span>
					</div>
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
			<div className="my-4 d-flex flex-column flex-sm-row align-items-center justify-content-evenly">
				<Button variant="primary" onClick={generateBarcode}>
					Generar Código de Barras
				</Button>
				{barcodeValue && (
					<Button variant="secondary" onClick={downloadBarcode} className="my-2">
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
