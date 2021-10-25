import React from "react";
import './Board.css';
import axios from "axios"; 


 
 
 
 
class BoardWrite extends React.Component{
 
 
    boardWriteHandler= async()=>{
        const title_ele=document.getElementById("title");
        const content_ele=document.getElementById("content");
        console.log(title_ele.value, content_ele.value);
        const axios2 = axios.create({
            withCredentials: true
        });
        const returnData=await axios2.post('http://localhost:9999/boardWrite', 
        null,
        {params:{title:title_ele.value, content:content_ele.value}});
        alert(returnData.data);

    };
 
    render(){
 
        return (
 
            <div className="about__container">
 
                <div className="row">
 
                        <table className="table" style={{textAlign: 'center' }} >
                            <thead>
                                <tr className="table-active">
                                    <th scope="col" style={{width: '50%' }} > 글제목 : <input id='title' /> </th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td colSpan="2"><textarea rows="10" cols="50" id='content'></textarea></td></tr>
                                <tr >
                                    <td colSpan="2">
                                        <button  className="btn btn-info" onClick={this.boardWriteHandler }>등록</button>
                                         &nbsp;
                                         <button  className="btn btn-info">취소</button>
                                        <button type="button" className="btn btn-warning">글목록</button>
                                       
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