import React from 'react'
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown";
import './DropDown.css'


const DropDownCriticality = props => {


        return (
            <div className="select_option">
                <label htmlFor="type">Критичность</label>
                <DropdownButton
                    id="dropdown-basic-button"
                    type="select"
                    variant="outline-secondary"
                    size="md"
                    placeholder="Выбрать критичность"
                    title={props.option}
                    onSelect={props.onSelect}
                >
                    <Dropdown.Item eventKey="1" value="Низкий" as="button">Низкий</Dropdown.Item>
                    <Dropdown.Item eventKey="2" value="Средний" as="button">Средний</Dropdown.Item>
                    <Dropdown.Item eventKey="3" value="Высокий" as="button">Высокий</Dropdown.Item>
                    <Dropdown.Item eventKey="4" value="Очень важно" as="button">Очень важно</Dropdown.Item>
                    <Dropdown.Item eventKey="4" value="Критический" as="button">Критический</Dropdown.Item>
                    <Dropdown.Item eventKey="5" value="Неизвестно" as="button">Неизвестно</Dropdown.Item>
                </DropdownButton>
            </div>
        )
}

export default DropDownCriticality