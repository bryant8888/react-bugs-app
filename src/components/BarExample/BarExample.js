import React from 'react';
import {Bar} from 'react-chartjs-2';

class BarExample extends React.Component {


    chartColor(index) {
        const r = index% 2 ? 0 : 255;
        const g = index% 2 ? 255 : 0;
        const b = index * 80;
        const rgbaGen = (r, g, b, alpha) => `rgba(${r},${g},${b},${alpha})`;

        return {
            backgroundColor: rgbaGen(r, g, b, 0.2),
            borderColor: rgbaGen(r, g, b, 1),
            borderWidth: 1,
            hoverBackgroundColor: rgbaGen(r, g, b, 0.4),
            hoverBorderColor: rgbaGen(r, g, b, 1),
        };
    }

    toData(bugs) {
        const systemTypes = bugs.length ? Object.keys(
            bugs.map(bug => {
                return {
                    [bug.System]: bug.System
                };
            }).reduce((prev, cur) => ({...prev, ...cur}))
        ) : [];
        let startYear = new Date(this.props.start).getFullYear()
        let endYear = new Date(this.props.end).getFullYear()
        let startMonth = new Date(this.props.start).getMonth() + 1
        let endMonth = new Date(this.props.end).getMonth() + 1
        let labels = []

        if (endYear === 1970) {
            endYear = new Date().getFullYear()
            endMonth = new Date().getMonth() + 1
        }

        if (startYear !== 1970 && endYear !== 1970) {
            while (startMonth <= endMonth || startYear !== endYear) {
                if (startMonth < 10) {
                    labels.push(`0${startMonth}.${startYear}`)
                } else {
                    labels.push(`${startMonth}.${startYear}`)
                }


                if (startMonth !== 12) {
                    startMonth += 1;
                } else {
                    startMonth = 1;
                    startYear += 1;
                }
            }
        }
        const data = {
            labels: labels,
            datasets: systemTypes.map(typename => {
                const sortedBugs = bugs
                    .filter(bug => bug.System === typename);

                return {
                    label: typename,
                    data: labels.map(label => {
                        return sortedBugs.filter(bug => {
                            return bug["Дата создания"].split(/-/g).slice(0, 2).reverse().join('.') === label;
                        }).length;
                    }),
                    ...this.chartColor(typename[typename.length - 1])
                };
            })
        };

        return data;
    }

    render() {
        const data = this.toData(this.props.bugs);

        return (
            <div>
                <h2>Bar Example (custom size)</h2>
                <Bar
                    data={data}
                    width={100}
                    height={50}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}

export default BarExample