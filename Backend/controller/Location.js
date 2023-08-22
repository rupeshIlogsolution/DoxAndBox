const sql =require('mssql')
const sqlConfig = require('../database/config')

const locations = async (req, res) => { 
    const custid = req.body.custid
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select w.WHid,w.WHname from  tbl_WHCustmapping as c  with (nolock)  left join  NEWAWLDB.dbo.tbl_whmaster as w with (nolock)
        on c.WHID=w.WHid where c.CUSTID='${custid}' order by w.WHname asc`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

module.exports ={locations}