import React, { useState } from "react";
import AdminLayout from "@/components/mycomponents/AdminLayout";
import { router } from "@inertiajs/react";

interface GridCell {
    id: string;
    isPath: boolean;
    seatNumber: number;
}

const HallLayoutBuilder = () => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [rows, setRows] = useState(6);
    const [columns, setColumns] = useState(10);
    const [rowWalkways, setRowWalkways] = useState<number[]>([]);
    const [colWalkways, setColWalkways] = useState<number[]>([]);
    const [vipSeats, setVipSeats] = useState<number[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    const maxRows = 50;
    const maxCols = 50;

    const generateGrid = (): GridCell[] => {
        if (!showPreview) return [];
        const cells: GridCell[] = [];
        let seatCounter = 0;
        const rowGaps = new Set(rowWalkways.filter((r) => r > 0 && r < rows));
        const colGaps = new Set(colWalkways.filter((c) => c > 0 && c < columns));

        for (let r = 1; r <= rows; r++) {
            for (let c = 1; c <= columns; c++) {
                seatCounter++;
                cells.push({ id: `s-${r}-${c}`, isPath: false, seatNumber: seatCounter });

                if (colGaps.has(c)) {
                    cells.push({ id: `gp-c-${r}-${c}`, isPath: true, seatNumber: -1 });
                }
            }

            if (rowGaps.has(r)) {
                const visualCols = columns + colGaps.size;
                for (let k = 0; k < visualCols; k++) {
                    cells.push({ id: `gp-r-${r}-${k}`, isPath: true, seatNumber: -1 });
                }
            }
        }

        return cells;
    };

    const toggleVip = (seatNum: number) => {
        if (seatNum === -1) return;
        setVipSeats((prev) =>
            prev.includes(seatNum) ? prev.filter((s) => s !== seatNum) : [...prev, seatNum]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post("/admin/halls", {
            name,
            city,
            rows,
            columns,
            row_walkways: rowWalkways,
            col_walkways: colWalkways,
            vip_seats: vipSeats,
        });
    };

    return (
        <div className="p-6 bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-4 text-white">Cinema 2D Layout Designer</h1>

            <form
                className="bg-gray-800 p-5 rounded space-y-4 border border-white/20"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <label className="text-sm text-white">Hall Name</label>
                    <input
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-950 border border-gray-700 p-2 rounded text-white "
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-white">City</label>
                    <input
                        name="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-gray-950 border border-gray-700 p-2 rounded text-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm text-white">Rows (max 50)</label>
                        <input
                            name="rows"
                            type="number"
                            value={rows}
                            min={1}
                            max={50}
                            onChange={(e) =>
                                setRows(Math.min(maxRows, Math.max(1, Number(e.target.value))))
                            }
                            className="bg-gray-950 border border-gray-700 p-2 rounded text-white"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-white">Columns (max 50)</label>
                        <input
                            name="columns"
                            type="number"
                            value={columns}
                            min={1}
                            max={50}
                            onChange={(e) =>
                                setColumns(Math.min(maxCols, Math.max(1, Number(e.target.value))))
                            }
                            className="bg-gray-950 border border-gray-700 p-2 rounded text-white"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs text-white uppercase font-bold">Row Walkways</label>
                            <button
                                type="button"
                                onClick={() => setRowWalkways([...rowWalkways, 1])}
                                className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                            >
                                +
                            </button>
                        </div>
                        {rowWalkways.map((val, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    min={1}
                                    max={rows - 1}
                                    value={val}
                                    onChange={(e) => {
                                        const copy = [...rowWalkways];
                                        copy[idx] = Math.min(rows - 1, Math.max(1, Number(e.target.value)));
                                        setRowWalkways(copy);
                                    }}
                                    className="w-full bg-gray-950 border border-gray-700 p-1 rounded text-white text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const copy = [...rowWalkways];
                                        copy.splice(idx, 1);
                                        setRowWalkways(copy);
                                    }}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs text-white uppercase font-bold">Column Walkways</label>
                            <button
                                type="button"
                                onClick={() => setColWalkways([...colWalkways, 1])}
                                className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                            >
                                +
                            </button>
                        </div>
                        {colWalkways.map((val, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    min={1}
                                    max={columns - 1}
                                    value={val}
                                    onChange={(e) => {
                                        const copy = [...colWalkways];
                                        copy[idx] = Math.min(columns - 1, Math.max(1, Number(e.target.value)));
                                        setColWalkways(copy);
                                    }}
                                    className="w-full bg-gray-950 border border-gray-700 p-1 rounded text-white text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const copy = [...colWalkways];
                                        copy.splice(idx, 1);
                                        setColWalkways(copy);
                                    }}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setShowPreview(true)}
                        className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
                    >
                        See Preview
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create Hall
                    </button>
                </div>
            </form>

            {showPreview && (
                <div className="mt-8 overflow-auto">
                    <div
                        className="inline-grid border border-gray-700"
                        style={{
                            gridTemplateColumns: `repeat(${columns + colWalkways.length}, 32px)`,
                            gap: "4px",
                        }}
                    >
                        {generateGrid().map((cell) => (
                            <div
                                key={cell.id}
                                onClick={() => toggleVip(cell.seatNumber)}
                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded cursor-pointer ${cell.isPath
                                        ? "bg-gray-700"
                                        : vipSeats.includes(cell.seatNumber)
                                            ? "bg-white text-black"
                                            : "bg-gray-500"
                                    }`}
                            >
                                {!cell.isPath && cell.seatNumber}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

HallLayoutBuilder.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default HallLayoutBuilder;
