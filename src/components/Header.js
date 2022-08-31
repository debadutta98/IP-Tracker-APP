import { isIP } from "is-ip";
import { useRef } from "react";
import IPInfoCard from "./IPInfoCard";

const Header=(props)=>{
    const inputref=useRef();
    const onSubmitHandler=async (event)=>{
        event.preventDefault();
        if(isIP(inputref.current.value)){
            await fetch(`https://ipinfo.io/${inputref.current.value}?token=${process.env["REACT_APP_IPINFO_API_TOKEN"]}`)
                .then(async (result) => await result.json())
                .then((value) => {
                    props.onUpdateState({
                        ip: value.ip,
                        location: [value.region, value.country].join(","),
                        lat: value.loc.split(",")[0].trim(),
                        log: value.loc.split(",")[1].trim(),
                        timezone: value.timezone,
                        isp: value.org
                    });
                }).catch((err) => {
                    console.log("connection error", err);
                });
        }
        inputref.current.value="";
    }
    return <header>
        <h2>IP Address Tracker</h2>
        <form onSubmit={onSubmitHandler}>
            <input type="text" placeholder="Search for any IP address or domain" required={true} name="ipaddress" ref={inputref}/>
            <button type="submit"><img src={require("../images/icon-arrow.svg").default} alt="arrow"/></button>
        </form>
        <IPInfoCard ipinfo={props.ipinfo}/>
    </header>
};
export default Header;