import React from 'react';
import "./Join.css";
import axios from 'axios';


class Join extends React.Component {
    render() {
       
        return (
            <div className="Join__container">
                <p className="Join_name">개인정보 입력란</p>
                <p className="Join_member">
                <div className="Join_icon">ID</div><input id="join_id"/><br/><br/>
                <div className="Join_icon">pw</div><input id="join_pw" type="password"/><br/><br/>
                <div className="Join_icon">Name</div><input id="join_name"/><br/>
                </p>
                <button className="btn btn-info" onClick={ async () => {
                    const join_id = document.getElementById("join_id");
                    const join_pw = document.getElementById("join_pw");
                    const join_name = document.getElementById("join_name");
                    console.log(join_id.value);
                    const axios2 = axios.create( {
                        withCredentials: true
                    });
                    const returnData = await axios2.post('http://localhost:9090/join', null,
                    {params : {id:join_id.value , pw:join_pw.value, name:join_name.value} }, );
                    alert("회원가입 완료");
                } }> 회원가입 </button>
            </div>
        );
    }
}

export default Join;