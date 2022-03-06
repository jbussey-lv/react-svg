import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"
import ReactDOM from "react-dom";
import React from "react";
import { JsxElement } from "typescript";
import { ObservableObjectAdministration } from "mobx/dist/internal";

import { configure } from "mobx"

configure({
    enforceActions: "never"
})

interface ReactiveRenderObj {
  render: () => any
}

let objects: any[] = [];

export default function ReactiveRender(obj: ReactiveRenderObj){
  try {
    makeAutoObservable(obj);
  } catch (e: any){
    // no op
  }
  if(!(objects.includes(obj))){
    objects.push(obj);
  }
  let key = objects.findIndex(object => object === obj);
  let ObservedView = observer(() => {
    return obj.render();
  });
  return (
    <ObservedView key={key}/>
  )
}