import * as React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ComposedChart, Bar
} from 'recharts';
import risk from 'images/risk-bolivia.png';
import "./BoliviaCharts.scss";

const ns = "bolivia-charts";

const BoliviaChart = (props) => {
    const [width, setWidth] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    const getCurrentWidthRender = () => {
        if (width > 575)
            return 35 * width / 100;
        return 95 * width / 100;
    }
    const sortedDep = props.departments.sort((x, y) => y.confirmed - x.confirmed);
    return (
        <div className={`${ns}`}>
            <ComposedChart
                className={`${ns}__bar`}
                layout="vertical"
                width={getCurrentWidthRender()}
                height={400}
                data={sortedDep}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 60,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stop-color="#7CB9E8"/>
                        <stop offset="100%" stop-color="#0048BA"/>
                    </linearGradient>
                </defs>
                <CartesianGrid stroke="#f5f5f5"/>
                <XAxis
                    tick={{stroke: 'white', strokeWidth: 1}}
                    type="number"
                />
                <YAxis
                    tick={{stroke: 'white', strokeWidth: 1}}
                    dataKey="name"
                    type="category"/>
                <Tooltip/>
                <Legend
                    tick={{stroke: 'white', strokeWidth: 1}}
                />
                <Bar
                    background={false}
                    name="Casos Confirmados"
                    dataKey="confirmed"
                    barSize={Math.max(15, Math.round(width / 70))}
                    fill="url(#colorUv)"
                />
            </ComposedChart>

            <LineChart
                width={getCurrentWidthRender()}
                height={400}
                data={props.historical}
                margin={{top: 20, right: 15, left: 0, bottom: 5}}
                className={`${ns}__historical`}
            >
                <XAxis
                    tick={{stroke: 'white', strokeWidth: 1}}
                    dataKey="date"
                />
                <YAxis tick={{stroke: 'white', strokeWidth: 1}}/>
                <Tooltip/>
                <Legend tick={{stroke: 'white', strokeWidth: 1}}/>
                <CartesianGrid strokeDasharray="1 1"/>
                <Line type="monotone"
                      name="Confirmados"
                      dataKey="confirmed"
                      stroke="orange"
                      dot={{stroke: 'orange', strokeWidth: 1, fill: "white"}}
                      activeDot={{r: 1}}
                      tick={{stroke: 'white', strokeWidth: 1}}
                />
                <Line
                    type="monotone"
                    name="Decesos"
                    dataKey="deaths"
                    stroke="purple"
                    dot={{stroke: 'purple', strokeWidth: 1, fill: "white"}}
                    activeDot={{r: 1}}
                    tick={{stroke: 'white', strokeWidth: 1}}
                />
                <Line
                    type="monotone"
                    name="Recuperados"
                    dataKey="recovered"
                    stroke="green"
                    dot={{stroke: 'green', strokeWidth: 1, fill: "white"}}
                    activeDot={{r: 1}}
                    tick={{stroke: 'white', strokeWidth: 1}}
                />
                <Line
                    type="monotone"
                    name="Activos"
                    dataKey="actives"
                    stroke="red"
                    dot={{stroke: 'red', strokeWidth: 1, fill: "red"}}
                    activeDot={{r: 1}}
                    tick={{stroke: 'white', strokeWidth: 1}}
                />
            </LineChart>

            <div
                className={`${ns}__mapa-riesgo`}
                width={getCurrentWidthRender()}
                heigth={400}
            >
                <img
                    src={risk}
                    alt={"Índice de riesgo por municipios."}
                />
                <h5>Índice de riesgo por municipios</h5>
            </div>

        </div>
    );
};

export default BoliviaChart;