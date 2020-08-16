import React , {useEffect , useState} from 'react'; 
import {fetchDailyData} from '../../api';
import { Line , Bar } from 'react-chartjs-2';

 import styles from './Chart.module.css'

const Chart = ( {data : {confirmed , recovered  , deaths} , country})=>{
    const [dailyData , setDailyData] = useState([]);

    useEffect(()=>{
        const fetchApi = async ()=>{
            setDailyData(await fetchDailyData());
        }
        console.log(confirmed);
         fetchApi();

        }, []);

    const barChart = (
       confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );

    console.log(confirmed , deaths ,recovered);
    const LineChart = (
      dailyData.length
      ? ( <Line 
        data={{
            labels : dailyData.map(({date})=>date) ,
            datasets : [{
                data:dailyData.map(({confirmed})=>confirmed),
                label:'Infacted',
                borderColor: '#3333ff',
                fill : true,
            }, {
                data:dailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor: 'red',
               backgroundColor: 'rgb(255,0,0,0.5)',
                fill : true,
            }],
        }}
        />) : null

    );

    return(
     <div className={styles.container}>
         {country ? barChart : LineChart}
         </div>
    )
     
}

export default Chart;