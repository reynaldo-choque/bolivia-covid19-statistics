import * as React from 'react';
import axios from 'axios';
import Statistics from 'components/bolivia-statistics/Statistics';
import Header from "components/header/Header";

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            consolidated: []
        };
    }

    getTotal = data => {
        const totalConfirmed = data.reduce( (total, currentDep) => total + currentDep.data.confirmed || 0, 0);
        const totalRecovered = data.reduce( (total, currentDep) => total + currentDep.data.recovered || 0, 0);
        const totalDeaths = data.reduce( (total, currentDep) => total + currentDep.data.deaths || 0, 0);

        return [{
            title: "CONFIRMADOS",
            additionalCls: "confirmed",
            total: totalConfirmed
        }, {title: "RECUPERADOS",
            additionalCls: "recovered",
            total: totalRecovered
        }, {
            title: "DECESOS",
            additionalCls: "death",
            total: totalDeaths
        }]
    }
    componentDidMount() {
        axios
            .get('https://us-central1-bolivia-covid19-data.cloudfunctions.net/app/getDepartments')
            .then((response) => {
                return response.data;
            }).then(data => {
                this.setState({
                    departments: data || [],
                    consolidated: this.getTotal(data || [])
                });
        }).catch(e => {
            console.error(e);
        });

    }
    render() {
        console.log("render")
        //this.getTotal();
        return (
            <div className="App">
                <Header total = {this.state.consolidated} />
                <Statistics departments = {this.state.departments} />
            </div>
        );
    }
}

export default App;
