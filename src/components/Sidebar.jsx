import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Módulos</div>

            <Link className="nav-link" to="/cuenta-de-cobro">
              <div className="sb-nav-link-icon"><i className="fas fa-file-invoice-dollar"></i></div>
              Cuenta de Cobro
            </Link>

            <Link className="nav-link" to="/certificados-de-recoleccion">
              <div className="sb-nav-link-icon"><i className="fas fa-certificate"></i></div>
              Certificado de Recolección
            </Link>

            <Link className="nav-link" to="/disposicion-final">
              <div className="sb-nav-link-icon"><i className="fas fa-dumpster"></i></div>
              Disposición Final
            </Link>

            <Link className="nav-link" to="/clientes">
              <div className="sb-nav-link-icon"><i className="fas fa-users"></i></div>
              CRUD Clientes
            </Link>

          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          GresApp Admin
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
