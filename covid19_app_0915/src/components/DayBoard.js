import axios from 'axios'
import React, { Component } from 'react'
 class DayBoard extends React.Component{

    state={
        coronaList:[],
    }
    

    componentDidMount(){
        this.CoronaEvents();
    }
    
    CoronaEvents=async()=>{
    const krData= await axios.get("https://api.covid19api.com/total/dayone/country/kr")
    //console.log(krData.data);
    this.setState({coronaList:krData.data})
    this.makeData(krData.data)
}

    makeData=(items)=>{
        const array = items.reduce((ac,cr)=>{
        const currentDate=new Date(cr.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const confirmed = cr.Confirmed;
        const death = cr.Deaths;
        const active = cr.Active;
        const recovered = cr.Recovered;
        //console.log(year,month,date)
    const findItem = ac.find(a=>a.year===year&&a.month===month);
    if(!findItem){
        ac.push({year,month,date,confirmed,active,death,recovered})
    }
    if(findItem && findItem.date<date){
        findItem.active=active;
        findItem.death=death;
        findItem.date=date;
        findItem.year=year;
        findItem.month=month;
        findItem.recovered=recovered; 
        findItem.confirmed=confirmed;
    } 
    return ac;
    }, [])
    //console.log(array)
    const labels =array.map( a=> `${a.month+1}월`); 
    const last = array[array.length-3]
    
    //items.forEach(item=>console.log(item))//<--makeData 초기 값을 살펴 보면 Active,Confirmed,Date,Deaths,Recovered를 사용할 예정
    const DayS= array.map(a=>`${a.month+1}월`);
    console.log(DayS)//Days값 정상출력 완료
}

render(){
    return(
    <div className="board__container">
                <table className="table table-striped">
                    <thead className='thead-dark'>
                        <tr><th>Day</th><th>감염자 수</th><th>격리해제</th><th>사망자</th></tr>
                    </thead>
                    <tbody>
                        {


                        }
                    </tbody>
                </table>
            </div>
        );
}    

}

export default DayBoard