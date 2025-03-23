import { useState } from 'react'
import EditUserDataBtn from '../../Components/buttons/edit-user-data-button/edit-user-data-btn'
import { useUserDataContext } from '../../Services/user/user-obj'
import Aside from '../Layout/aside/aside'
import FormBody from '../Layout/form-body/form-body'

import './User-Profile.css'
import SaveDataBtn from '../../Components/buttons/save-data-btn/save-data-btn'


function UserProfile() {

    const { userData } = useUserDataContext()

    const [enable, setEnable] = useState(true)

    const handleEdit = () => {
        setEnable((prev) => (prev === true ? false : true));
    }

    return (
        <FormBody>
            <section className="user-profile-container" data-form-content-child='1'>
                <h2>Dados Pessoais</h2>
                <EditUserDataBtn handleEdit={handleEdit} />
                <div>
                    <div className='edit-content'>
                        <label htmlFor="name">Nome</label>
                        <input type="text" name='name' value={`${userData.name}`} disabled={enable} />
                    </div>
                    <div className='edit-content'>
                        <label htmlFor="lastName">Apelido</label>
                        <input type="text" name='lastName' value={`${userData.lastname}`} disabled={enable} />
                    </div>
                </div>
                <div>
                    <div className='edit-content'>
                        <label htmlFor="email">e-mail</label>
                        <input type="text" name='email' value={`${userData.email}`} disabled={enable} />
                    </div>
                    <div className='edit-content'>
                        <label htmlFor="contact">Contato</label>
                        <input type="text" name='contact' value={`${userData.phone}`} disabled={enable} />
                    </div>
                </div>
                <div>
                    <div className='edit-content'>
                        <label htmlFor="password">Senha</label>
                        <input id='profile-password' name='password' type="password" value={`${userData.password}`} disabled={enable} />
                    </div>
                    <div className='save-cancel'>
                        <SaveDataBtn />
                        <button>Cancelar</button>
                    </div>
                </div>
            </section>
        </FormBody>
    )
}

export default UserProfile
