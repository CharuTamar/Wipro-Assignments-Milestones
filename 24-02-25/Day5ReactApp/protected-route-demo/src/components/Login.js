import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setAuth }) => {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = () => {
    setAuth(true); // Mock authentication
    navigate(from, { replace: true }); // Redirect after login
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;