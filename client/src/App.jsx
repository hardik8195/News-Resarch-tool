import "./App.css"
import Main from "./components/main/Main"
import Menubar from "./components/menubar/Menubar"
function App() {

  return (
    <>
      <div class="container">
        <div class="navbar">NEWS RESEARCH TOOL</div>
        <div class="content">
          <div class="menubar"><Menubar /></div>
          <div class="main-page"><Main /></div>
        </div>
      </div>
    </>
  )
}

export default App
