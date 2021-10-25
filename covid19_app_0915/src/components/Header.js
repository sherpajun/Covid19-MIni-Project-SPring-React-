import React from 'react'
import './Header.css';
import axios from 'axios';
import {useState} from 'react';
import {Link} from 'react-router-dom';

async function logout(){
   const returnData=await axios.post('http://localhost:9090/logout'); 
   sessionStorage.removeItem("logined_name");
   sessionStorage.removeItem("JSESSIONID");
   window.location.reload();
   console.log(returnData);
   alert("로그아웃합니다.");
}

function Navigation(){    
    let [name, setName] = useState('');
    const logined_name=sessionStorage.getItem("logined_name");
    
    
    return (
        <header className='header'>
            <h1 className="header01">코로나 바이러스 감염현황</h1>
            <div className="login" >   
                {  
                ( name ? name : name=logined_name) ?  
                        (
                            <div className="login01"> {name}님 환영합니다 <button onClick={logout} >logout</button> 
                            </div> 
                            
                        ) 
                        :
                        (     
                            <div id="loginDiv">
                                <h5 className="login01">
                                    ID : <input  size="5" id="login_id"/>&nbsp;
                                    PW : <input  size="5" type="password" id="login_pw" /> &nbsp;
                                        <button type="button" class="btn btn-default btn-sm" onClick={  async ()=>{ 
                                                const id_ele=document.getElementById("login_id");
                                                const pw_ele=document.getElementById("login_pw");
                                                //console.log(id_ele.value, pw_ele.value);
                                                const axios2 = axios.create({
                                                    withCredentials: true
                                                });
                                                const returnData=await axios2.post('http://localhost:9090/login',null, 
                                                { params : {id:id_ele.value, pw: pw_ele.value} },
                                                );
                                                console.log(returnData);
                                                const name=returnData.data.name;    
                                                setName(name);                                
                                                sessionStorage.setItem("logined_name",name);

                                            
                                    }  }>login</button>
                                    
                                </h5>
                           
                            </div>
                        )
                }
             
                
            </div>
        </header>
    );
}

export default Navigation;