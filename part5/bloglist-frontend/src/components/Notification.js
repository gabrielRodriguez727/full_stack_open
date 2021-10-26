import React from "react";

const Notification = ({ type, message }) => {


    return message ? (<div>
        {message}
    </div>) : ''
}

export default Notification