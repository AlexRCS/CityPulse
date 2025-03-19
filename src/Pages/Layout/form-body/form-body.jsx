import * as React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../footer/footer";
import './form-body.css'

function FormBody({ children }) {
    const childrenArray = React.Children.toArray(children);
    const formContentChild = childrenArray.find(child => child.props['data-form-content-child'] === '1');

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <>
            <section className='form-header' onClick={handleNavigate}>
                <h1>CityPulse</h1>
            </section>
            <section>
                {formContentChild}
            </section>
            <Footer />
        </>
    )
}

export default FormBody
