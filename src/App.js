import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginUser } from './components/user-login';
import { RegisterUser } from './components/register-user';
import { useCookies } from 'react-cookie';
import { UserDhasbord2 } from './components/UserDashbord1';
import { ProfileUser } from './components/Profile';

function App() {

  const [cookie, setcookie, removecookie] = useCookies('userid');

  return (
    <div className="main ">
      <BrowserRouter>

        <section className='text-center'>

          {
            (cookie['userid'] == undefined) ?
              <header>
                <h1 className=' text-center title'>To Do</h1>
                <p className=' text-center p'>Your Appointments Organizer</p>
                <div className='mt-3'>
                  <Link to="/login" className='btn btn-success me-5  ps-4 pe-4 p-2 '>Existing User Signin</Link>
                  <Link to="register" className='btn btn-light ps-4 pe-4 p-2'>New User Register</Link>
                </div>
              </header>
              :
              <div>   </div>
          }
        </section>
        <Routes>
          <Route path='login' element={<LoginUser />} />
          <Route path='register' element={<RegisterUser />} />
          <Route path='dashbord' element={<UserDhasbord2/>}>
            
          </Route> 
          <Route path='profile' element={<ProfileUser/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
