import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chats.css';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown,faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Charts() {
    

    const data = [
        {
            name: 'Monoprix',
            uv: 4000,
            pv: 2400,
            visite: 2400,
        },
        {
            name: 'carrefour',
            uv: 3000,
            pv: 1398,
            visite: 2210,
        },
        {
            name: 'Aziza',
            uv: 2000,
            pv: 9800,
            visite: 2290,
        },
        {
            name: 'Hamadi Abid',
            uv: 2780,
            pv: 3908,
            visite: 2000,
        },
        {
            name: 'Exist',
            uv: 1890,
            pv: 4800,
            visite: 2181,
        },
        {
            name: 'Heni',
            uv: 2390,
            pv: 3800,
            visite: 2500,
        },
        {
            name: 'Géant',
            uv: 3490,
            pv: 4300,
            visite: 2100,
        },
    ];
    const data2 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
        
        
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
    
    return (
        <div>
             <div className="containerr">
          <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,415</span>
          <span className="featuredMoneyRate">
            -11.4  <FontAwesomeIcon  icon={faArrowDown} color="red"size='xl'/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <FontAwesomeIcon  icon={faArrowDown} color="red"size='xl'/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <FontAwesomeIcon  icon={faArrowUp} color="green" size='xl'/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
    </div>

        <div className='charts'>
            <h3 className='chart_title'>chassrts</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='grey'/>
                    <YAxis dataKey="visite" stroke='grey'/>
                    <Line type="monotone" dataKey="visite" stroke='#5550bd'/>
                    <Tooltip/>
                    <CartesianGrid stroke='grey' strokeDasharray="1 2"/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
            
        </div>



     
        
        </div>
    )
}
