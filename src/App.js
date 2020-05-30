import * as React from 'react';
import axios from 'axios';
import Statistics from 'components/bolivia-statistics/Statistics';
import Header from "components/header/Header";
import Loading from "components/loading/Loading";

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            historical: [],
            consolidated: []
        };
    }

    getTotal = data => {
        const totalConfirmed = data.reduce((total, currentDep) => total + currentDep.data.confirmed || 0, 0);
        const totalRecovered = data.reduce((total, currentDep) => total + currentDep.data.recovered || 0, 0);
        const totalDeaths = data.reduce((total, currentDep) => total + currentDep.data.deaths || 0, 0);

        return [{
            title: "CONFIRMADOS",
            additionalCls: "confirmed",
            total: totalConfirmed
        }, {
            title: "RECUPERADOS",
            additionalCls: "recovered",
            total: totalRecovered
        }, {
            title: "DECESOS",
            additionalCls: "death",
            total: totalDeaths
        }]
    }

    formatHistoricalData = (historical) => {

        var historicalData = [];

        historical.forEach( his => {
            var date = new Date(null);
            date.setSeconds(date.getSeconds() + his.data.date._seconds);
            his.data.date = date;
            historicalData.push(his.data);
            //console.log("it", his);
        });
        historicalData.sort( (x, y) => x.date > y.date ? 1:-1 );
        debugger;
        //xxx.setSeconds(xxx.getSeconds() + historical[0].data.date._seconds)
    }

    componentDidMount() {

        let one = 'https://us-central1-bolivia-covid19-data.cloudfunctions.net/app/getDepartments';
        let two = 'https://us-central1-bolivia-covid19-data.cloudfunctions.net/app/getHistorical';
        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        axios.all([
            requestOne,
            requestTwo]
        ).then(axios.spread((...responses) => {
            const departments = responses[0].data;
            const historical = responses[1].data;
            this.setState({
                departments: departments || [],
                historical: historical,
                consolidated: this.getTotal(departments || [])
            });
            this.formatHistoricalData(historical);
        })).catch(errors => {
            console.error(errors);
        })
    }

    render() {
        if (this.state.departments.length > 0) {
            return (
                <div className="App">
                    <Header total={this.state.consolidated}/>
                    <Statistics
                        departments={this.state.departments}
                        total={this.state.consolidated}
                    />
                </div>
            );
        } else {
            return (<Loading/>);
        }
    }
}

export default App;
