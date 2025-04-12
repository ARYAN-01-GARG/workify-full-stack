import { Route, Routes } from "react-router-dom"
import LandingPage from "./components/landing-page/LandingPage"

function App() {
  return (
    <>
      <Routes>
        <Route index  element={<LandingPage/>}/>
      </Routes>
    </>
  )
}

export default App