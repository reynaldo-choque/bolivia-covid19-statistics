import * as React from "react";
import HeatMap from "components/heat-map/HeatMap";
import ReactTooltip from "react-tooltip";
import "./Statistics.scss";

const ns = "statistics";

class Statistics extends React.Component {
    state = {
        tooltipContent: ""
    };

    constructor() {
        super();
    }

    editTooltip = (department) => {

        if (this.props.departments.length > 0) {
            if (department) {
                console.log("it is ", department);
                const depInfo = this.props.departments.find(dep => dep.data.name === department);
                console.log("got", depInfo);
                if(depInfo) {
                    this.setState({
                        tooltipContent: "<b>"
                            + department
                            + "<br /> Confirmados: "
                            + depInfo.data.confirmed
                            + "<br /> Recuperados "
                            + depInfo.data.recovered
                            + "<br /> Decesos"
                            + depInfo.data.deaths
                            + "</b>"
                    });
                }
            } else {
                this.setState({
                    tooltipContent: ""
                });
            }
        }
    }

    render() {
        return (
            <div className={`${ns}`}>
                <React.Fragment>
                    <HeatMap
                        dataTip={this.state.tooltipContent}
                        dataTipFn={this.editTooltip}
                    />
                    <ReactTooltip html={true} style={{padding: "0" }} />
                </React.Fragment>
                <div style={{flex: 1}}>carajits</div>
            </div>
        );
    }
}

export default Statistics;