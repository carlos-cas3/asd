import React , {useState} from 'react'
import './Login.css'
import '../../App.css'


import {Link , useNavigate}  from 'react-router-dom'

import Axios from 'axios'

// Import our assets
import video from '../LoginAssets/video.mp4'
import logo from '../LoginAssets/imagen.png'

//Imported icons
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import { useEffect } from 'react'

const Login = () => {

  // Usestate Hook to stare inputs 
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const navigateTo = useNavigate()

  // let us now show the message to the user
  const [loginStatus, setLoginStatus] = useState('')
  const [statusHolder, setStatusHolder] = useState('message')


  const loginUser = (e)=>{
    // lets prevent submitting 
    e.preventDefault();

    // we shall require Axios to create an API that connects to the server
    // lets install it 
    Axios.post('http://localhost:3002/login' , {
      // create variable to send to the server through the route
      LoginEmail: loginEmail,
      LoginPassword: loginPassword
    }).then((response)=>{
      console.log()
      // i want to catch the response first  - We have data successully from
      // the database and we can catch an error if the credentials are wrong
      if(response.data.message || LoginEmail == '' || LoginPassword == ''){
        // if credentialñ dont match
        navigateTo('/')  // so we shall navigate to the same login page
        console.log(response.data.message)
      }
      else{
        navigateTo('/dashboard') // if the credentials match we shall navigate
        // to the dashboard
      }
    })
   }

   useEffect(()=>{
    if(loginStatus!== ''){
      setStatusHolder('showMessage')
      setTimeout(()=>{
        setStatusHolder('message')
      }, 4000);
    }
   }, {loginStatus})

   const onSubmit = ()=>{
    setLoginEmail('')
    setLoginPassword('')
   }

  return (
    <div className='loginPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>


          <div className="footerDiv flex">
            <span className="text">¿No posees una cuenta?</span>
            <Link to={'/register'}>
            <button className="btn">Crear Cuenta</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>¡Bienvenido!</h3>
          </div>

          <form action="" className='form grid' onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="email" id='email' placeholder='Ingresar Correo'
                onChange={(event)=>{
                  setLoginEmail(event.target.value)
                }}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Contraseña</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Ingresar Contraseña'
                onChange={(event)=>{
                  setLoginPassword(event.target.value)
                }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={loginUser}>
              <span>Iniciar Sesion</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
