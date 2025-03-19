import NavButton from "../../../Components/Buttons/nav-button/nav-buttons"
import ProfileBtn from "../../../Components/Buttons/profile/profile-btn"
import ProfileOptions from "../../../Components/modals/profile-options/profile-options"

import './nav.css'

function NavBar() {

    // const [isLogged, setIsLogged] = useState('logged-out')

    return (
        <>
            <nav>
                <div className="buttons-area">
                    {
                        Array.from({ length: 1 }).map((_, index) => (
                            <NavButton key={index} />))
                    }
                </div>
                <div className="user-options">
                    <ProfileBtn/>
                    <ProfileOptions/>
                </div>
            </nav>
        </>
    )
}


export default NavBar
