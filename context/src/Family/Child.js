import React, {useContext, useState} from 'react';
import GrandChild from './GrandChild';
import CountContext from '../CountContext';
import ThemeContext from '../ThemeContext';


function Child() {
    const [count, setCount] = useState(0);
    const color = useContext(ThemeContext);

    const increment = () => {
        setCount(count => count + 1);
    };

    return (
        <CountContext.Provider value={{count, increment}}>
            <div style={{border: '4px solid #0074D9', margin: '1rem', width: '500px'}}>
                <p>I'm the child!</p>
                <p>I "own" count. It is: {count}</p>
                <button style={{color}} onClick={increment}>Increment Count</button>
                <GrandChild />
            </div>
        </CountContext.Provider>

    );
}

export default Child;
