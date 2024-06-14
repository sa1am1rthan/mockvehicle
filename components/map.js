import {MapContainer,Tilelayer,Polyline,Marker} from 'react-leaflet';

const Map=({route}) =>{
    return (
        <MapContainer center={[route[0].lat,route[0].lng]} zoom={13} style={{height:'100vh',width: '100%'}}>
            <Tilelayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            <polyline positions={route.map(loc=> [loc.lat , loc.lng])} />
            {route.map((loc, idx)=> (
                <Marker key={idx} position={[loc.lat, loc.lng]} />
            ))}
        </MapContainer>
    ) ;
    
};

export default Map;