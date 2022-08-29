const IPInfoCard=()=>{
    return <ul className="ipinfocard">
        <li>
            <span className="labeling">ip address</span>
            <span className="information">192.212.174.101</span>
        </li>
        <hr/>
        <li>
            <span className="labeling">location</span>
            <span className="information">Brooklyn,NY10001</span>
        </li>
        <hr />
        <li>
            <span className="labeling">TimeZone</span>
            <span className="information">UTC-05:00</span>
        </li>
        <hr />
        <li>
            <span className="labeling">ISP</span>
            <span className="information">SpaceX Starlink</span>
        </li>
    </ul>
};
export default IPInfoCard;