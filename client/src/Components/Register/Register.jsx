import React , {useState} from 'react'
import './Register.css'
import '../../App.css'


import {Link, useNavigate}  from 'react-router-dom'

import Axios from 'axios'

// Import our assets
import video from '../LoginAssets/video.mp4'
import logo from '../LoginAssets/imagen.png'

//Imported icons
import {FaUserShield} from 'react-icons/fa'
import {BsFillShieldLockFill} from 'react-icons/bs'
import {AiOutlineSwapRight} from 'react-icons/ai'
import {MdMarkEmailRead} from 'react-icons/md'

const Register = () => {
  // UserState to hold our inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigateTo = useNavigate()

 // Onclick let us get what the user has entered
 const createUser = (e)=>{
  e.preventDefault()
  // we shall require Axios to create an API that connects to the server
  // lets install it 
  Axios.post('http://localhost:3002/register' , {
    // create variable to send to the server through the route
    Email: email,
    Password: password
  }).then(()=>{
    // On register let us redirect the user to the login page
    navigateTo('/')


    // Let us clear the fields too
    setEmail('')
    setPassword('')

  })
 }

  return (
    <div className='registerPage flex'>
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Create And Sell Extraordinary Products</h2>
            <p>Adopt the peace of nature!</p>
          </div>


          <div className="footerDiv flex">
            <span className="text">Have an account?</span>
            <Link to={'/'}>
            <button className="btn">Login</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h3>Let Us Know You</h3>
          </div>

          <form action="" className='form grid'>
            
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Ingresar Email' 
                onChange={(event)=>{
                  setEmail(event.target.value)
                }}/>
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Ingresar password' 
                onChange={(event)=>{
                  setPassword(event.target.value)
                }}
                />
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={createUser}>
              <span>Crear Cuenta</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

        
          </form>
        </div>
      </div>

    </div>
  )
}

export default Register
