import React from "react";
import './Main.css'

function Main() {

    function retrieveData(){ 

    }
    return (
        <div className="main">
            <h1> Deed Scrapper</h1>
            <form>
                <input type="text" id="address" name="address" placeholder="Search by address ..." />
                <input type="button" value="Retrieve Deed" onClick={retrieveData}/>
            </form>
        </div>
    )
}

export default Main