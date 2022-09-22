import React,{createContext, useState} from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=>{
    // tokens setup
    let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
    let [user,setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    // signup and login response
    let navigate = useNavigate()
    let [signupSuccessRes,setSignupSuccessRes] = useState()
    let [signupErrorRes,setSignupErrorRes] = useState()
    let [loginErrorRes,setLoginErrorRes] = useState()
    // books operations response
    let [allBooksData,setAllBooksData] = useState()
    let [deleteBookRes,setDeleteBookRes] = useState()
    let [editBookData,setEditBookData] = useState()
    let [editBookSuccess,setEditBookSuccess] = useState()
    let [addBookRes,setAddBookRes] = useState()
    const [title,setTitle] = useState('')
    const [des,setDes] = useState('')

    // pass the token with request 
    const config = {
        headers: { Authorization: `Bearer ${authTokens?authTokens.access:null}` }
    };
  
    // base url of api
    const BASE_URL = 'http://127.0.0.1:8000/'
    // login user
    let LoginUser = async(email,password)=>{
            let response = await fetch('http://127.0.0.1:8000/login/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':email,'password':password})
        })
        let data = await response.json()
            if (response.status===200){
                setAuthTokens(response.data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens',JSON.stringify(data))
                navigate('/')
                console.log('login completed');
            }else{
                setLoginErrorRes('No active account found with the given credentials')
            }
    }
// signup user
    let SignupUser = async(first_name,last_name,email,password,confirm_password)=>{

        await axios.post(BASE_URL+'signup/',{
            first_name:first_name,
            last_name:last_name,
            email:email,
            password:password,
            confirm_password:confirm_password,
        }).then ((response)=>{
            if (response.status===201){
                setSignupSuccessRes(response.data)
                navigate('admin/login/')
            }else{
                setSignupErrorRes(response.data)
            }
        })
    }
// add a new book
    let AddBook =async (title,description,image)=>{
        let form_data = new FormData();

        form_data.append('title',title)
        form_data.append('description',description)
        form_data.append('image',image)
        await axios.post(BASE_URL+'library/',form_data,config)
        .then ((response)=>{
            if (response.status===201){
                setAddBookRes('Book added successfully')
                navigate('/')
            }
        })
    }
// fetching all books
    let AllBooks = async()=>{
        axios .get(BASE_URL+'library/')
        .then((response)=>{
            setAllBooksData(response.data)
        })
    }
// logout user
    let logoutUser = ()=>{
        console.log('logout');
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
        
    }
    // delete a specific book
    let DeleteBook = (id)=>{
        axios.delete(BASE_URL+`library/${id}/`,config)
        .then ((response)=>{
            if (response.status===200){
                setDeleteBookRes('Book deleted successfully')
            }
        })
    }
    // fetching a specific book for edit
    let EditBook= (id1)=>{
        console.log(id1,'idddd');
        axios.get(BASE_URL+`edit_book/${id1}`,config)
        .then ((response)=>{
            if (response.status===200){
                setEditBookData(response.data)
                setDes(response.data.description)
                setTitle(response.data.title)
                navigate(`add_book/${id1}/`)
            }else{
                console.log('navigate');
            }
        })
    }
// edit an existing books details
    let putEditBookData = (title,description,id)=>{
        let form_data = new FormData();

        form_data.append('title',title)
        form_data.append('description',description)

        axios.patch(BASE_URL+`library/${id}/`,form_data,config)
        .then((response)=>{
            if (response.status===200){
                setEditBookSuccess('Book edited success')
                navigate('/')
            }else{
            }
        })
    } 

    
    let contextData = {
        LoginUser:LoginUser,
        SignupUser:SignupUser,
        signupSuccessRes:signupSuccessRes,
        signupErrorRes,signupErrorRes,
        loginErrorRes:loginErrorRes,
        authTokens:authTokens,
        user:user,
        AddBook:AddBook,
        allBooksData,allBooksData,
        AllBooks,AllBooks,
        logoutUser:logoutUser,
        DeleteBook:DeleteBook,
        EditBook:EditBook,
        editBookData:editBookData,
        putEditBookData:putEditBookData,
        setTitle:setTitle,
        setDes:setDes,
        title:title,
        des:des,
        editBookSuccess:editBookSuccess,
        setEditBookSuccess:setEditBookSuccess,
        deleteBookRes:deleteBookRes,
        addBookRes:addBookRes,
    }
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}