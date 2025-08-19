import React, { useState } from "react";
import RoomsCSS from "../Rooms/Rooms.module.css";

const Rooms = () => {
  const [email, setEmail] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false); // <-- New loading state

  const handlePayment = (email, amount, roomType, checkIn, checkOut) => {
    if (!email) {
      alert("Please enter your email before booking.");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    setIsProcessing(true); // <-- Start loading

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount, roomType, checkIn, checkOut }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status && window.PaystackPop) {
          const { reference } = data.data;

          const handler = window.PaystackPop.setup({
            key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
            email,
            amount: amount * 100, // amount in kobo
            ref: reference,
            onClose: () => {
              alert("Payment window closed.");
              setIsProcessing(false); // <-- Stop loading if user closes payment
            },
            callback: function (response) {
              alert(
                `Payment successful. Transaction ref: ${response.reference}`
              );

              // Save booking to backend after payment success
              fetch(`${import.meta.env.VITE_API_BASE_URL}/api/book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  amount: totalPrice,
                  roomType: selectedRoom.name,
                  reference: response.reference,
                  checkIn,
                  checkOut,
                }),
              })
                .then((res) => res.json())
                .then((bookingResult) => {
                  if (bookingResult.success) {
                    alert(
                      "Booking saved successfully! Confirmation email sent."
                    );
                    // Reset form
                    setSelectedRoom(null);
                    setCheckIn("");
                    setCheckOut("");
                    setTotalPrice(0);
                  } else {
                    alert("Failed to save booking: " + bookingResult.message);
                  }
                  setIsProcessing(false); // <-- Stop loading after booking save attempt
                })
                .catch((error) => {
                  console.error("Error saving booking:", error);
                  alert("Error saving booking.");
                  setIsProcessing(false); // <-- Stop loading on error
                });
            },
          });

          handler.openIframe();
        } else {
          alert("Payment initialization failed.");
          setIsProcessing(false); // <-- Stop loading if init failed
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
        setIsProcessing(false); // <-- Stop loading on fetch error
      });
  };

  const calculateNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate - inDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSelectRoom = (roomName, roomPrice) => {
    if (!email) {
      alert("Please enter your email before booking.");
      return;
    }
    setSelectedRoom({ name: roomName, price: roomPrice });
    setCheckIn("");
    setCheckOut("");
    setTotalPrice(0);
  };

  const handleCalculatePrice = () => {
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    const nights = calculateNights(checkIn, checkOut);
    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    setTotalPrice(nights * selectedRoom.price);
  };

  return (
    <div id="rooms" className={`${RoomsCSS.Rooms_container} section`}>
      <small className="section__Heading">Luxury Suites</small>
      <h2 className="section__Tittle">
        Our Best <span>Rooms</span>
      </h2>

      {/* Email input */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
          disabled={!!selectedRoom}
        />
      </div>

      {!selectedRoom && (
        <div className={RoomsCSS.cards}>
          {/* Rooms list */}
          <div className={RoomsCSS.card_container}>
            <div className={RoomsCSS.card}>
              <div className={`${RoomsCSS.card_front} ${RoomsCSS.card_front1}`}>
                <button>Junior Suite</button>
              </div>
              <div className={RoomsCSS.card_back}>
                <div className={RoomsCSS.price}>
                  <p>N120,000/N</p>
                </div>
                <div className={RoomsCSS.card_content}>
                  <h3>Junior Suite</h3>
                  <p>- Daily Cleaning</p>
                  <p>- Home Service</p>
                  <p>- House Keeping</p>
                  <p>- Wifi & Parking</p>
                </div>
                <div className={RoomsCSS.Booknow}>
                  <button
                    onClick={() => handleSelectRoom("Junior Suite", 120000)}
                  >
                    Book Now
                  </button>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Twin Room */}
          <div className={RoomsCSS.card_container}>
            <div className={RoomsCSS.card}>
              <div className={`${RoomsCSS.card_front} ${RoomsCSS.card_front2}`}>
                <button>Twin Room</button>
              </div>
              <div className={RoomsCSS.card_back}>
                <div className={RoomsCSS.price}>
                  <p>N140,000/N</p>
                </div>
                <div className={RoomsCSS.card_content}>
                  <h3>Twin Room</h3>
                  <p>- Daily Cleaning</p>
                  <p>- Home Service</p>
                  <p>- House Keeping</p>
                  <p>- Wifi & Parking</p>
                </div>
                <div className={RoomsCSS.Booknow}>
                  <button onClick={() => handleSelectRoom("Twin Room", 140000)}>
                    Book Now
                  </button>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Quad Room */}
          <div className={RoomsCSS.card_container}>
            <div className={RoomsCSS.card}>
              <div className={`${RoomsCSS.card_front} ${RoomsCSS.card_front3}`}>
                <button>Quad Room</button>
              </div>
              <div className={RoomsCSS.card_back}>
                <div className={RoomsCSS.price}>
                  <p>N150,000/N</p>
                </div>
                <div className={RoomsCSS.card_content}>
                  <h3>Quad Room</h3>
                  <p>- Daily Cleaning</p>
                  <p>- Home Service</p>
                  <p>- House Keeping</p>
                  <p>- Wifi & Parking</p>
                </div>
                <div className={RoomsCSS.Booknow}>
                  <button onClick={() => handleSelectRoom("Quad Room", 150000)}>
                    Book Now
                  </button>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Deluxe Room */}
          <div className={RoomsCSS.card_container}>
            <div className={RoomsCSS.card}>
              <div className={`${RoomsCSS.card_front} ${RoomsCSS.card_front4}`}>
                <button>Deluxe Room</button>
              </div>
              <div className={RoomsCSS.card_back}>
                <div className={RoomsCSS.price}>
                  <p>N200,000/N</p>
                </div>
                <div className={RoomsCSS.card_content}>
                  <h3>Deluxe Room</h3>
                  <p>- Daily Cleaning</p>
                  <p>- Home Service</p>
                  <p>- House Keeping</p>
                  <p>- Wifi & Parking</p>
                </div>
                <div className={RoomsCSS.Booknow}>
                  <button
                    onClick={() => handleSelectRoom("Deluxe Room", 200000)}
                  >
                    Book Now
                  </button>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Exclusive Room */}
          <div className={RoomsCSS.card_container}>
            <div className={RoomsCSS.card}>
              <div className={`${RoomsCSS.card_front} ${RoomsCSS.card_front5}`}>
                <button>Exclusive Room</button>
              </div>
              <div className={RoomsCSS.card_back}>
                <div className={RoomsCSS.price}>
                  <p>N220,000/N</p>
                </div>
                <div className={RoomsCSS.card_content}>
                  <h3>Exclusive Room</h3>
                  <p>- Daily Cleaning</p>
                  <p>- Home Service</p>
                  <p>- House Keeping</p>
                  <p>- Wifi & Parking</p>
                </div>
                <div className={RoomsCSS.Booknow}>
                  <button
                    onClick={() => handleSelectRoom("Exclusive Room", 220000)}
                  >
                    Book Now
                  </button>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Room */}
          <div className={RoomsCSS.card_container}>
            <div className={RoomsCSS.card}>
              <div className={`${RoomsCSS.card_front} ${RoomsCSS.card_front6}`}>
                <button>Personal Room</button>
              </div>
              <div className={RoomsCSS.card_back}>
                <div className={RoomsCSS.price}>
                  <p>N300,000/N</p>
                </div>
                <div className={RoomsCSS.card_content}>
                  <h3>Personal Room</h3>
                  <p>- Daily Cleaning</p>
                  <p>- Home Service</p>
                  <p>- House Keeping</p>
                  <p>- Wifi & Parking</p>
                </div>
                <div className={RoomsCSS.Booknow}>
                  <button
                    onClick={() => handleSelectRoom("Personal Room", 300000)}
                  >
                    Book Now
                  </button>
                  <i className="ri-arrow-right-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking form after room selection */}
      {selectedRoom && (
        <div style={{ marginTop: "20px" }}>
          <h3>Booking {selectedRoom.name}</h3>

          <label>
            Check-In Date:
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </label>

          <label style={{ marginLeft: "15px" }}>
            Check-Out Date:
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </label>

          <button
            style={{ marginLeft: "15px" }}
            onClick={handleCalculatePrice}
            disabled={isProcessing} // disable during processing
          >
            Calculate Price
          </button>

          {totalPrice > 0 && (
            <div style={{ marginTop: "10px" }}>
              <p>Total Price for stay: ₦{totalPrice.toLocaleString()}</p>
              <button
                onClick={() =>
                  handlePayment(
                    email,
                    totalPrice,
                    selectedRoom.name,
                    checkIn,
                    checkOut
                  )
                }
                disabled={isProcessing} // disable button while processing
              >
                {isProcessing ? "Processing..." : "Pay Now"}
              </button>
            </div>
          )}

          <button
            style={{
              marginTop: "10px",
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => {
              setSelectedRoom(null);
              setCheckIn("");
              setCheckOut("");
              setTotalPrice(0);
            }}
            disabled={isProcessing} // disable cancel if processing
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Rooms;
