import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IActivity } from './../models/IActivity'

interface IState{
    activities: IActivity[]
}

const Home = () => {
    const [ state, setActivities ] = useState<IState>({
        activities: [] 
    });

    const fetchActivities = async () => {
        let response = await axios.get('http://localhost:5000/api/Activities');
        setActivities({
            activities: response.data
        });
    };  

    useEffect(() => {
        fetchActivities();
    }, []);
    
    

    return (
        <React.Fragment>
            {state.activities.map((r, i) => {
                console.log(r);
                return (<div key={i}>
                    {r.title}
                </div>
                );
            })}
        </React.Fragment>
    )
}

export default Home