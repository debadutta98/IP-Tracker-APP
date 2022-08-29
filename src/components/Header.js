import IPInfoCard from "./IPInfoCard";

const Header=()=>{
    return <header>
        <h2>IP Address Tracker</h2>
        <form>
            <input type="text" placeholder="Search for any IP address or domain" required={true}/>
            <button type="submit"><img src={require("../images/icon-arrow.svg").default} alt="arrow"/></button>
        </form>
        <IPInfoCard/>
    </header>
};
export default Header;