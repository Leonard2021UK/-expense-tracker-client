import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import {Card, Col, Row} from "react-bootstrap";
import useGraphService from "../../services/useGraphData";
import {useEffect, useState} from "react";
const _ = require('lodash');

const DashboardGridCards = ()=>{

    const {getExpenseTrackerSum,getExpenseTrackerItemByCategoryPeriod} = useGraphService;

    const [expenseTrackerSum,setExpenseTrackerSum] = useState([])
    const [expenseTrackerItemByCategory,setExpenseTrackerItemByCategory] = useState([])

    useEffect( ()=>{

        getExpenseTrackerSum()
            .then(async (r)=>{
            try {
                setExpenseTrackerSum(await r.json())
            }catch (error){
                console.error(error);
            }
        })
        getExpenseTrackerItemByCategoryPeriod()
            .then(async (r)=>{
                try {
                    setExpenseTrackerItemByCategory(await r.json())
                }catch (error){
                    console.error(error);
                }
        })

    },[]);


    const mapExpenseTrackerData = ()=>{
        if(!_.isUndefined(expenseTrackerSum)){
            return expenseTrackerSum.map((tracker) =>{
                return   {
                    name: tracker['name'],
                    sum: parseInt(tracker['sum']),
                    created:tracker['created']
                }
            }).sort((dataPrev,dataNext)=>{
                if(dataPrev.created > dataNext.created){
                    return 1;
                }else if(dataPrev.created < dataNext.created){
                    return -1;
                }else{
                    return 0;
                }
            })
        }
        return [];
    }

    const mapItemCategoryData = ()=>{
        if(!_.isUndefined(expenseTrackerItemByCategory)){
            return expenseTrackerItemByCategory.map((category) =>{
                return   {
                    name: category['category'],
                    sum: parseInt(category['total']),
                }
            })
        }
        return [];
    }

    return(
        <Row xs={12} md={12} className="g-4" style={{marginTop:2+"em"}}>
            <Col>
                <Card
                    bg={"light"}
                    key={0}
                    text={"text"}
                    className="mb-2"
                >
                    <Card.Header>Spending in total</Card.Header>
                    <Card.Body>
                        <Card.Title>Expenses </Card.Title>
                        <Card.Text>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <AreaChart width={600} height={250} data={mapExpenseTrackerData()}
                                               margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis unit="£" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="sum" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card
                    bg={"light"}
                    key={0}
                    text={"text"}
                    className="mb-2"
                >
                    <Card.Header>Spending by category</Card.Header>
                    <Card.Body>
                        <Card.Title>Last 30 days</Card.Title>
                        <Card.Text>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <AreaChart width={600} height={250} data={mapItemCategoryData()}
                                               margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f54242" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#f54242" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis unit="£" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="sum" stroke="#f54242" fillOpacity={1} fill="url(#colorRed)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default DashboardGridCards;