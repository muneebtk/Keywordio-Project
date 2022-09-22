import { Alert, Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React ,{useContext, useState}from 'react'
import { Link } from 'react-router-dom'
import { green} from '@mui/material/colors';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './adminSignup.css'
import AuthContext from '../../AuthContext/AuthContext';

function AdminSignup() {
  let {SignupUser,signupErrorRes} = useContext(AuthContext)
  let [firstName,setFirstName] = useState()
  let [lastName,setLastName] = useState()
  let [email,setEmail] = useState()
  let [password,setPassword] = useState()
  let [confirmPassword,seetConfirmPassword] = useState()
  let [fieldError,setFieldError] = useState()

    let SignupValidation = (e)=>{
      e.preventDefault()
      if (firstName !=null){
  
        const re =  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/i
  
          if (firstName.length>2 && re.test(firstName) ){

            if (lastName!==''){

              const regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
              if (regEx.test(email)){
                const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i
      
                  if (password.length>4 && password===confirmPassword && password.length>5){
                    SignupUser(firstName,lastName,email,password,confirmPassword)
                  }else{
                    setFieldError('Password is empty or does not matching.')
                  }
                }else{
                  setFieldError('Invalid email address or field in empty')
                }
              }else{
                setFieldError('Please enter a valid last name')
              }
            }else{
              setFieldError('Please enter a valid first name')
            }
          
        }else{
          setFieldError('Please enter your details')
      }
    }

  let handleFirstName = (e)=>{
    setFirstName(e.target.value)
  }
  let handleLastName = (e)=>{
    setLastName(e.target.value)
  }
  let handleEmail = (e)=>{
    setEmail(e.target.value)
  }
  let handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  let handleConfirmPassword = (e)=>{
    seetConfirmPassword(e.target.value)
  }
  return (
    <div>
         <Grid>
            <Paper   className='paper1' elevation={5}>
                <Grid align='center'>
                    <Avatar sx={{bgcolor:green[500]}}>
                        <ExitToAppIcon/>
                    </Avatar>
                    <Typography variant='h4' className='typo'>Signup</Typography>
                </Grid>
                <Grid>
                  {signupErrorRes?<Alert severity='error'>{signupErrorRes}</Alert>:null}
                 {fieldError? <Alert severity='error' >{fieldError}</Alert>:null}
                  <form onSubmit={SignupValidation}>
                <div><TextField onChange={handleFirstName} style={{marginTop:'10px'}}
                variant='standard' name="first_name"  type='text' label='First Name' placeholder='Enter First Name' fullWidth={true} ></TextField>
                </div>

                <TextField onChange={handleLastName} name="last_name" style={{marginTop:'10px'}} 
                variant='standard' type='text' label='Last Name' placeholder='Enter Last Name' fullWidth >
                </TextField>

                <TextField onChange={handleEmail} name="email" style={{marginTop:'10px'}} 
                variant='standard' type='text' label='Email' placeholder='Enter Email' fullWidth={true} >
                </TextField>

                <TextField onChange={handlePassword} name="password" style={{marginTop:'10px'}} 
                variant='standard' type='password' label='Password' placeholder='Enter Password' fullWidth >
                </TextField>
                <Typography variant='caption'><span style={{color:'red'}}>*</span> password must contain 5 characters</Typography>

                <TextField onChange={handleConfirmPassword} name="confirm_password" style={{marginTop:'10px'}} 
                variant='standard' type='password' label='Confirm Password' placeholder='Confirm Password' fullWidth='true' >
                </TextField>

                <Box align='center'>
                <Button style={{marginTop:'20px',width:'150px'}} variant='outlined' type='submit'>signup</Button><br /><br />
                </Box>
                <Typography variant='body2'>Already have an account?<Link style={{marginTop:'30px',color:'#0033cc',textDecoration:'none'}} to='/admin/login'>Login</Link></Typography>
                </form>
                </Grid>
            </Paper>
        </Grid>
    </div>
  )
}

export default AdminSignup