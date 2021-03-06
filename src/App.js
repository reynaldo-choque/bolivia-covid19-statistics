import * as React from 'react';
import axios from 'axios';
import Statistics from 'components/bolivia-statistics/Statistics';
import Header from "components/header/Header";
import Loading from "components/loading/Loading";

import './App.scss';
import ReactTooltip from "react-tooltip";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            historical: [],
            locations: [],
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
        let historicalData = [];
        historical.forEach(his => {
            let date = new Date(null);  //get first UNIX time
            date.setSeconds(date.getSeconds() + his.data.date._seconds);
            his.data.date = date;
            historicalData.push(his.data);
        });
        historicalData.sort((x, y) => x.date > y.date ? 1 : -1);
        historicalData.forEach(his => {
            const month = his.date.getMonth();
            const day = his.date.getDate().toString().padStart(2, "0");
            his.date = `${day}-${MONTHS[month]}`;
            his.actives = his.confirmed - his.recovered - his.deaths;
        });
        return historicalData;
    }

    componentDidMount() {
        let one = 'https://us-central1-bolivia-covid19-data.cloudfunctions.net/app/getDepartments';
        let two = 'https://us-central1-bolivia-covid19-data.cloudfunctions.net/app/getHistorical';
        let three = 'https://us-central1-bolivia-covid19-data.cloudfunctions.net/app/getLocations';
        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        const requestThree = axios.get(three);
        axios.all(
            [
                requestOne,
                requestTwo,
                requestThree
            ]
        ).then(axios.spread((...responses) => {
            const departments = responses[0].data;
            const historical = responses[1].data;
            const locations = responses[2].data || [];
            this.setState({
                departments: departments || [],
                historical: this.formatHistoricalData(historical),
                consolidated: this.getTotal(departments || []),
                locations: locations
            });
        })).catch(errors => {
            console.error(errors);
        })
    }

    render() {
        if (this.state.departments.length > 0) {
            return (
                <React.Fragment>
                    <div className={"rain"}></div>
                    <audio src={"https://firebasestorage.googleapis.com/v0/b/bolivia-covid19-data.appspot.com/o/SadBrothers.webm?alt=media&token=c5126b1a-f7cd-4e30-995a-510aabd589a3"} autoPlay={true} loop={true} />
                    <div className="App">
                        <Header total={this.state.consolidated}/>
                        <Statistics
                            departments={this.state.departments}
                            historical={this.state.historical}
                            locations={this.state.locations}
                            total={this.state.consolidated}
                        />
                    </div>
                </React.Fragment>
            );
        } else {
            return (<Loading/>);
        }
    }
}

export default App;
