import Contact from '../component/contact'
import Label from '../component/labels'
import Home from '../component/seatdisplay'
import './App.css'

function App() {

  return (
    <div className='main-container'>
      <div className="heading">
        <h1>Train Seat Booking Menu</h1></div>
      <div className="components">
        <Label />
        <Home />
        <Contact />
      </div>
    </div>
  )
}

export default App
