import * as React from "react";
import HeatMap from "components/heat-map/HeatMap";
import BoliviaChart from "components/charts/BoliviaCharts";
import ReactTooltip from "react-tooltip";
import "./Statistics.scss";

const ns = "statistics";

class Statistics extends React.Component {
    state = {
        tooltipContent: ""
    };

    editTooltip = (department) => {

        if (this.props.departments.length > 0) {
            if (department) {
                const depInfo = this.props.departments.find(dep => dep.data.name === department);
                if (depInfo) {
                    this.setState({
                        tooltipContent: "<b>"
                            + department
                            + "<br /> Confirmados: "
                            + depInfo.data.confirmed
                            + "<br /> Recuperados: "
                            + depInfo.data.recovered
                            + "<br /> Decesos: "
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
                        total={this.props.total || []}
                        departments={this.props.departments || []}
                    />
                    <ReactTooltip html={true} style={{padding: "0"}}/>
                </React.Fragment>
                <BoliviaChart
                    total={this.props.total || []}
                    departments={this.props.departments.map(dep => dep.data) || []}
                    historical={this.props.historical}
                />
            </div>
        );
    }
}

export default Statistics;