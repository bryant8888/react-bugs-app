import React from 'react'
import DropdownButton from "react-bootstrap/DropdownButton"
import Dropdown from "react-bootstrap/Dropdown";
import './DropDown.css'


const DropDownSystem = props => {


        return (
            <div className="select_option">
                <label htmlFor="type">Система</label>
                <DropdownButton
                    id="dropdown-basic-button"
                    type="select"
                    variant="outline-secondary"
                    title={props.option}
                    size="md"
                    onSelect={props.onSelect}
                >
                    <Dropdown.Item eventKey="1" value="System1" as="button">System1</Dropdown.Item>
                    <Dropdown.Item eventKey="2" value="System2" as="button">System2</Dropdown.Item>
                </DropdownButton>
            </div>
        )
}

export default DropDownSystem