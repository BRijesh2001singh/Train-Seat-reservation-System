import { useEffect, useState } from "react";
import axios from "axios";
import seat from "../src/assets/seats.png"
const Home = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [seatMap, setSeatMap] = useState([]);
    const [booked, setSeatBooked] = useState([]);
    const [reqSeats, setReqSeats] = useState();
    const [error, setError] = useState();
    const [update, setUpdate] = useState();
    let cnt = 1;
    //handle user input and book seats
    const bookSeats = async (e) => {
        e.preventDefault();
        setError("");
        setUpdate("");
        if (reqSeats <= 0 || reqSeats > 7) {
            setError("At max 7 seats reservation allowed at a time.");
            return;
        }
        try {
            const res = await axios.post(`${apiUrl}/seatreservation`, {
                reqseats: reqSeats,
            }, { withCredentials: true });
            setUpdate(res.data.message);
            setSeatBooked(res.data.seats);
        } catch (error) {
            console.error("Error booking seats:", error);
            setError(error.response ? error.response.data.message : "Failed to book seats. Please try again.");
        }
    };
    //get available seats to display to user
    const getSeatData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/remainingseats`, { withCredentials: true });

            setSeatMap(res.data.seatmap);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getSeatData();
    }, [])
    useEffect(() => {   /*this is for comparing the previous seatMap with updated seat map after booking seats
        to make sure that seats booked by users are diplayed with different color
        */

        const newSeats = seatMap.map((row, i) => {
            return row.map((seat, j) => {
                if (seat === 0 && booked[i][j] === 1) {
                    return 2;//if there is change in seats than we mark it as 2 for client side only so that we can mark it by different color
                }
                return seat;
            })
        })
        if (JSON.stringify(newSeats) !== JSON.stringify(seatMap)) {//change only if there is difference
            setSeatMap(newSeats);
        }
    }, [booked]);
    if (seatMap) {
        return <div className="loading-comp">
            <h1>Loading</h1>
            <div className="loader"></div>
        </div>
    }
    else {
        return (

            <div className="top-container">
                <form onSubmit={bookSeats}>
                    <input type="number" placeholder="Required Seats" value={reqSeats}
                        onChange={(e) => {
                            setReqSeats(e.target.value);
                            setError("");
                            setUpdate("");
                        }}
                    />
                    <button type="submit">Book</button>
                </form>
                <span className="error-cnt">{error}</span>
                <span className="update-cnt">{update}</span>
                <div className="train">
                    {seatMap.map((row, rowInd) => (
                        <div className="row-container" key={rowInd} style={{ display: "flex" }}>
                            {row.map((seats, seatInd) => (
                                <div className="seat-container" key={seatInd}
                                    style={{
                                        margin: '5px', width: '30px', height: '30px',
                                        backgroundColor: seats === 1 ? 'grey' : seats === 2 ? '#7520ba' : 'transparent'
                                    }}>
                                    <span style={{ color: seats === 0 ? "black" : "white" }}>{cnt++}</span>
                                    <img src={seat} alt="seat-icon" />
                                </div>
                            ))}

                        </div>
                    ))}
                </div>

            </div>

        )
    }
}

export default Home;
