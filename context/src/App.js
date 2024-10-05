import React from "react";
import './App.css';
import Child from "./Family/Child";
import NavBar from "./NavBar";
import ThemeProvider from "./ThemeProvider";

function App() {


  return (
    <div className="App">
        <ThemeProvider>
            <NavBar />
            <Child />
        </ThemeProvider>


    </div>
  );
}

export default App;
