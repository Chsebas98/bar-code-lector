import React, { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";

interface DataInterface {
	id: string;
	bloque: string;
	nave: string;
	lado: string;
	cama: string;
	date: string;
	barCode: string;
}

const PreviousRegisters: React.FC = () => {
	const navigate = useNavigate();
	const [registers, setRegisters] = useState<DataInterface[]>([]);
	const [dataFound, setDataFound] = useState<boolean>(false);

	const goBack = () => {
		navigate("/");
	};

	const downloadBarcode = (index: number) => {
		const element = document.getElementById(`barcode-container-${index}`);
		if (element) {
			html2canvas(element)
				.then((canvas) => {
					const link = document.createElement("a");
					link.href = canvas.toDataURL("image/png");
					link.download = `codigo_de_barras_${registers[index].barCode}.png`;
					link.click();
				})
				.catch((err) => {
					console.error("Error capturing the barcode:", err);
				});
		}
	};

	useEffect(() => {
		const storedData = localStorage.getItem("registers");
		if (storedData) {
			setRegisters(JSON.parse(storedData));
			setDataFound(true);
		}
	}, []);

	return (
		<>
			<Container>
				<section className="mt-4 d-flex justify-content-between align-items-center">
					<Button variant="info" onClick={goBack}>
						Regresar
					</Button>
					<h2>Registros Previos</h2>
				</section>
				<section className="my-4">
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>N°</th>
								<th>Identificador único</th>
								<th>Bloque</th>
								<th>Nave</th>
								<th>Lado</th>
								<th>Cama</th>
								<th>Fecha</th>
								<th>Código de Barras</th>
							</tr>
						</thead>
						<tbody>
							{dataFound ? (
								registers.map((register, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{register.id}</td>
										<td>{register.bloque}</td>
										<td>{register.nave}</td>
										<td>{register.lado}</td>
										<td>{register.cama}</td>
										<td>{register.date}</td>
										<td>
											<div className="d-flex flex-column align-items-center justify-content-center py-1">
												<div className="" id={`barcode-container-${index}`}>
													<Barcode value={register.barCode} />
												</div>
												<Button
													variant="success"
													onClick={() => downloadBarcode(index)}
													className="my-2"
												>
													Descargar Código de Barras
												</Button>
												{register.barCode}
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={8} className="text-center">
										No existen registros previos en este momento
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</section>
			</Container>
		</>
	);
};

export default PreviousRegisters;
