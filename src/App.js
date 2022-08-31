import Header from './components/Header';
import Map,{Marker} from "react-map-gl";
import { useEffect, useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";
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
    <div className='map-container'>
        <Map
          initialViewState={{
            longitude: -0.09,
            latitude: 51.505,
            zoom: 10,
          }}
          latitude={+result.lat}
          longitude={+result.log}
          mapboxAccessToken={process.env["REACT_APP_MAP_BOX_API_KEY"]}
          style={{ width: "100%", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker 
          latitude={+result.lat} 
          longitude={+result.log}
          anchor="bottom"
          >
            <img src={require("./images/icon-location.svg").default} alt="marker"/>
          </Marker>
        </Map>
    </div>
    </>
  );
}

export default App;
