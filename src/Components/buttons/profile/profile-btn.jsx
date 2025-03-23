import { useState, useRef, useEffect } from 'react';
import './profile-btn.css';
import ProfileOptions from '../../modals/profile-options/profile-options';
import { useUserDataContext } from '../../../Services/user/user-obj';

function ProfileBtn() {
  const { userData } = useUserDataContext()
  const [open, setOpen] = useState('');
  const containerRef = useRef(null);



  const handleToggle = () => {
    setOpen((prev) => (prev === 'open' ? '' : 'open'));
  }


  return (
    <div className='profile-nav'>
      <h4>{userData ? userData.name : ''}</h4>
      <div ref={containerRef} >
        <button className="profile log" onClick={handleToggle}>
          <i className="fa-solid fa-user user-options" />
          <i className={`fa-solid fa-play ${open}`} />
        </button>
        <ProfileOptions containerRef={containerRef} openState={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default ProfileBtn;
