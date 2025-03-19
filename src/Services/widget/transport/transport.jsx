import { useState } from 'react';
import './transport.css';

function PublicTransport() {
    const [transportTypes] = useState(['Autocarro', 'Comboio']);
    const [selectedTransport, setSelectedTransport] = useState(transportTypes[0]);
    const [transports] = useState([
        {
            type: 'Autocarro',
            inHour: '08:00',
            outHour: '08:05',
            stop: 'Paragem A',
            destination: 'Centro'
        },
        {
            type: 'Autocarro',
            inHour: '08:15',
            outHour: '08:20',
            stop: 'Paragem B',
            destination: 'Terminal Rodoviário'
        },
        {
            type: 'Autocarro',
            inHour: '08:30',
            outHour: '08:35',
            stop: 'Paragem C',
            destination: 'Zona Industrial'
        },
        {
            type: 'Autocarro',
            inHour: '08:45',
            outHour: '08:50',
            stop: 'Paragem D',
            destination: 'Bairro Alto'
        },
        {
            type: 'Autocarro',
            inHour: '09:00',
            outHour: '09:05',
            stop: 'Paragem E',
            destination: 'Centro Comercial'
        },
        {
            type: 'Autocarro',
            inHour: '09:15',
            outHour: '09:20',
            stop: 'Paragem F',
            destination: 'Estádio'
        },
        {
            type: 'Autocarro',
            inHour: '09:30',
            outHour: '09:35',
            stop: 'Paragem G',
            destination: 'Hospital'
        },
        {
            type: 'Autocarro',
            inHour: '09:45',
            outHour: '09:50',
            stop: 'Paragem H',
            destination: 'Universidade'
        },
        {
            type: 'Autocarro',
            inHour: '10:00',
            outHour: '10:05',
            stop: 'Paragem I',
            destination: 'Parque'
        },
        {
            type: 'Autocarro',
            inHour: '10:15',
            outHour: '10:20',
            stop: 'Paragem J',
            destination: 'Shopping Center'
        },
        // Comboios
        {
            type: 'Comboio',
            inHour: '07:50',
            outHour: '07:55',
            stop: 'Estação Central',
            destination: 'Lisboa'
        },
        {
            type: 'Comboio',
            inHour: '08:10',
            outHour: '08:15',
            stop: 'Estação Norte',
            destination: 'Porto'
        },
        {
            type: 'Comboio',
            inHour: '08:30',
            outHour: '08:35',
            stop: 'Estação Sul',
            destination: 'Coimbra'
        },
        {
            type: 'Comboio',
            inHour: '08:50',
            outHour: '08:55',
            stop: 'Estação Oeste',
            destination: 'Faro'
        },
        {
            type: 'Comboio',
            inHour: '09:10',
            outHour: '09:15',
            stop: 'Estação Leste',
            destination: 'Braga'
        },
        {
            type: 'Comboio',
            inHour: '09:30',
            outHour: '09:35',
            stop: 'Estação Central',
            destination: 'Setúbal'
        },
        {
            type: 'Comboio',
            inHour: '09:50',
            outHour: '09:55',
            stop: 'Estação Secundária',
            destination: 'Évora'
        },
        {
            type: 'Comboio',
            inHour: '10:10',
            outHour: '10:15',
            stop: 'Estação Regional',
            destination: 'Leiria'
        },
        {
            type: 'Comboio',
            inHour: '10:30',
            outHour: '10:35',
            stop: 'Estação Metropolitana',
            destination: 'Viseu'
        },
        {
            type: 'Comboio',
            inHour: '10:50',
            outHour: '10:55',
            stop: 'Estação Urbana',
            destination: 'Guarda'
        }
    ]);

    const handleTransportChange = (event) => {
        setSelectedTransport(event.target.value);
    };

    const filteredTransports = transports.filter(
        (transport) => transport.type === selectedTransport
    );

    return (
        <div className='table-container'>
            <h2>Trasportes Ovar - Aveiro</h2>
            <label htmlFor="transportSelect">Selecione o transporte: </label>
            <select id="transportsTypes" value={selectedTransport} onChange={handleTransportChange}>
                {transportTypes.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Veículo</th>
                        <th>Chegada</th>
                        <th>Saída</th>
                        <th>Paragem</th>
                        <th>Destino</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransports.map((transport, index) => (
                        <tr key={index}>
                            <td>{transport.type}</td>
                            <td>{transport.inHour}</td>
                            <td>{transport.outHour}</td>
                            <td>{transport.stop}</td>
                            <td>{transport.destination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PublicTransport;
