import {useState,useEffect} from 'react'
import axios from 'axios'
import{Bar,Doughnut,Line} from "react-chartjs-2"
import './Header.css';
const Contents = () => {
    
    const[confirmData,setConfirmData] = useState({})
    const[quarantiendData,setQuarantinedData] = useState({})
    const[comparedData,setComparedData] = useState({})
    
    
    
    useEffect(()=>{
        const fetchEvents=async()=>{
            const koData= await axios.get("https://api.covid19api.com/total/dayone/country/kr")//data가 전부 넘어 오지 않아서 promise 상태가 나온다. 모든 데이터가 넘어와야 진행이 가능하기때문에 async와 await를 사용한다.
            makeData(koData.data)
            //console.log(koData)
        }
        const makeData=(items)=>{
            //reduce의 (ac,cr)변수명은 자유 (ac)는 계속 쌓여서 다음 반복문으로 전달되어지는 역할.(cr)현재 반복문을 돌고 있는 값
            const array = items.reduce((ac,cr)=>{
                const currentDate=new Date(cr.Date); //<-- Date를 cr.date에서 가져온후 새로 선언
                const year = currentDate.getFullYear();//<-- Date에서 연도 달, 일 을 빼내오기
                //console(cr.year)
                const month = currentDate.getMonth();
                const date = currentDate.getDate();
                const confirmed = cr.Confirmed;//<--넘어오는 데이터가 Confirmed 이름을 가지고 있다.
                //console(cr.month)
                 //console(cr.confirmed)
                const death = cr.Deaths;
                //console(cr.death)
                const active = cr.Active;
                //console(cr.active)
                const recovered = cr.Recovered;
                //console.log(cr,year,month,date)//<--Date로 들어오기때문에 Date이다.
                //console.log(recovered)//<--여기까진 제대로 들어가고
            const findItem = ac.find(a=>a.year===year&&a.month===month);//자료가 넘어가는지 확인하는용
            if(!findItem){
                ac.push({year,month,date,confirmed,active,death,recovered})
            }//console.log(recovered)<---여기도 잘들어가고
            if(findItem && findItem.date<date){//findItem의 날짜가 현재 날짜 보다 작을경우
                findItem.active=active;
                //
                findItem.death=death;
                findItem.date=date;
                //
                findItem.year=year;
                findItem.month=month;
                findItem.recovered=recovered; 
                //
                findItem.confirmed=confirmed;
                
            } 
            
            //console.log(cr.active)
            //console.log(cr.recovered)
            return ac;
            }, [])//<--배열로 담기위해 사용하였다. 월이 0부터 시작이기때문에 +1 잊지말것
            console.log(array)
            
            const labels =array.map( a=> `${a.month+1}월`); //키보드 ESC 키 밑에 ` 버튼이 있다.
           
           
            setConfirmData({        
                labels,
                datasets: [
                { 
                    label: "국내 월별 누적 확진자",
                    backgroundColor:"#4169E1",
                    fill:true,
                    data:array.map(a=>{
                        //console.log(a.active)//<---여기가 안 넘어 오는 상태
                        //console.log(a.death)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.month)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.year)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.recoverd)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.confirmed)//<---여기는 잘 넘어 오는 상태
                       return a.confirmed})
                        //다른 값은 모두 정상 여기까지
                },
            ]
        });
        
        setQuarantinedData({        
            labels,//chart.js 공식 API 문서 읽어본 결과 lavels가 아닌 labels로 선언해야 맵핑가능<=이거 찾는 데 2시간 걸리네;;
            datasets: [
            { 
                label: "월별 격리자 현황",
                borderColor:"salmon",
                fill:false,
                data:array.map(a=>{
                        //console.log(a.active)//<---여기가 안 넘어 오는 상태
                        //console.log(a.death)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.month)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.year)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.recoverd)//<---여기는 잘 넘어 오는 상태
                        //console.log(a.confirmed)//<---여기는 잘 넘어 오는 상태
                    return a.active})

            },
        ]
    });
    const last = array[array.length-3]//0915기준 배열 601개 배열 -1을 해줌으로서 마지막달 불러오기 배열길이에서 -3번째껄 호출 이유는 아래
    //0915,0814 자료 확인 결과 recoverd가 비여있는 상황이 발생 그러므로 자료값 변경을 위해 -2를 통해 최소 시각적 효과를 위해 -3을 한다.
    setComparedData({        
        labels:["확진자","격리해제","사망"],
        datasets: [
        { 
            label: "누적 확진, 해제, 사망비율",
            backgroundColor:["#ff3d67","#059bff","#ffc233"],
            borderColor:["#ff3d67","#059bff","#ffc233"],
            fill:false,
            data:[last.confirmed,last.recovered,last.death]
            

        },
    ]
});
        
            
            //items.forEach(item=>console.log(item))<--makeData 초기 값을 살펴 보면 Active,Confirmed,Date,Deaths,Recovered를 사용할 예정
            //월별로 보여 줄 것이기 때문
        }
        
        fetchEvents();



    },[])//지속적인 서버로부터의 호출을 방지 하기위해 삽입(새로운 개념)
    
    
    
    return (
        <section>
          <h2 className='header01'>국내 코로나 현황</h2>
          <div className="contents">
          <div className="Bargraph">
              <Bar data={confirmData} options={
                  {title:{display: true, text:"누적 확진자 수", fontSize:16}},
                  {legend:{display:true, position:"bottom"}}
                  }/>
          </div>
          <div className="Linegraph">
              <Line data={quarantiendData} options={
                  {title:{display: true, text:"월별 격리자 현황", fontSize:16}},
                  {legend:{display:true, position:"bottom"} }
                  }/>
          </div>
          <div className="Doughnutgraph">
              <Doughnut data={comparedData} options={
                  {title:{display: true, text:`누적확진,해제,사망(${new Date().getMonth()+1}월)`, fontSize:16}},
                  {legend:{display:true, position:"bottom"} }
                  }/>
          </div>
          </div>
        </section>
    )
}

export default Contents
//npm install react-chartjs-2 chart.js<--차트로 보여줄거기때문에 필요
