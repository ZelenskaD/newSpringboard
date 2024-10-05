import React , {useContext} from "react";
import CountContext from "../CountContext";
import GreatGreatGrandChild from "./GreatGreatGrandChild";

function GreatGrandChild() {
    const {count, increment}  = useContext(CountContext );
    return (
        <div style={{border: '4px solid #7FDBFF', margin: '1rem'}}>
            <p>I'm a great-grandchild</p>
            <p>Count is: {count}</p>
            <button  onClick={increment}>Increment Count</button>
            <GreatGreatGrandChild/>
        </div>
    );
}

export default GreatGrandChild;
