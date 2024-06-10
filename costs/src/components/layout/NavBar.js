import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import Container from './Container';
import logo from '../../img/logo.png';

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="logo page" />
        </Link>
        <ul className={styles.list}>
          <li className={styles.item}><Link to="/">Home</Link></li>
          <li className={styles.item}><Link to="/projects">Projects</Link></li>
          <li className={styles.item}><Link to="/company">Company</Link></li>
          <li className={styles.item}><Link to="/contact">Contact</Link></li>
        </ul>
      </Container>
    </nav>
  )
}

export default NavBar;
