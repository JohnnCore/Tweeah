import { FormEvent, ChangeEvent,useState, ReactElement } from 'react'
import useAuth from '../../hooks/useAuth';
import { login } from '../../services/auth';

import { useNavigate } from 'react-router-dom';

const LoginPage = (): ReactElement => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: '',
    password: ''
  });

  const { dispatch, AUTH_ACTIONS } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ dispatch, email: input.email, password: input.password, AUTH_ACTIONS })
    navigate('/');
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <form className="mb-md-5 mt-md-4 pb-5" onSubmit={handleSubmit}>

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div className="form-outline form-white mb-4">
                    <label className="htmlForm-label" htmlFor="typeEmailX">Email</label>
                    <input type="email" name='email' id="typeEmailX" className="form-control form-control-lg" onChange={handleChange} />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input type="password" name='password' id="typePasswordX" className="form-control form-control-lg" onChange={handleChange}/>
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                </form>

                <div>
                  <p className="mb-0">Don't have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;