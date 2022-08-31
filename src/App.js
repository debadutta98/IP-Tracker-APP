import Header from './components/Header';
// import Map,{Marker} from "react-map-gl";
import { useEffect, useState } from 'react';
import { MapContainer, Popup, Marker, TileLayer } from 'react-leaflet';
import {icon} from "leaflet";
function App() {
  const [result,setResult]=useState({
    ip:"",
    lat:"51.505",
    log:"-0.09",
    timezone:"",
    location:"",
    isp:""
  });
  const onUpdateState=async (value)=>{
    setResult(prevState=>({
      ...prevState,
      ...value
    }));
  }
  useEffect(()=>{
    fetch(`https://ipinfo.io?token=${process.env["REACT_APP_IPINFO_API_TOKEN"]}`)
        .then(async (result) => await result.json())
        .then((value) => {
          setResult((prevState) => ({
            ...prevState,
            ip: value.ip,
            location: [value.region, value.country].join(","),
            lat: value.loc.split(",")[0].trim(),
            log: value.loc.split(",")[1].trim(),
            timezone: value.timezone,
            isp: value.org
          }));
        }).catch((err) => {
          console.log("connection error",err);
        });
  },[]);
  return (
    <>
      <Header ipinfo={result} onUpdateState={onUpdateState}/>
        <MapContainer 
        key={JSON.stringify([+result.lat, +result.log])}
        center={[+result.lat, +result.log]}
        zoom={13} 
        scrollWheelZoom={false} 
        zoomControl={false}
        style={{width:"100%",height:"100vh",zIndex:0}}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker 
          position={[+result.lat, +result.log]}
          icon={icon({
            iconUrl:require("./images/icon-location.svg").default
          })}
          >
            <Popup>
            {`${+result.lat}, ${+result.log}`}
            </Popup>
          </Marker>
        </MapContainer>
    </>
  );
}

export default App;
