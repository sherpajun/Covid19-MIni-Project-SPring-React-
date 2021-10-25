import axios from "axios";
import React from "react";
import {Link} from 'react-router-dom';
import './Board.css';

class Board extends React.Component{

    state={
        page:1,
        boardList:[],
    }

    getBoard=async()=>{
        const resultData = await axios.get('http://localhost:9090/boardList?page='+this.state.page);
        //console.log(resultData.data);
        this.setState({boardList : resultData.data})
        if(this.state.boardList.length===0){
            alert("마지막 페이지입니다.")
            this.prePage();
        }
    }
    componentDidMount(){
        this.getBoard();
    }



    nextPage= async () =>{
        const resultData =await axios.get('http://localhost:9090/boardCount');
        //console.log(resultData.data/3);
        await this.setState({page: this.state.page+1});
        if(this.state.page > resultData.data/10){
            this.state.page = resultData.data/10;
            alert("마지막 페이지 입니다.")
        }
        this.getBoard();
    }

    prePage= async () =>{
    
        if( this.state.page > 1){
            await this.setState({page: this.state.page-1});
            this.getBoard();
        }else{
            alert("첫번째 페이지 입니다.");
        }
        
    }

    render(){
        return(
            <div className="board__container">
                <table className="table table-striped">
                    <thead className='thead-dark'>
                        <tr>
                            <th>글번호</th>
                            <th>글제목</th>
                            <th>글쓴이</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.boardList.map((item, index) => {
                                console.log(item.parentNo);
                                if(item.parentNo === 0) {
                                    return ( 
                                            <tr key={index}>
                                                <td>{item.articleNo}</td>
                                                <td><Link to={{pathname:'/board-detail', state:{...item}}}>
                                                    <font size="2" title={item.content}>{item.title}</font></Link></td>
                                                <td>{item.id}</td>
                                                <td>{item.writeDate}</td>
                                            </tr>
                                    );
                                } else {
                                    let icon='↪️';
                                    for(let i=2;i<item.level;i++){
                                        icon += icon;    
                                    }
                                    return (
                                            <tr key={index}>
                                                <td>{item.articleNo}</td>
                                                <td>
                                                    <Link to={{pathname:'/board-detail', state:{...item}}}>
                                                    <font size="2" title={item.content}>
                                                    {icon}{item.title}</font>
                                                    </Link>
                                                    </td>
                                                <td>{item.id}</td>
                                                <td>{item.writeDate}</td>
                                            </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
                </table>

                <div className="pagebtn">
                <div style={{textAlign: 'center' }}>
                <div className="prebtn"><Link to='/board' onClick={this.prePage} > {'<< 이전 글'}</Link></div> 
                
                <div className="nextbtn"><Link to='/board' onClick={this.nextPage} > {'다음 글 >>'}</Link></div>   
                    <Link to="/board-write" ><button className="btn btn-info new__btn">새글쓰기</button></Link> &nbsp;&nbsp;
                    <Link to="/"><button className="btn home__btn">목록</button></Link>
                    </div>
                </div>
            </div>
        );
        
    }

}

export default Board;