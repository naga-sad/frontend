import React, { Component } from 'react';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import D3JSChart from '../D3JSChart/D3JSChart';
import axios from 'axios';
import PieChart from '../PieChart/PieChart';
import BarChart from '../D3JSChart/BarChart';
import LineChart from '../D3JSChart/LineChart';


class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: {
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            '#ffcd56',
                            '#ff6384',
                            '#36a2eb',
                            '#fd6b19',
                            '#83FF33',
                            '#F633FF',
                            '#FF3333',
                        ],
                    },
                ],
                labels: [],
            },
            dataSourceNew: [],
            emptyBudgets: false,
            barChart: []
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios
            .get('http://3.83.175.91:3001/app/userBudget', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                if (res.status === 201) {
                    this.setState({ emptyBudgets: true });
                }
                else {
                    console.log(res);
                    this.setState({
                        dataSourceNew: res.data.budgets,
                        dataSource: {
                            datasets: [
                                {
                                    data: res.data.budgets.map((v) => v.budget),
                                    backgroundColor: [
                                        '#ffcd56',
                                        '#ff6384',
                                        '#36a2eb',
                                        '#fd6b19',
                                        '#83FF33',
                                        '#F633FF',
                                        '#FF3333',
                                    ],
                                },
                            ],
                            labels: res.data.budgets.map((v) => v.item),
                        },
                    });
                    console.log(this.state.dataSourceNew);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios
            .get('http://3.83.175.91:3001/app/userMonthlyBudget', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                const addedData = this.addBudgetByItem(res.data.budgets);
                this.setState({
                    barChart: res.data.budgets
                })
                console.log(res.data.budgets);
                // this.setState({barChart: addedData});
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
    }

    addBudgetByItem(data) {
        const aggregatedBudgets = {};

        // Iterate through the JSON data and aggregate budgets
        data.forEach((entry) => {
            const item = entry.item;
            const actualBudget = entry.actualbudget;
            const estimatedBudget = entry.estimatedbudget;

            // Check if the item already exists in the aggregatedBudgets object
            if (!aggregatedBudgets[item]) {
                // If it doesn't exist, create an entry for the item
                aggregatedBudgets[item] = {
                    totalEstimatedBudget: estimatedBudget,
                    totalActualBudget: actualBudget,
                };
            } else {
                // If it exists, add the budgets to the existing entry
                aggregatedBudgets[item].totalEstimatedBudget += estimatedBudget;
                aggregatedBudgets[item].totalActualBudget += actualBudget;
            }
        });
        const aggregatedDataArray = Object.entries(aggregatedBudgets).map(([item, budgets]) => ({
            item,
            estimatedBudget: budgets.totalEstimatedBudget,
            actualBudget: budgets.totalActualBudget,
          }));
        return aggregatedDataArray;
    }

    addBudgetByMonth(data) {
        const aggregatedBudgets = {};

        // Iterate through the JSON data and aggregate budgets
        data.forEach((entry) => {
            const month = entry.month;
            const actualBudget = entry.actualbudget;
            const estimatedBudget = entry.estimatedbudget;

            // Check if the item already exists in the aggregatedBudgets object
            if (!aggregatedBudgets[month]) {
                // If it doesn't exist, create an entry for the item
                aggregatedBudgets[month] = {
                    totalEstimatedBudget: estimatedBudget,
                    totalActualBudget: actualBudget,
                };
            } else {
                // If it exists, add the budgets to the existing entry
                aggregatedBudgets[month].totalEstimatedBudget += estimatedBudget;
                aggregatedBudgets[month].totalActualBudget += actualBudget;
            }
        });
        const aggregatedDataArray = Object.entries(aggregatedBudgets).map(([month, budgets]) => ({
            month,
            estimatedBudget: budgets.totalEstimatedBudget,
            actualBudget: budgets.totalActualBudget,
          }));
        return aggregatedDataArray;
    }

    render() {

        return (
            <main className="center" id="main">
                <AppBarComponent />
                <div className="page-area">
                    
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {
                        this.state.emptyBudgets ?
                            <div>No budgets Available</div>

                            :
                            <div>
                                <D3JSChart dataSource={this.state.dataSourceNew} />
                                <PieChart dataSource={this.state.dataSource} />
                                <BarChart data={this.addBudgetByItem(this.state.barChart)} />
                                <br></br>
                                <LineChart data={this.addBudgetByMonth(this.state.barChart)}/>
                            </div>
                    }

                </div>
            </main>
        );
    }
}

export default DashboardComponent;
