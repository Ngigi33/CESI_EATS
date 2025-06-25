import React, { useContext, useEffect } from "react";
import './Verify.css'
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderID = searchParams.get("orderID");

    //console.log(success,orderID);
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post("http://localhost:3001/api/orders/verify",{ success, orderID });

        if (response.data.success) {
            navigate("/Myorders");
            console.log(success);
        }
        else {
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify