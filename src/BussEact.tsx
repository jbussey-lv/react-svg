import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"
import Timer from './Timer';
import ReactDOM from "react-dom";
import React from "react";

interface BussEactObj {
  render: () => any
}

export default function BussEact(obj: BussEactObj, containerId: string) {
  let observableObj = makeAutoObservable(obj);
  let ObserverView = observer(() => {
    return observableObj.render();
  });
  ReactDOM.render(
    <React.StrictMode>
      <ObserverView />
    </React.StrictMode>,
    document.getElementById(containerId)
  );
}
