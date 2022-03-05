import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"
import ReactDOM from "react-dom";
import React from "react";
import { JsxElement } from "typescript";
import { ObservableObjectAdministration } from "mobx/dist/internal";

interface ReactiveRenderObj {
  render: () => any
}

export default function ReactiveRender(obj: ReactiveRenderObj){
  try {
    makeAutoObservable(obj);
  } catch (e: any){
    console.log(e.message);
  }
  let ObservedView = observer(() => {
    return obj.render();
  });
  return (
    <ObservedView />
  )
}