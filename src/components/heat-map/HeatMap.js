import * as React from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import "./HeatMap.scss";

import {v4 as uuidv4} from 'uuid';
import boliviaMapGeo from "utils/bolivia-map-coordinates.json";

const ns = "heat-map";

class HeatMap extends React.Component {
    state = {
        rotate_X: 63,
        rotate_Y: 18,
        fillColor: null
    };

    constructor() {
        super();
    }

    render() {
        return (
            <div className={`${ns}`}>
                <ComposableMap
                    data-tip={this.props.dataTip}
                    width={window.innerWidth * 75 / 100}
                    height={window.innerWidth * 75 / 100}
                    projection="geoAzimuthalEqualArea"
                    projectionConfig={{
                        rotate: [this.state.rotate_X, this.state.rotate_Y, 0],
                        scale: Math.round(2.5 * window.innerWidth)
                    }}
                >
                    <defs>
                        <linearGradient id="mapTooltip" x1="0" y1="0" x2="100%" y2="0">
                            <stop offset="0%" stop-color="#ffffff"/>
                            <stop offset="100%" stop-color="#fec84e"/>
                        </linearGradient>
                    </defs>
                    <Geographies geography={boliviaMapGeo}>
                        {({geographies}) =>
                            geographies
                                .filter(d => d.properties.country === "Bolivia")
                                .map(geo => {
                                    let fillColor = "rgb(255, 180, 0)";
                                    if(this.props.departments.length > 0) {
                                        const depInfo = this.props.departments.find(dep => dep.data.name === geo.properties.name);
                                        const percentage = Math.ceil(100 * depInfo.data.confirmed / this.props.total[0].total);
                                        fillColor = `rgb(255, ${180 - percentage}, 0)`;
                                    }
                                    return (
                                        <Geography
                                            key={uuidv4()}
                                            geography={geo}
                                            stroke="#ffffff"
                                            fill={fillColor}
                                            style={{
                                                hover: {
                                                    fill: "url(#mapTooltip)",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "url(#mapTooltip)",
                                                    outline: "none"
                                                }
                                            }}
                                            onMouseEnter={() => {
                                                this.props.dataTipFn(geo.properties.name);
                                            }}
                                            onMouseLeave={() => {
                                                this.props.dataTipFn(null);
                                            }}
                                        />);
                                })
                        }
                    </Geographies>
                </ComposableMap>
            </div>
        );
    }
}

export default HeatMap;