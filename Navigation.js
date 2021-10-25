import axios from 'axios';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

/*
class Navigation extends React.Component{
    state={count:0};
 
    a= ()=>{
        this.setState({count:this.count+1});
    };
 
    render(){
        return (
            <div>
                {this.state.count}
                <button onClick={this.a} >add</button>
            </div>
        );
    }
}
*/
// 로그아웃 
async function logout(){
    const axios2 = axios.create({
        withCredentials: true
    });
   const returnData=await axios2.post('http://localhost:9999/logout'); 

   //Storage에 있는 데이터 삭제
   sessionStorage.removeItem("logined_name");
   sessionStorage.removeItem("JSESSIONID");
   // 로그아웃시 로그인화면 출력되게함
   window.location.reload();
}
 
function Navigation(){    
    let [name, setName] = useState('');
    const logined_name=sessionStorage.getItem("logined_name");
    
    return (
        <div className="nav">   
            {  
            ( name ? name : name=logined_name) ?  
                    (
                        <div> {name}님 환영합니다 <button onClick={logout} >logout</button> 
                        </div> 
                        
                    ) 
                    :
                    (     
                        <div id="loginDiv">
                            ID <input size="5" id="id" />
                            PW <input size="5" type="password" id="pw" />
                            <button onClick={  async ()=>{ 
                                    const id_ele=document.getElementById("id");
                                    const pw_ele=document.getElementById("pw");

                                    //console.log(id_ele.value, pw_ele.value);

                                    const axios2 = axios.create({
                                        withCredentials: true
                                    });

                                    const returnData=await axios2.post('http://localhost:9999/login',null, 
                                    { params : {id:id_ele.value, pw: pw_ele.value} } );
                                    console.log(returnData);
                                    const name=returnData.data.name;    
                                    setName(name);                                
                                    sessionStorage.setItem("logined_name",name);
                                    //const sessionId=returnData.data.JSESSIONID;
                                    //sessionStorage.setItem("JSESSIONID", sessionId);
                            }  }>login</button>
                        </div>
                    )
            }
            <Link to="/">Home</Link> 
            <Link to="/board">Board</Link>
            <Link to="/about" >About</Link>
        </div>
    );
}
 
export default Navigation;
 
