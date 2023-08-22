const nodemailer = require('nodemailer');
const ejs = require("ejs");
const path = require("path");
const XLSX = require("xlsx");
const sql = require('mssql')
const sqlConfig = require('../database/config')

const workSheetRecurringColumnName =[
  "File Number",
  "Department",
  "Remark",
  "Type Of Retrival",
  "Type of Selivery"
];

const workSheetRecurringName = 'Request'
const Recurringfilepath =  './controller/Excel/request.xlsx'

const dataList = [ 
  {
    Vendor:"Aman",
    Account_number:"ssfds",
    Reference:"sdss",
    Recurring_Amount:"123123",
    Location:"shsdjkfsd",
    Frequency:"sdsds",
    Invoice_date:"xschsdjkchkjsd"
  }
]


function Email(req,res){
  const requestData = req.body.requestData;
  console.log(requestData)

  const data = requestData.map(user=>{
    return [user.filenumber,user.Department,user.remark,user.typeofretrival,user.typeofdelivery]
  })

  const workBook = XLSX.utils.book_new();
  const workSheetData = [
    workSheetRecurringColumnName,
    ...data
  ]
  const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
  XLSX.utils.book_append_sheet(workBook,workSheet,workSheetRecurringName);
  XLSX.writeFile(workBook,path.resolve(Recurringfilepath));
  console.log(workBook.Props.Worksheets);
  if(workBook.Props.Worksheets>0){
    RecurringEmail(requestData)
  }
  return true;

}


const RecurringEmail = async(requestData,req,res)=>{
  console.log(requestData)
      subject = `Web Request from DoxAndBox portal `
      var html = await ejs.renderFile(path.join(__dirname, `../templates/request.ejs`),requestData[0])

    try {

      await sql.connect(sqlConfig)
      const credentials = await sql.query(`select UNAME,UPASS From Tbl_mailconfig  with (nolock) where  [flag] =2`)
      const customerMail = await sql.query(`select [CustMailID] ,[MailID] ,[CCMailID] From RMSPORTAL_Cust with (nolock) where  mailsent ='YES' and custid='ORBIS' and wh='GGN2'`)
      console.log(credentials.recordset[0])
      console.log(customerMail.recordset[0])


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
        to: `${customerMail.recordset[0].CustMailID}`, // list of receivers
        cc:[`${customerMail.recordset[0].CCMailID}`],
        subject: subject, // Subject line
        html: html, // html body
        attachments:[
          {
          filename:'request.xlsx',
          path: './controller/Excel/request.xlsx'
          }
  
        ]
      })

    }
    catch(err){
      console.log(err);
    } 
  }



  module.exports = {Email}