const sql =require('mssql')
const sqlConfig1 = require('../database/config1')

const ProfileDetails = async (req, res) => {
    const uid_id = req.body.uid_id;
 
    try{
        await sql.connect(sqlConfig)
        const pool = new sql.ConnectionPool(sqlConfig1);
        await pool.connect();

        const result = await pool.query(`SELECT custname,custemail,custadd ,custadd1 ,custcity ,custstate ,custpin ,custcountry ,
        convert(varchar(15),custdoe,105) as custdoe,custcontactno  
        from NEWAWLDB.dbo.tbl_customer tc  with (nolock) where custid ='${uid_id}'`)
        await pool.close()  
        res.send(result.recordset[0])
    }
    catch(err){
        res.send(err)
        }
}
module.exports ={ProfileDetails}