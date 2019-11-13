import React from "react";
import Table from "react-bootstrap/Table";


const TableBug = props => {
    return (
        <Table className="mt-5" responsive>
            <thead>
            <tr>
                <th>#</th>
                <th>System</th>
                <th>Summary</th>
                <th>Состояние</th>
                <th>Найдено при</th>
                <th>Критичность</th>
                <th>Тип Дефекта</th>
                <th>Дата создания</th>
                <th>Дата изменения</th>
                <th>Дата закрытия</th>
                <th>Метод обнаружения</th>
                <th>reopens_amount</th>
            </tr>
            </thead>
            <tbody>

            {props.bugs
                        .map(item => {
                            return (
                                <tr key={item.ID + item['System']}>
                                    <td>{item['ID']}</td>
                                    <td>{item['System']}</td>
                                    <td>{item['Summary']}</td>
                                    <td>{item['Состояние']}</td>
                                    <td>{item['Найдено при']}</td>
                                    <td>{item['Критичность']}</td>
                                    <td>{item['Тип Дефекта']}</td>
                                    <td>{item['Дата создания']}</td>
                                    <td>{item['Дата изменения']}</td>
                                    <td>{item['Дата закрытия']}</td>
                                    <td>{item['Метод обнаружения']}</td>
                                    <td>{item['reopens_amount']}</td>
                                </tr>
                            )
                        })
            }


            </tbody>
        </Table>
    )
}

export default TableBug