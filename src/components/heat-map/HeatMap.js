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
                    <Geographies geography={boliviaMapGeo}>
                        {({geographies}) =>
                            geographies
                                .filter(d => d.properties.country === "Bolivia")
                                .map(geo => {
                                    return (
                                        <Geography
                                            key={uuidv4()}
                                            geography={geo}
                                            stroke="#909090"
                                            fill={"rgb(205,133,63)"}
                                            style={{
                                                hover: {
                                                    fill: "#ffefcc",
                                                    outline: "none"
                                                },
                                                pressed: {
                                                    fill: "#ffefcc",
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