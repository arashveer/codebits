import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { SharedCodeViewer } from "./components/sharedcodeviewer/SharedCodeViewer";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snippet/:codeid" element={<SharedCodeViewer />} />
    </Routes>
  );
}
