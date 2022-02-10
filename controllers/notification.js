import nodemailer from 'nodemailer'

export const statusReportByMail = (uptime, serverStatus) => {

    /*send a status report of the monitored url by email
    *(up/down)?
    *total uptime/downtime
    *avg response time
   */
    const report = {
        serverStatus: serverStatus,
        upTime: "your server has been up for " + uptime + " minutes",
    }
    console.log(report);

 /* --------------- notify by sending an email using nodemailer -------------- */
   var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'monitor@gmail.com',
            pass: 'monitorPassword'
        }
}); 

    var mailOptions = {
        from: 'monitor@gmail.com',
        to: 'khalifaabdallah101@gmail.com',
        subject: 'server check up',
        text: {
            description: "this is an email to notify you about the status of your server",
            statusReport: report
        }
        };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });
}