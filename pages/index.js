
import {useState} from 'react';
import FileUpload from '../components/FileUpload';
import Map from '../components/map';
import { getOptimizedRoute } from '../utils/routeoptmization';

export default function Home()
{
    const [route, setRoute]=useState(null);

    const handleDataupload = async (data) =>{
        const validLocations =data.filter((loc)=> loc.lat && loc.lng);
        const waypoints= validLocations.map((loc)=> '${loc.lat},${loc.lng}');
        const routeData = await getOptimizedRoute(waypoints);

        const optimizedRoute= routeData= routeData.routes[0].waypoint_order.map((index)=>validLocations[index]);
        setRoute(optimizedRoute);

    };

    return (

        <div className="container mx-auto p-4">
            <h1 className="text-2x1 font-bold"> Vehicle-Routing-App</h1>
            <FileUpload onDataUpload={handleDataupload}/>
            {route && <Map route={route}/>}
        </div>
    );
}