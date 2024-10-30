import React from "react";
import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";

const ExcelHandler: React.FC = () => {
	const handleExport = () => {
		const data: string[] = [];
		const worksheet = XLSX.utils.json_to_sheet(data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		XLSX.writeFile(workbook, "data.xlsx");
	};

	return (
		<div className="text-center">
			<Button variant="success" onClick={handleExport}>
				Exportar a Excel
			</Button>
		</div>
	);
};

export default ExcelHandler;
