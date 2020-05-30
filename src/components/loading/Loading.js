import * as React from "react";
import "./Loading.scss";

const ns = "loading-page";

const Loading = (props) => {
    return (
        <div className={`${ns}`}>
            <div className={`${ns}__wavy`}>
                <span style={{"--i":1}}>C</span>
                <span style={{"--i":2}}>a</span>
                <span style={{"--i":3}}>r</span>
                <span style={{"--i":4}}>g</span>
                <span style={{"--i":5}}>a</span>
                <span style={{"--i":6}}>n</span>
                <span style={{"--i":7}}>d</span>
                <span style={{"--i":9}}>o</span>
                <span style={{"--i":10}}>.</span>
                <span style={{"--i":11}}>.</span>
                <span style={{"--i":12}}>.</span>
            </div>
        </div>
    );
};
export default Loading;