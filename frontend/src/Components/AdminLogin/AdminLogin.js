import React, { useContext,useState } from 'react'
import {Alert, Avatar, Button, Grid, Paper, TextField, Typography} from '@mui/material'
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import { green} from '@mui/material/colors';
import './adminLogin.css'
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import AuthContext from '../../AuthContext/AuthContext';

function AdminLogin() {
    let {LoginUser,signupSuccessRes,loginErrorRes} = useContext(AuthContext)
    let [email,setEmail] = useState(null)
    let [password,setPassword] = useState(null)
    let [emailError,setEmailError] = useState('')
    let [passwordError,setPasswordError] = useState()
    
    const LoginValidation = (e)=>{
      e.preventDefault()
      const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
     
      if (regEx.test(email)){
        
        {password?LoginUser(email,password):setPasswordError('Please enter your password')}
        }else if (!regEx.test(email) && email !==''){ 
          setEmailError('Plese enter a valid email')
        }else{
          setPasswordError('The field in empty')
        }
    }
  
    const handleEmail = (e)=>{
      e.preventDefault()
      setEmail(e.target.value)
      
    }
    const handlePassword = (e)=>{
      e.preventDefault()
      setPassword(e.target.value)
    }
  return (
    <div>
        <Grid>
            <Paper className='paper' elevation={5}>
                <Grid align='center'>
                    <Avatar sx={{bgcolor:green[500]}}>
                        <LockPersonOutlinedIcon/>
                    </Avatar>
                    <Typography variant='h4' className='typo'>Signin</Typography>
                </Grid>
                <Grid>
                {loginErrorRes?<Alert severity='error'>{loginErrorRes}</Alert>:null}

                    {signupSuccessRes?<Alert severity='success'>{signupSuccessRes}</Alert>:null}
                <form onSubmit={LoginValidation} noValidate>
                    <div>
                    <TextField onChange={handleEmail} style={{marginTop:'10px'}}
                    
                    variant='standard' name="email"  type='email' label='Email' placeholder='Enter Email' fullWidth={true} ></TextField>
                    {/* <Typography variant='caption' style={{color:'red'}}>{emailError}</Typography>  */}
                    {emailError?<Typography variant='caption' sx={{color:'red'}}>{emailError}</Typography>:null}
                    </div>
                    <TextField onChange={handlePassword} name="password" style={{marginTop:'10px'}} 
                    variant='standard' type='password' label='Password' placeholder='Enter Password' fullWidth='true' ></TextField>
                    {passwordError?<Typography  sx={{color:'red'}} variant='caption'>{passwordError}</Typography>:null}

                    {/* <Typography style={{textAlign:'right',marginTop:'10px'}} variant='body2'><Link to='/user/forgot_password' style={{textDecoration:'none',color:'#0033cc'}}>Forgot password?</Link></Typography> */}
                    <Box align='center'>
                    <Button style={{marginTop:'20px',width:'150px'}} variant='outlined' type='submit'>Login</Button><br /><br />
                    </Box>
                </form>
                <Typography variant='body2'>Dont have an account?<Link style={{marginTop:'30px',color:'#0033cc',textDecoration:'none'}} to='/admin/signup'>Signup</Link></Typography>
                </Grid>
            </Paper>
        </Grid>
    </div>
  )
}

export default AdminLogin