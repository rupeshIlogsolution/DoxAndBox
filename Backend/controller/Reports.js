const sql =require('mssql')
const sqlConfig = require('../database/config')

const Reportdata = async (req, res) => {
    const uid_id = req.body.uid_id;
    const location_id = req.body.location_id;
    const department = req.body.department; 
    console.log(department)
    try{
        await sql.connect(sqlConfig)
        if(department == 'All'){
        const result = await sql.query(`select  distinct s.fileno as Fileno,f.DESCN  as FileName from  tbl_inwardfile as f  with (nolock) left join TBL_INWARDFILESCAN
        as s on f.custid=s.CUSTID and f.WH=s.WH and f.fileNO=s.fileno  where  s.CUSTID='${uid_id}' and s.WH='${location_id}' and   s.fileno is not null order by s.fileno desc `)
        res.send(result.recordset)
        }else{
            const result = await sql.query(`select distinct s.fileno as Fileno,f.DESCN as FileName from tbl_inwardfile as f with (nolock) left join TBL_INWARDFILESCAN
            as s on f.custid=s.CUSTID and f.WH=s.WH and f.fileNO=s.fileno where s.CUSTID='${uid_id}' and s.WH='${location_id}' and f.department='${department}'
            and s.fileno is not null order by s.fileno desc `)
            res.send(result.recordset) 
        }
    }
    catch(err){
        res.send(err)
        }
}

const ReportdataBoxes = async (req, res) => {
const uid_id = req.body.uid_id;
const location_id = req.body.location_id;
const department = req.body.department; 
console.log(department)


try{
    await sql.connect(sqlConfig)
    if(department == 'All'){

    const result = await sql.query(`select   distinct  s.Boxno,Upper(i.DESCN) as Description  from TBL_INWARDBOXSCAN as s with (nolock) left join tbl_inwardbox as i with (nolock)
    on s.boxno=i.BoxNO and s.CUSTID=i.custid and s.PICKUPNO=i.PICKUPNO
    where isnull(s.boxno,'')<>''  and s.custid='${uid_id}' and s.wh='${location_id}' and s.SCANSTATUS='YES'
    UNION All select  distinct  Boxno,'' as Description from TBL_INWARDFILESCAN with (nolock) where isnull(boxno,'')<>''and custid='${uid_id}'and wh='${location_id}'and SCANSTATUS='YES'`)
    res.send(result.recordset)
    }else{
        const result = await sql.query(`select distinct s.Boxno,Upper(i.DESCN) as Description from TBL_INWARDBOXSCAN as s with (nolock) left join tbl_inwardbox as i with (nolock)
          on s.boxno=i.BoxNO and s.CUSTID=i.custid and s.PICKUPNO=i.PICKUPNO and i.department='${department}'
        where isnull(s.boxno,'')<>'' and s.custid='${uid_id}' and s.wh='${location_id}'
        and s.SCANSTATUS='YES'
        UNION All select distinct Boxno,'' as Description from TBL_INWARDFILESCAN with (nolock) where isnull(boxno,'')<>''and custid='${uid_id}'and
        wh='${location_id}'and SCANSTATUS='YES'`)
        res.send(result.recordset)
    }
}
catch(err){
    res.send(err)
    }
}

const RequestReport = async (req, res) => {
    const cust_id = req.body.cust_id;
    const request_type = req.body.request_type;
    
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  *,convert(varchar(15),request_date,121) as ActivityDate  from  tbl_rmsrequest with (nolock) where  request_type='${request_type}'  and custid='${cust_id}'`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
    }

    const BoxReport = async (req, res) => {
        const Boxno = req.body.Boxno;
        const CUSTID = req.body.CUSTID;
        const Wh =  req.body.WH
        try{
            await sql.connect(sqlConfig)
            const result = await sql.query(`select distinct t.boxno as Boxno,i.fileNO as Fileno,i.DESCN as Filename,ItemLocation as Location from TBL_INWARDFILESCAN   t with (nolock) left join tbl_inwardfile i with (nolock) on  t.custid= i.custid and t.WH=i.WH and t.PICKUPNO=i.PICKUPNO
            and t.fileno=i.fileno where  t.boxno='${Boxno}' and  i.CUSTID='${CUSTID}' and t.WH='${Wh}'`)
            res.send(result.recordset)
        }
        catch(err){
            res.send(err)
            }
        }

        const TotalScanReportCount = async (req, res) =>{
            const custid = req.body.custid;
            const wh = req.body.wh;
            const startdate = req.body.startdate;
            const enddate = req.body.enddate;
            try{
                await sql.connect(sqlConfig)
                const result = await sql.query(`select  sum(cast(noofpagescan as INT)) as Pagescan,sum(cast(NOFilescan  as INT)) as TotalFile   from tbl_Scanrecord where custid='${custid}' and wh='${wh}' and CONVERT(date,Scandate) between '${startdate}' and '${enddate}'`)
                res.send(result.recordset)
            }
            catch(err){
                res.send(err)
            }
        }



const DepartmentData = async (req, res) => {
    const uid_id = req.body.uid_id;
    const location_id = req.body.location_id; 
    console.log(`select  distinct department   From   tbl_inwardfile with (nolock) where    CUSTID='${uid_id}' and wh='${location_id}' and  isnull(department,'') <>'' order by department`)
    try{
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  distinct department   From   tbl_inwardfile with (nolock) where    CUSTID='${uid_id}' and wh='${location_id}' and  isnull(department,'') <>'' order by department`)
        res.send(result.recordset)
    }
    catch(err){
        res.send(err)
        }
}


module.exports ={Reportdata,ReportdataBoxes,RequestReport,BoxReport,TotalScanReportCount,DepartmentData}