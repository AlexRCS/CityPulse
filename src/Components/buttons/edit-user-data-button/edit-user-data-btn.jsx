import { useState } from "react"
import './edit-user-data-btn.css'
import UserProfile from "../../../Pages/Profile/User-Profile"

function EditUserDataBtn({handleEdit}) {



    return (
        <>
            <button className="edit-btn" onClick={handleEdit}><i class="fa-solid fa-pen"></i></button>
        </>
    )
}

export default EditUserDataBtn
