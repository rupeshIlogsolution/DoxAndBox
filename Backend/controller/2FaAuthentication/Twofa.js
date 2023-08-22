const twofactor = require("node-2fa");
const sql = require('mssql')
const sqlConfig = require('../../database/config.js')
const os = require('os')

const GenerateTwofa = async function(req,res){
    const email = req.body.email;
    const org = req.body.org;
    console.log(email,org)
    try{
      const newSecret = twofactor.generateSecret({ name: org, account: email });
      if(newSecret){
        res.send(newSecret)
      }else{
        res.send("ScanAgain")
      }
    }  catch (err) {
        console.log(err)
    }
  }


  const VerifyTwofa = async function (req,res){
    const secret = req.body.secret;
    const otp = req.body.otp;
    const userid = req.body.userid;

    try{
        await sql.connect(sqlConfig)
      const result = twofactor.verifyToken(secret, otp);
      if(result && result.delta === 0){
        const Twofa = await sql.query(`insert into tbl_authenticator (secretkey,authallow,username) values('${secret}','yes','${userid}')`)
        res.send("Verify")
      }else{
        res.send("NotVerify")
      }
    }catch (err) {
        console.log(err)
    }
  }

  module.exports = {GenerateTwofa,VerifyTwofa}
