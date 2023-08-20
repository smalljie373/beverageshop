import PropType from 'prop-types';
function NavBar({children}) {
    return (
        <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container">
    <span className="navbar-brand mb-0 h1">倉田飲料鋪</span>
      {children}
  </div>
</nav>
    )
}
NavBar.propTypes = {
    children: PropType.object,
  }
export default NavBar