import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import DropDownSystem from "./components/DropDown/DropDownSystem";
import DropDownCriticality from './components/DropDown/DropDownCriticality'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BugService from "./services/BugServise/BugService";
import TableBug from "./components/TableBug/TableBug";
import BarExample from './components/BarExample/BarExample';
import FilterRequest from "./services/FilterRequest/FilterRequest";


class App extends React.Component {

    BugService = new BugService();

    state = {
        bugs: [],
        error: false,
        selectedSystem: 'Выбрать систему',
        selectedSeverity: 'Критичность',
        startDate: null,
        endDate: null,
        formData: {
            selectedSystem: 'Выбрать систему',
            selectedSeverity: 'Критичность',
            startDate: null,
            endDate: null,
            bugs: []
        },
    };

    componentDidMount() {
        this.updateBugs()
    }

    updateBugs() {
        this.BugService.getAllBugs()
            .then(this.onBugsLoaded)
            .catch(this.onError)
    }

    onBugsLoaded = (bugs) => {
        this.setState({
            bugs,
            error: false
        });
    }

    onError = () => {
        this.setState({
            error: true
        })
    }

    handleChangeStart = date => {
        this.setState({
            startDate: Number(date)
        });
    };

    handleChangeEnd = date => {
        this.setState({
            endDate: Number(date)
        });
    };

    handleSelectSystem = (eventKey, event) => {
        this.setState({selectedSystem: event.target.value});
    }

    handleSelectSeverity = (eventKey, event) => {
        this.setState({selectedSeverity: event.target.value});
    }

    render() {
        const {
            startDate,
            endDate,
            selectedSystem,
            selectedSeverity
        } = this.state.formData;
        var request = new FilterRequest(startDate, endDate, selectedSystem, selectedSeverity);

        return (
            <Container>

                <h2 className="my-5 text-center">Отчет по количеству зарегестрированых дефектов в системе</h2>

                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column">
                        <label htmlFor="startDay">Дата (начало)</label>
                        <DatePicker
                            dateFormat="yyyy/MM/dd"
                            className={'form-control'}
                            placeholderText="Click to select a date"
                            selected={this.state.startDate}
                            onChange={this.handleChangeStart}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor="startDay">Дата (конец)</label>
                        <DatePicker
                            dateFormat="yyyy/MM/dd"
                            className={'form-control'}
                            placeholderText="Click to select a date"
                            selected={this.state.endDate}
                            onChange={this.handleChangeEnd}
                        />
                    </div>
                    <DropDownSystem
                        option={this.state.selectedSystem}
                        onSelect={this.handleSelectSystem}
                    />
                    <DropDownCriticality
                        option={this.state.selectedSeverity}
                        onSelect={this.handleSelectSeverity}
                    />
                </div>

                <hr className="my-5"/>

                <Button
                    variant="outline-success"
                    className="mb-5"
                    onClick={() => {
                        this.setState({
                            formData: {
                                selectedSystem: this.state.selectedSystem,
                                selectedSeverity: this.state.selectedSeverity,
                                startDate: this.state.startDate,
                                endDate: this.state.endDate,
                                bugs: this.state.bugs
                            }
                        })
                    }}
                >
                    Сформировать отчет
                </Button>

                <BarExample
                    start={this.state.formData.startDate}
                    end={this.state.formData.endDate}
                    bugs={this.state.bugs.filter(elem => FilterRequest.filter(elem, request))}
                />

                <TableBug
                    system={this.state.formData.selectedSystem}
                    severity={this.state.formData.selectedSeverity}
                    start={this.state.formData.startDate}
                    end={this.state.formData.endDate}
                    bugs={this.state.formData.bugs.filter(elem => FilterRequest.filter(elem, request))}
                />


            </Container>
        )
    }
}

export default App;
