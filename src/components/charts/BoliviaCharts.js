import * as React from "react";
import "./BoliviaCharts.scss";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ComposedChart, Area, Bar
} from 'recharts';

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

    console.log("current it is ", width);
    const sortedDep = props.departments.sort((x, y) => y.confirmed - x.confirmed);
    return (
        <div className={`${ns}`}>
            {
                <ComposedChart
                    className={`${ns}__bar`}
                    layout="vertical"
                    width={35 * width / 100}
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
                        barSize={ Math.max(15, Math.round(width / 70))}
                        fill="url(#colorUv)"
                    />
                </ComposedChart>
            }
        </div>
    );
};

export default BoliviaChart;