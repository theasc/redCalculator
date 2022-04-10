import React, {useEffect, useState} from 'react';
import './App.css';
import {concat, makeCalulation, removeLastChar} from "../utils/calculator.utils";

function App() {
    const [historyDisplay, setHistoryDisplay] = useState('');
    const [mainDisplay, setMainDisplay] = useState('');
    const [stack, setStack] = useState(['0']);
    const [allowDot, setAllowDot] = useState(true);
    const [resultTag, setResultTag] = useState(false);

    useEffect(() => {
        setMainDisplay(stack.join(''));
    }, [stack])

    const clear = () => {
        setHistoryDisplay('');
        setStack(['0']);
        setAllowDot(true);
    };

    const deleteLastChar = () => {
        const [updatedStack, dot, result] = removeLastChar([...stack], allowDot, resultTag, mainDisplay);
        setStack(updatedStack);
        setAllowDot(dot);
        setResultTag(result);
    };

    const add = (value: string) => {
        const [updatedStack, dot, result] = concat([...stack], value, allowDot, resultTag);
        setStack(updatedStack);
        setAllowDot(dot);
        setResultTag(result);
    };

    const calculate = async () => {
        setResultTag(true);
        setHistoryDisplay(mainDisplay + '=');
        setMainDisplay('');
        const [updatedStack, dot] = await makeCalulation(stack, allowDot);
        setAllowDot(dot);
        setStack(updatedStack);

    }
    return (
        <div className="container">
            <div className="calculator">
                <div className="result-display">
                    <div className="display1"><strong>{historyDisplay}</strong></div>
                    <div className="display2"><strong>{mainDisplay}</strong></div>
                </div>
                <div onClick={clear} className="first-half symbol">AC</div>
                <div onClick={deleteLastChar} className="second-half symbol">CE</div>
                <div onClick={() => add('7')} className="number">7</div>
                <div onClick={() => add('8')} className="number">8</div>
                <div onClick={() => add('9')} className="number">9</div>
                <div onClick={() => add('/')} className="symbol">÷</div>
                <div onClick={() => add('4')} className="number">4</div>
                <div onClick={() => add('5')} className="number">5</div>
                <div onClick={() => add('6')} className="number">6</div>
                <div onClick={() => add('*')} className="symbol">×</div>
                <div onClick={() => add('1')} className="number">1</div>
                <div onClick={() => add('2')} className="number">2</div>
                <div onClick={() => add('3')} className="number">3</div>
                <div onClick={() => add('-')} className="symbol">-</div>
                <div onClick={() => add('0')} className="number">0</div>
                <div onClick={() => add('.')} className="number">·</div>
                <div onClick={calculate} className="symbol result">=</div>
                <div onClick={() => add('+')} className="symbol">+</div>
            </div>
        </div>
    );
}

export default App;
