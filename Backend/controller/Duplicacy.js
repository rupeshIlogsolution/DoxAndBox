const sql =require('mssql')
const sqlConfig = require('../database/config')

const ShreddingDupliacte = async (req, res) => { 
    const files = req.body.files;
    const CUSTID =req.body.CUSTID;
    const WH = req.body.WH;
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select fileno From TBL_INWARDFILESCAN where fileno in ('${files.map(data => data.file_number).join("','")}') and CUSTID='${CUSTID}' and WH='${WH}'`)
        res.send(result.recordset.map(item => item))
    }
    catch(err){
        res.send(err)
        }
}

module.exports = {ShreddingDupliacte}