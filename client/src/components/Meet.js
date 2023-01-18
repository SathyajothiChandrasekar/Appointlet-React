import React from 'react'
import { GoPrimitiveDot } from "react-icons/go";
import { FaRegUser, FaRegClock } from "react-icons/fa";

export const Meet = ({ eventName, createdBy, durationOfMeet }) => {
    return (
        <>  <h2 className='meetName'><GoPrimitiveDot className='meetNameIcon' />{eventName}</h2>
            <hr></hr>
            <h3 className='meetCreatedBy'><FaRegUser className='meetCreatedByIcon' />{createdBy}</h3>
            <h3 className='meetDuration'><FaRegClock className='meetDurationIcon' />{durationOfMeet}minutes</h3>
        </>

    )
}