import axios from "axios";
import CustomError from "../models/CustomError.js";
import { statusReportByMail } from "./notification.js";
const URL_TO_CHECK = "http://localhost:5000"
 
export const ping = (req, res, next) => {

    let start = new Date(), //the start time of monitoring
        factor = 1.00,      //how much time to wait (minutes) before sending a success report 
        serverStatus = "up",
        timeElapsed    

    let refresh = setInterval(() => {
        axios.get(URL_TO_CHECK, {timeout: 5000}) //how much time to wait for a response before failing
            .then(response => {
                console.log("Response: ", response.data);
            })                                             
            .catch(err => {
                //server is down, stop making requests
                clearInterval(refresh)
                console.log("server went down....");
                serverStatus = "down"
                next(new CustomError(400, "server went down.."));
            })
            .finally(() => {
                //calculate total time (minutes) while server is running
                timeElapsed = ((new Date() - start) / 1000 / 60).toFixed(2)
                console.log(timeElapsed);
                //send a success report every (factor) minutes
                if (timeElapsed > factor) {
                    statusReportByMail(timeElapsed, serverStatus)
                    factor += 1.00
                }
                //server is down, notify by sending a report
                else if (serverStatus == "down")
                    statusReportByMail(timeElapsed, serverStatus)
                    
        })

        
    }, 5 * 1000 * 60); //make a request to monitored sever every 10 minutes
        

}


