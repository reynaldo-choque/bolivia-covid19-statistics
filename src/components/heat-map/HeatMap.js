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

    getWidth = () => {
        let width = window.innerWidth;
        if (width > 575) {
            width = width * 75 / 100;
        } else {
            width = width * 90 / 100;
        }
        return width;
    }

    getScale = () => {
        let scale = window.innerWidth;
        if (scale > 575) {
            scale = 2.5 * scale;
        } else {
            scale = 3.5 * scale;
        }
        return Math.round(scale);
    }

    getXRotation = () => {
        let xRotate = 62;
        if (window.innerWidth > 575) {
            xRotate = xRotate + 1;
        } else {
            xRotate = xRotate + 2;
        }
        return xRotate;
    }

    getYRotation = () => {
        let yRotate = 19;
        if (window.innerWidth > 575) {
            yRotate = yRotate - 1;
        } else {
            yRotate = yRotate - 2;
        }
        return yRotate;
    }

    render() {
        return (
            <div className={`${ns}`}>
                <ComposableMap
                    data-tip={this.props.dataTip}
                    width={this.getWidth()}
                    height={this.getWidth()}
                    projection="geoAzimuthalEqualArea"
                    projectionConfig={{
                        rotate: [this.getXRotation(), this.getYRotation(), 0],
                        scale: this.getScale()
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
                                    if (this.props.departments.length > 0) {
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
                    {this.props.locations.map(({data: {coordinates}}) => {
                        return (
                            <Marker key={uuidv4()} coordinates={coordinates}>
                                <circle r={6}
                                        fill="#ff0000"
                                        stroke="#cc0000"
                                        strokeWidth={Math.max(5, Math.floor(window.innerWidth / 100))}
                                        opacity={0.5}
                                />
                            </Marker>
                        );
                    })}

                    {this.props.locations.map(({data: {municipality}, data: {coordinates}}) => {
                        return (
                            <Marker key={uuidv4()} coordinates={coordinates}>
                                {Math.round(Math.random() * 100) % 7 === 0 &&
                                <text
                                    textAnchor="middle"
                                    y={-15}
                                    style={{
                                        fontFamily: "system-ui",
                                        fill: "#FFFFFF",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    {municipality}
                                </text>
                                }
                            </Marker>
                        );
                    })}
                </ComposableMap>
            </div>
        );
    }
}

export default HeatMap;