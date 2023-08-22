const sql =require('mssql')
const sqlConfig1 = require('../database/config1')

const lastcount = async (req, res) => { 
    const whid = req.body.whid 
    try{
        const pool = new sql.ConnectionPool(sqlConfig1);
        await pool.connect();
        const result = await pool.query(`select  (rmspickup+1) as hh From NEWAWLDB.dbo.tbl_whmaster with (nolock) where  WHid='${whid}'`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

const UpdateCount = async (req, res) => {
    const whid = req.body.whid;
    const Idcount = req.body.Idcount;
    console.log(whid, Idcount)
    try{
        const pool = new sql.ConnectionPool(sqlConfig1);
        await pool.connect();
        const result = await pool.query(`update NEWAWLDB.dbo.tbl_whmaster set rmspickup='${Idcount}' where WHid='${whid}'`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}

module.exports={lastcount,UpdateCount}