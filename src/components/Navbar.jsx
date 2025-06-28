// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Navbar = () => {
  const sidebarToggleRef = useRef(null);

  useEffect(() => {
    const toggleSidebar = (event) => {
      event.preventDefault();
      document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem(
        'sb|sidebar-toggle',
        document.body.classList.contains('sb-sidenav-toggled')
      );
    };

    const toggleButton = sidebarToggleRef.current;
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleSidebar);
    }

    // Restaurar estado guardado
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      document.body.classList.add('sb-sidenav-toggled');
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', toggleSidebar);
      }
    };
  }, []);

  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <Link className="navbar-brand ps-3" to="/">GresApp</Link>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        ref={sidebarToggleRef}
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" />
          <button className="btn btn-primary" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-user fa-fw"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Activity Log</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
