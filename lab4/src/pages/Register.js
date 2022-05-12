import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import NavBar from "../components/NavBar";
import axios from "axios";
function Register(){
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const submitHandler = (e) => {
        if (name === '' || surname === '')
            setError('Fill all the fields')
        else
        {// To not reload the page on Submit
        e.preventDefault();
        const postData = {data : {name, surname}}
        // console.log(postData)

        axios.post('https://pure-caverns-82881.herokuapp.com/api/v54/users', postData,  
        {headers:{
                        "X-Access-Token": '0f35e61fd50855cb1fc51b943d1909139a325966b77966abbc363fd27df378eb',
                    }
                })
        .then((res) => {
            // console.log(res.data.id)
            // console.log(postData)
            postData.data.id = res.data.id
            // console.log(postData)
            localStorage.setItem("user-info", JSON.stringify(postData["data"]))
            navigate("/quizes")
        })
        .catch((err)=>{
            console.log(err)
            setError('User with this name and surname already exists!');
            
        })}
        
    }
    return(
        <>
        <NavBar />
        <br/><br/> <br/><br/>
        <div className="Form">
        <div className="card">
            <div className="card-body">
            <form onSubmit={submitHandler}>
                <h1>Create a user</h1>
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
                <br/>
                <label htmlFor="surname" className="form-label">Surname</label>
                <input type="text" className="form-control" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
                <br/>
                {error && <div className="text-danger">{error}</div>}
                <br/>
                <button type="submit" className="btn btn-dark">Submit</button>
            </form>
            </div>
        </div>
        </div>
       </>
    );
}

export default Register;