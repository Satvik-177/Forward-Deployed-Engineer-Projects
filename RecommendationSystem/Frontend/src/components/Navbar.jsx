import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        CineMatch
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#trending">Trending</a>
        <a href="#recommendations">Recommendations</a>
      </div>
    </nav>
  );
}

export default Navbar;


