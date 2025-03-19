import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./nav-button.css";

function NavButton() {
  const location = useLocation();
  const [navItems] = useState([
    { name: "Pagina Principal", id: 1, path: "/" },
    { name: "Mobilidade Urbana", id: 2, path: "/Mobility" },
    { name: "Turismo e Lazer", id: 3, path: "/Tourism" },
    { name: "Serviços ao Cidadão", id: 4, path: "/Services" },
  ]);

  const [activeId, setActiveId] = useState(1);

  useEffect(() => {
    const currentNav = navItems.find((item) => item.path === location.pathname);
    if (currentNav) {
      setActiveId(currentNav.id);
    }
  }, [location, navItems]);

  const handleNav = (id) => {
    setActiveId(id);
  };

  return (
    <>
      {navItems.map((item) => (
        <Link key={item.id} to={item.path}>
          <button
            className={`nav-btn ${activeId === item.id ? "active" : ""}`}
            onClick={() => handleNav(item.id)}
          >
            {item.name}
          </button>
        </Link>
      ))}
    </>
  );
}

export default NavButton;
