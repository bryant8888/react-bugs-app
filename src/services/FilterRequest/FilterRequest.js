import {FieldsEnum} from '../AppConfig/App.config'

class FilterRequest {
    constructor(dateFrom, dateTo, systemName, severityLevel) {
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.systemName = systemName;
        this.severityLevel = severityLevel;
    }

    static filter(elem, filterRequest) {
        return [
            FilterRequest.filterBySeverityLevel(elem, filterRequest),
            FilterRequest.filterBySystemName(elem, filterRequest),
            FilterRequest.filterByDate(elem, filterRequest)
        ].reduce((prev = true, cur) => prev && cur);
    }

    static filterByDate(elem, filterRequest) {
        let date = Number(new Date(elem['Дата создания']));

        if (filterRequest.dateFrom && filterRequest.dateTo) {
            return date >= filterRequest.dateFrom && date <= filterRequest.dateTo

        } else if ((!Boolean(filterRequest.dateFrom)) && (filterRequest.dateTo)) {
            return date <= filterRequest.dateTo

        } else if (filterRequest.dateFrom && !Boolean(filterRequest.dateTo)) {
            return date >= filterRequest.dateFrom

        } else if (!Boolean(filterRequest.dateFrom) && !Boolean(filterRequest.dateTo)) {
            return true

        } else {
            return true
        }
    }

    static filterBySeverityLevel(elem, filterRequest) {
        if (filterRequest.severityLevel !== FieldsEnum.Critical) {
            return elem['Критичность'] === filterRequest.severityLevel;

        } else {
            return true;
        }
    }

    static filterBySystemName(elem, filterRequest) {

        if (filterRequest.systemName !== FieldsEnum.SelectSystem) {
            return elem['System'] === filterRequest.systemName;

        } else {
            return true;
        }
    }
}

export default FilterRequest