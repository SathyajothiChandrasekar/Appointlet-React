import React from "react";
import { IoIosWarning } from "react-icons/io";

export const DeleteEvents = ({ delhideandshown, deleteevents }) => {
    return (
        <div className="deleteContainer">
            <div className="deletePopupContainer">
                <IoIosWarning className="warning" />
                <h3 className="deleteTitle">you are about to delete, are you sure?</h3>
                <div className="delButton">
                    <button className="deleteCancel" onClick={delhideandshown}>
                        cancel
                    </button>
                    <button className="deleteDelete" onClick={deleteevents}>
                        delete
                    </button>
                </div>
            </div>
        </div>
    );
}
