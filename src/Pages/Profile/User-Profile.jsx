import { useUserDataContext } from "../../Services/user/user-obj"

import './User-Profile.css'


function UserProfile() {

    const { userData } = useUserDataContext()

    return (
        <section className="user-profile-container">
            <h2>Dados Pessoais</h2>
            <div>
                <input type="text" placeholder={`${userData.name}`} />
                <input type="text" placeholder={`${userData.lastName}`} />
            </div>
            <div>
                <input type="text" placeholder={`${userData.email}`} />
                <input type="text" placeholder={`${userData.phone}`} />
            </div>
            <div>
                <input type="password"  placeholder={`${userData.password}`} />
            </div>
        </section>
    )
}

export default UserProfile
