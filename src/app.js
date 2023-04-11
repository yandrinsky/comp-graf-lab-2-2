import React, {useEffect, useState} from 'react';
import './app.css';
import {InputArea} from "./input-area/input-area.component";
import {renderBezierCurve} from "./app.utils";
import {CNV as CNV_lib} from "./CNV_lib/library";
import {CSS} from "./css";

export const App = () => {
    const [dotsState, setDotsState] = useState([]);
    const [CNV, setCNV] = useState();

    const rerender = () => {
        if(!CNV){
            return
        }

        CNV.combineRender(() => {
            CNV.querySelectorAll('.circle').forEach(item => {
                item.remove();
            });
        });

        CNV.combineRender(() => {
            dotsState.forEach(dot => {
                CNV.createCircle({x0: dot.x, y0: dot.y, className: 'circle'})
            })
        });

        const dots = CNV.querySelectorAll('.circle').map(circle => ({
            x: circle.link.getCoords().start.x,
            y: circle.link.getCoords().start.y
        }));

        renderBezierCurve({
            dots,
            CNV
        });
    }

    useEffect(() => {
        const canvas = document.querySelector('#canvas');
        const context = canvas.getContext('2d');

        const CNV = new CNV_lib({
            canvas,
            context,
            css: CSS
        });

        setCNV(CNV);

        CNV.state.isAuxLines = true;

    }, []);

    return (
        <div className="area">
            <canvas id="canvas" width={window.innerWidth - 300} height={window.innerHeight} style={{border: "1px solid black"}}/>

            <div className='active-area'>
                {dotsState.map((dot, index) =>
                    <InputArea
                        dotNumber={index + 1}
                        onCancel={() => {
                            dotsState.splice(index, 1);
                            setDotsState([...dotsState.slice(0, index), ...dotsState.slice(index, dotsState.length)]);
                            rerender();
                        }}

                        onCoordsChange={(newDot) => {
                            dotsState.splice(index, 1, newDot);
                            setDotsState(dotsState);
                            rerender();
                        }}

                        dotX={dot.x}
                        dotY={dot.y}
                        key={index}
                />)}

                <button style={{marginTop: "10px"}} onClick={() => {
                    setDotsState([...dotsState, {x: 0, y: 0}])
                    rerender();
                }}
                >Добавить</button>
            </div>

        </div>
    );
};
