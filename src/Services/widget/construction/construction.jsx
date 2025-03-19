import { useState } from "react";

function Construction() {
    const [works] = useState([
        { type: "Pavimentação", place: "Rua A", in: "08:00", out: "12:00" },
        { type: "Manutenção", place: "Rua B", in: "09:00", out: "11:00" },
    ]);

    return (
        <div className="table-container">
            <h2>Ruas fechadas</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Serviço</th>
                        <th>Local</th>
                        <th>Início</th>
                        <th>Término</th>
                    </tr>
                </thead>
                <tbody>
                    {works.map((work, index) => (
                        <tr key={index}>
                            <td>{work.type}</td>
                            <td>{work.place}</td>
                            <td>{work.in}</td>
                            <td>{work.out}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Construction;
