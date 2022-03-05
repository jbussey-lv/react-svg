import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Box from './Box';
import BoxView from './BoxView';
import { observer } from 'mobx-react-lite';
import { makeAutoObservable, makeObservable } from 'mobx';


let box: Box = new Box();


let ObserverBoxView = observer(BoxView);

let observableBox = makeObservable(box);

setInterval(
  () => {observableBox.incSize()},
  1000
)


function App() {
  return (
    <div className="App">
      in app 
      <ObserverBoxView box={observableBox}/>
    </div>
  );
}

export default App;
