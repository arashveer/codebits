import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { SharedCodeViewer } from "./components/sharedcodeviewer/SharedCodeViewer";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snippet/:codeid" element={<SharedCodeViewer />} />
    </Routes>
  );
}
