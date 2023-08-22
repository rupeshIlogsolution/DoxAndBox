const sql =require('mssql')
const sqlConfig3 = require('../database/config3')

const Activityrequest = async (req, res) => { 
    try{
        const pool = new sql.ConnectionPool(sqlConfig3);
        await pool.connect();
        const result = await pool.query(`select distinct minor,revgl_code From tbl_BillingSUB1 with (nolock) where Company='DOX&BOX' and ISNULL(revgl_code,'')<>'' order by minor asc`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

module.exports = {Activityrequest}