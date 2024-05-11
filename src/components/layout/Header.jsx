import { Fragment } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../features/users/userSlice";
import toast from "react-hot-toast";

function Header() {
  const {user, loading} = useSelector(state => state.user);
  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOutUser());
    toast.success('Logged out successfully');
  }
  return (
    <Fragment>
      <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/logo.png" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

          <Link to="/cart" style={{ textDecoration: 'none' }} className="mx-2">
            <span id="cart" className="ml-3">Cart</span>
            <span className="ml-1" id="cart_count">{cart.length}</span>
          </Link>

        {user ? (
          <div className="ml-4 dropdown d-inline">
            <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" area-expanded="false" style={{borderColor: 'transparent'}}>
              <figure className="avatar avatar-nav">
                <img src={user.avatar && user.avatar.url} alt={user && user.name} className="rounded-circle" />
              </figure>
              <span className="me-4">{user && user.name}</span>
            </button>

            <ul className="dropdown-menu">
              {user.isAdmin && (
                <li><Link to='/dashboard' className="dropdown-item">Dashboard</Link></li>
              )}
                <li><Link to='/orders/me' className="dropdown-item">Order</Link></li>
                <li><Link to='/me' className="dropdown-item">Profile</Link></li>
                <li><Link to='/' className="dropdown-item text-danger" onClick={handleLogOut}>Logout</Link></li>
            </ul>
          </div>

        ) : !loading && (
          <Link to="/login"><button className="btn" id="login_btn">Login</button></Link>
        )}
        
      </div>
    </nav>
    </Fragment>
  );
}

export default Header;
