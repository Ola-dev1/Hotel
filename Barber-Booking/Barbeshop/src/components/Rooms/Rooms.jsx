import React, { useState } from "react";
import RoomsCSS from "../Rooms/Rooms.module.css";

const Rooms = () => {
  const [email, setEmail] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false); // loading state
  const [isBooked, setIsBooked] = useState(false); // <-- new state for thank you

  const handlePayment = (email, amount, roomType, checkIn, checkOut) => {
    if (!email) {
      alert("Please enter your email before booking.");
      return;
    }
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    setIsProcessing(true);

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
              setIsProcessing(false);
            },
            callback: function (response) {
              alert(
                `Payment successful. Transaction ref: ${response.reference}`
              );

              // Save booking to backend
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
                    setIsBooked(true); // <-- show thank you message
                  } else {
                    alert("Failed to save booking: " + bookingResult.message);
                  }
                  setIsProcessing(false);
                })
                .catch((error) => {
                  console.error("Error saving booking:", error);
                  alert("Error saving booking.");
                  setIsProcessing(false);
                });
            },
          });

          handler.openIframe();
        } else {
          alert("Payment initialization failed.");
          setIsProcessing(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
        setIsProcessing(false);
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

  // Reset everything to allow a new booking
  const resetBooking = () => {
    setIsBooked(false);
    setSelectedRoom(null);
    setEmail("");
    setCheckIn("");
    setCheckOut("");
    setTotalPrice(0);
  };

  if (isBooked) {
    // Show thank you message instead of booking form
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Thank You for Your Booking!</h2>
        <p>
          Your reservation has been confirmed. A confirmation email has been
          sent to {email}.
        </p>
        <button
          onClick={resetBooking}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Book Another Room
        </button>
      </div>
    );
  }

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
                  <p>N170,000/N</p>
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
                    onClick={() => handleSelectRoom("Deluxe Room", 170000)}
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

      {selectedRoom && (
        <div className={RoomsCSS.card_container2}>
          <h2>
            Booked: <span>{selectedRoom.name}</span>
          </h2>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Check In:
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>
              Check Out:
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>
          </div>

          <button onClick={handleCalculatePrice} disabled={isProcessing}>
            Calculate Total Price
          </button>

          {totalPrice > 0 && (
            <div style={{ marginTop: "10px" }}>
              <p>
                Total Price for stay:{" "}
                <strong>N{totalPrice.toLocaleString()}</strong>
              </p>

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
                disabled={isProcessing}
              >
                {isProcessing ? "Processing Payment..." : "Pay Now"}
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setSelectedRoom(null);
              setCheckIn("");
              setCheckOut("");
              setTotalPrice(0);
              setIsProcessing(false);
            }}
            style={{ marginTop: "20px" }}
            disabled={isProcessing}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Rooms;
