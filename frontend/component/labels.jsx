import seat from "../src/assets/seats.png"
const Label = () => {
    return (

        <div className="note-container">
            <img id="img1" src={seat} />
            <span>Available Seat</span>
            <img id="img2" src={seat} />
            <span>Booked Seat</span>
            <img id="img3" src={seat} />
            <span>Seats Booked for you.</span>
        </div>
    )
}
export default Label;