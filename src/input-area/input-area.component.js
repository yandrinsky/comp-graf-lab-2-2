import React, {useEffect, useState} from 'react';
import "./input-area.css"

export const InputArea = ({dotNumber, onCoordsChange, onCancel, dotX, dotY}) => {
    const [xState, setXState] = useState(dotX);
    const [yState, setYState] = useState(dotY);

    useEffect(() => {
        setXState(dotX);
        setYState(dotY);
    }, [dotX, dotY])

    useEffect(() => {
        if(xState ?? yState) {
            onCoordsChange?.({x: xState, y: yState})
        }
    }, [xState, yState])

    return <div className="input-area">
        <div className="cancel" onClick={onCancel}>✕</div>
        <p className="dotNumber">Точка {dotNumber}</p>

        <label>
            x:
            <input type="text" value={xState ?? 0} onInput={(e) => {
                if(!isNaN(Number(e.target.value))){
                    setXState(Number(e.target.value))
                }
            }}/>
        </label>

        <label>
            y:
            <input type="text" value={yState ?? 0} onInput={(e) => {
                if(!isNaN(Number(e.target.value))){
                    setYState(Number(e.target.value))
                }}
            }/>
        </label>
    </div>;
}