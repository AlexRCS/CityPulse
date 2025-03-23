import { useEffect } from 'react';
import './profile-options.css';
import { useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../../../Services/user/user-obj';

function ProfileOptions({ openState, setOpen, containerRef }) {
  const navigate = useNavigate();
  const { userData } = useUserDataContext();

  const NavigateLogin = () => {
    navigate(`/Login`);
  };
  const NavigateProfile = () => {
    navigate(`/UserProfile`);
  };

  useEffect(() => {
    const handleClickOut = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOut);
    return () => document.removeEventListener('mousedown', handleClickOut);
  }, [setOpen]);

  return (
    <div ref={containerRef}>
      <ul className={`profile-selection ${openState}`}>
        {userData ? (
          <>
            <li>
              <button className={`profile-item ${openState}`} onClick={NavigateProfile}>
                <i className="fa-solid fa-user" /> Perfil
              </button>
            </li>
            <li>
              <button className={`profile-item ${openState}`}>
                <i className="fa-solid fa-file" /> Documentos
              </button>
            </li>
            <li>
              <button className={`profile-item ${openState}`}>
                <i className="fa-solid fa-gear" /> Configurações
              </button>
            </li>
            <li>
              <button className={`profile-item ${openState}`}>
                <i className="fa-solid fa-right-to-bracket fa-flip-horizontal" /> Sair
              </button>
            </li>
          </>
        ) : (
          <li>
            <button className={`profile-item ${openState}`} onClick={NavigateLogin}>
              <i className="fa-solid fa-right-to-bracket" /> Entrar
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ProfileOptions;
