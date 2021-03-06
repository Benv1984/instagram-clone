import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const PostData =()=>{
        const regex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        if(!regex.test(email)){
            M.toast({html: "invalid email", classes:"#c62828 red darken-3"})
            return
            debugger;
            }
        fetch('http://localhost:5000/api/login',{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            } else {
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signed in successfully", classes:"#388e3c green darken-1"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err);
        })
    }

 return (
     <div className="mycard">
         <div className="card auth-card input-field">
             <h2>Instagram</h2>
             <input
             type="text"
             placeholder="email" 
             value={email} 
             onChange={(e)=>setEmail(e.target.value)}
             /> 
               <input
             type="password"
             placeholder="password" 
             value={password} 
             onChange={(e)=>setPassword(e.target.value)}
             />
              <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={()=>PostData()}
              >
                  Login
                </button>
                <h5>
                    <Link to="/SignUP">Don't have an account?</Link>
                </h5>
      </div>
     </div>
     
 )   
}


export default Login