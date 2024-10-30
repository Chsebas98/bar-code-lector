import React, { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface DataInterface {
	id: string;
	bloque: string;
	nave: string;
	lado: string;
	cama: string;
	date: string;
}

const PreviousRegisters: React.FC = () => {
	const navigate = useNavigate();
	const [registers, setRegisters] = useState<DataInterface[]>([]);
	const [dataFound, setDataFound] = useState<boolean>(false);

	const goBack = () => {
		navigate("/");
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
				<section>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>N°</th>
								<th>Codigo Unico</th>
								<th>Bloque</th>
								<th>Nave</th>
								<th>Lado</th>
								<th>Cama</th>
								<th>Fecha</th>
							</tr>
						</thead>
						<tbody>
							{dataFound ? (
								registers.map((register, index) => (
									<tr key={index}>
										<td>{index}</td>
										<td>{register.id}</td>
										<td>{register.bloque}</td>
										<td>{register.nave}</td>
										<td>{register.lado}</td>
										<td>{register.cama}</td>
										<td>{register.date}</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={7} className="text-center">
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
