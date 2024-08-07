import {BiSolidDonateHeart} from "react-icons/bi";
import "./Donate.css"
import React, {useContext, useState} from "react";
import {FaGooglePay, FaIdeal, FaPaypal} from "react-icons/fa";
import {AuthContext} from "../context/AuthContext.jsx";
import {useParams} from "react-router-dom";
import axios from "axios";

function Donate() {
const [amount, setAmount] = React.useState(25);
const [frequency, setFrequency] = React.useState("Once");
const [paymentMethod, setPaymentMethod] = React.useState("");
const [completed, toggleCompleted] = React.useState(false);
const {loggedIn, user} = useContext(AuthContext);
const {shelter} = useParams();

function processPayment(e) {
    e.preventDefault()
    handleSubmit().then(r => toggleCompleted(true));
}

async function handleSubmit() {
    try {
        const result = await axios.post("http://localhost:8080/donate",
            {
                amount: amount,
                frequency: frequency,
                sending: user.username,
                receiving: shelter,
            }, {});
        console.log(result);
    } catch (e) {
        console.error(e);
    }
}

    const TypeUnset = (e) => {
        e.preventDefault();
        setPaymentMethod("");
    }
    const TypeSetPayPal = (e) => {
        e.preventDefault();
        setPaymentMethod("PayPal");
    }
    const TypeSetIdeal = (e) => {
        e.preventDefault();
        setPaymentMethod("IDEAL");
    }
    const TypeSetGooglePay = (e) => {
        e.preventDefault();
        setPaymentMethod("GooglePay");
    }


    return ( <div className="container-donation">
            {(!completed) && <>
            <div className="field">
        <BiSolidDonateHeart className="donation-icon"/>
                {(loggedIn && user) && <>Donating to {shelter} as {user.username}</>}
                {!(loggedIn && user) && <>Donating to {shelter} as Anonymous</>}
            </div>
            <form onSubmit={processPayment}>
                <div className="field">
                    <div className="field">
                        Amount: € <input type="number" onChange={(e) => setAmount(e.target.valueAsNumber)} value={amount}/>,-
                    </div>
                    <div className="field">
                        Frequency: <select onChange={(e) => setFrequency(e.target.value)}>
                        <option>Once</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Yearly</option>
                    </select>
                    </div>
                </div>
                <div className="field">
                Select payment method:

                <div className="category-buttons-method">
                    <div className="container-column">
                    {paymentMethod === "PayPal" && <button className="on" onClick={TypeUnset}>
                        <FaPaypal className="payment-icon"/> </button>}
                    {!(paymentMethod === "PayPal") && <button className="off" onClick={TypeSetPayPal}>
                        <FaPaypal className="payment-icon"/> </button>}
                        Paypal
                    </div>

                    <div className="container-column">
                    {paymentMethod === "IDEAL" && <button className="on" onClick={TypeUnset}>
                        <FaIdeal className="payment-icon"/></button>}
                    {!(paymentMethod === "IDEAL") && <button className="off" onClick={TypeSetIdeal}>
                        <FaIdeal className="payment-icon"/></button>}
                        IDEAL
                    </div>

                    <div className="container-column">
                    {paymentMethod === "GooglePay" && <button className="on" onClick={TypeUnset}>
                        <FaGooglePay className="payment-icon"/> </button>}
                    {!(paymentMethod === "GooglePay") && <button className="off" onClick={TypeSetGooglePay}>
                        <FaGooglePay className="payment-icon"/> </button>}
                        Google Pay
                    </div>
                </div>
                </div>
                <button type="submit"> Continue to Payment -> </button>
            </form>
            </>}

            {completed && <div className="field">Payment successful! Thank you for donating €{amount},- to {shelter}!</div>}
        </div>
    )
}

export default Donate;