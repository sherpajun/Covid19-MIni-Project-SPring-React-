import React from "react";
import './Board.css';
import {Link} from 'react-router-dom';
import axios from "axios";

class BoardDetail extends React.Component{
    
    getBoardDetail=async ()=>{
        const boardDetail =await axios.get('http://localhost:9090/boardList')
    }
    
    componentDidMount(){
        const {location, history}=this.props;
        if(location.state===undefined){
            history.push('/');
        }else{
            this.getBoardDetail();
        }
        this.getBoardDetail();

    }

    render(){
        const {location} =this.props;
        console.log(location.state);
        if(location.state){
            return (
        
                <div className="board__container">
                    
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr className="table-active">
                                    <th> 글제목 : {location.state.title} <br/> 글쓴이 : {location.state.id}</th>
                                    <th className="text-right"> 작성일 : {location.state.writeDate} </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td colSpan="2"><pre>{location.state.content}</pre></td></tr>
                                <tr style={{textAlign: 'center' }}>
                                    <td colSpan="2">
                                        <Link to={ { pathname:'/board-write' , state:{ articleNo:location.state.articleNo} }  } >
                                            <button>답글쓰기</button>
                                        </Link>
                                         &nbsp;
                                            
                                        <Link to={ { pathname:'/board' , state: {} } } >
                                            <button>돌아가기</button>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }else{
            return null;
        }
    }
}
export default BoardDetail;