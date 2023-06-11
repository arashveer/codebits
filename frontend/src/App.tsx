import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import { SharedCodeViewer } from "./components/sharedcodeviewer/SharedCodeViewer";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snippet/:codeid" element={<SharedCodeViewer />} />
      </Routes>
      <Footer />
    </>
  );
}
