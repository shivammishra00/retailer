"use client"
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.module.css'
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

/////  here type define   /////
interface LoginType {
  email: string;
  password: string;
}

export default function Home() {
  
  const [loginData, setloginData] = useState<LoginType>({
    email: "shivank@gmail.com",
    password: "12345678"
  });
  const [error, seterror] = useState<string | null>(null)

  const router = useRouter()
  
  axios.defaults.withCredentials = true;
  
  const handleSubmit = async (e:FormEvent) =>{
    e.preventDefault()
    try{
      await axios.post(`http://localhost:5000/api/retailer/login`, loginData)
    .then(res =>{
      console.log(res)
      if(res.data.loginStatus){
        toast.success(res.data.Message)
        router.push(`/dashboard`)
      }
      else{
        // toast.success(res.data.Error)
        seterror(res.data.Error)
      }
    })
    .catch(err => console.log(err))
    } catch(err){
       console.log(err)
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className=' p-3 rounded w-25 border loginForm'>
      
        {/* <p> error ko show kara liya </p> */}
        <div className='text-danger error'>
            {error}
        </div>

        <h3 className='text-center mt-3 loginHeading'>Retailer Login</h3>
        <Form  className='mt-3' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" 
            name='email' value={loginData.email}
            onChange={(e)=>setloginData({...loginData, [e.target.name]: e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter yourPassword" name='password'  value={loginData.password}
            onChange={(e)=>setloginData({...loginData, [e.target.name]: e.target.value})}
            />
          </Form.Group>

          <button type='submit' className='btn btn-success w-100 rounded-0 mb-2'>Sign in</    button>

          <p 
            className='text-center'>Not a member ? <Link href="/signup" className='text-decoration-none' >Signup hear</Link> 
          </p>
          <p className='text-center mt-0'>Log in to access your account</p>
        </Form>
    </div>

</div>
  )
}


