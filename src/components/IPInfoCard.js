const IPInfoCard=(props)=>{
    return <ul className="ipinfocard">
        <li>
            <span className="labeling">ip address</span>
            <span className="information">{props.ipinfo.ip}</span>
        </li>
        <hr/>
        <li>
            <span className="labeling">location</span>
            <span className="information">{props.ipinfo.location}</span>
        </li>
        <hr />
        <li>
            <span className="labeling">TimeZone</span>
            <span className="information">{props.ipinfo.timezone}</span>
        </li>
        <hr />
        <li>
            <span className="labeling">ISP</span>
            <span className="information">{props.ipinfo.isp}</span>
        </li>
    </ul>
};
export default IPInfoCard;