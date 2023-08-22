const express = require('express');
const app = express();
const port = 8008
const sql = require('mssql')
const router = require('./router/router');
const bodyParser = require('body-parser')
const cors = require('cors')
const ejs = require("ejs");
const path = require("path");
const nodemailer = require('nodemailer');



app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use('/api',router)

app.get('/',function(req,res){
res.send('Hlo')
})

// app.post('/mail',async(req,res)=>{
//     const {Subject,message} = req.body


//     console.log(Subject,message)   
//     if(Subject === 'RecordPickup'){ 
//     var html = await ejs.renderFile(path.join(__dirname, `./templates/request.ejs`), message)
//     }
//     else if(Subject === 'ScanningRequest'){
//       var html = await ejs.renderFile(path.join(__dirname, `./templates/ScanningRequest.ejs`), message)
//     }
//     else if(Subject === 'Report'){
//     }
//     try{
//     sgMail.setApiKey(Api_Key);
//     const msg= {
//       to:["swishlohan420@gmail.com","aman@ilogsolution.com"],
//       from:"reports@doxandbox.co.in",
//       subject:Subject,
//       html:html
//                 }
//     sgMail.send(msg)
//      .then(res =>console.log("Mail Send Successfully"))
//        .catch(error => console.log(error))
//   }
//   catch(err){
//     console.log(err)

//           }
//      }
// )

app.post('/mail', async(req,res)=>{
  const {Subject,message} = req.body   
  
  console.log(Subject,message)
    if(Subject === 'ScanningRequest'){ 
    var html = await ejs.renderFile(path.join(__dirname, `./templates/ScanningRequest.ejs`), message)
    }
    else if(Subject === 'RecordPickup'){
      var html = await ejs.renderFile(path.join(__dirname, `./templates/PickupRequest.ejs`), message)
    }

    try {

      await sql.connect(sqlConfig)
      const credentials = await sql.query(`select UNAME,UPASS From Tbl_mailconfig  with (nolock) where  [flag] =2`)
      const customerMail = await sql.query(`select [CustMailID] ,[MailID] ,[CCMailID] From RMSPORTAL_Cust with (nolock) where  mailsent ='YES' and custid='ORBIS' and wh='GGN2'`)
      console.log(credentials.recordset[0])
      console.log(customerMail.recordset[0].MailID)



      let transporter =  nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false, 
        auth: {
          user: `${credentials.recordset[0].UNAME}`, // generated ethereal user
          pass:`${credentials.recordset[0].UPASS}`, // generated ethereal password
        },
      });
  
      let info = await transporter.sendMail({
        from: `${credentials.recordset[0].UNAME}`, // sender address
        to: `${customerMail.recordset[0].MailID}`, // list of receivers
        cc:[`${customerMail.recordset[0].CCMailID}`],
        subject: `${Subject} received from ${message.clientname} on ${message.requestdate}    ,ProjectID :-(${message.projectid})`, // Subject line
        html: html, // html body
      })

    }
    catch(err){
      console.log(err);
    } 
  }
)


app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
