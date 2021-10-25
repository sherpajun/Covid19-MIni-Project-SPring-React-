import React from "react";
import './Board.css';
import {Link} from 'react-router-dom';
import axios from "axios";


class BoardWrite extends React.Component{    

    // boardWriteHandler= async ()=>{
    //     const title_ele=document.getElementById("title");
    //     const content_ele=document.getElementById("content");        

    //     console.log(this.props.location.state.articleNo);
    //     const axios2 = axios.create({
    //         withCredentials: true
    //       });
    //     const returnData=await axios2.post('http://localhost:9090/boardWrite', 
    //     null,
    //     {params:{title:title_ele.value, content:content_ele.value, articleNO:this.props.location.state.articleNo}},        
    //     );
    //     alert(returnData.data);
    // };

    boardAnsHandler= async () => {
        const title_ele=document.getElementById("title");
        const content_ele=document.getElementById("content");
        console.log(title_ele.value, content_ele.value);
        const axios2 = axios.create({
            withCredentials: true
          });
        const returnData=await axios2.post('http://localhost:9090/boardWrite', 
        null,
        {params:{title:title_ele.value, content:content_ele.value, articleNO:this.props.location.state.articleNo}}, );
        alert("답글 등록 완료");
    }

    boardWriteHandler= async () => {
        const title_ele=document.getElementById("title");
        const content_ele=document.getElementById("content");
        console.log(title_ele.value, content_ele.value);
        const axios2 = axios.create({
            withCredentials: true
          });
        const returnData=await axios2.post('http://localhost:9090/boardWrite', 
        null,
        {params:{title:title_ele.value, content:content_ele.value}}, );
        alert("새글 등록 완료");
    }

   
    render(){
       //console.log(this.props);
       
        return (
    
            <div className="board__container">
                
                <div className="row">
                    <table className="table" style={{textAlign: 'center' }} >
                        <thead>
                            <tr className="table-active">
                                <th>
                                     글 제목 : <input  id='title' /> 
                                </th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan="2"><textarea rows="10" cols="50" id="content"></textarea></td></tr>
                            <tr >
                                <td colSpan="2">
                                    <button  className="btn btn-info" onClick={()=>{
                                            if(this.props.location.state==null){
                                                this.boardWriteHandler();
                                            }else{
                                                this.boardAnsHandler();
                                                console.log(this.props.location.state)
                                            }
                                        }} >등록</button>&nbsp;&nbsp;&nbsp;
                                        
                                        <Link to={ { pathname:'/board' , state: {} } } >
                                            <button>글목록</button>
                                        </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
        
    }
}

export default BoardWrite;