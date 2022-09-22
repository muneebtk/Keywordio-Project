import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../AuthContext/AuthContext'

function UpdateBook() {
    let params = useParams()
    let id = params.id
    useEffect(() => {
     EditBook(id)
    }, [])
    
    let {putEditBookData,title,des,setTitle,setDes,EditBook} = useContext(AuthContext)
    const [titleError,setTitleError] = useState()
    const [desError,setDesError] = useState()

    let EditBookValidation = (e)=>{
        e.preventDefault()
        if (!title){
            setTitleError('Please enter title')
            return false;
        }
        if (!des){
            setDesError('Please enter description')
            return false;
        }
        putEditBookData(title,des,id)
    }
  return (
    <div>
         <Card variant='outlined' sx={{maxWidth:'500px',minWidth:'300px',margin:'30px auto',display:'flex',flexDirection:'column'}}>
        <Grid  sx={{padding:'5px 20px'}}>
            <form onSubmit={EditBookValidation}>
                <Typography variant='h4' align='center'>Edit Book Details</Typography><hr />
                <Typography variant='body2'>Enter title</Typography>
                <TextField onChange={(e)=>setTitle(e.target.value)} fullWidth name='title' value={title}></TextField>
                {titleError?<Typography color="red" variant='caption'>{titleError}</Typography>:null}
                <Typography variant='body2'>Enter description</Typography>
                <textarea onChange={(e)=>setDes(e.target.value)} style={{width:'100%'}} id="" cols="30" rows="10" name='description' value={des}></textarea>
                {desError?<Typography color="red" variant='caption'>{desError}</Typography>:null}
                <br />
                <Box align='center'>
                <Button type='submit'>Submit</Button>
                </Box>
            </form>
        </Grid>
    </Card>
    
    </div>
  )
}

export default UpdateBook