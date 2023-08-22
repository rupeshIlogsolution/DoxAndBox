const sql = require('mssql')
const sqlConfig = require('../database/config')

const insertscannerportaldetails = async (req, res) => {
    const Requestid = req.body.Requestid
    const Requesttype = req.body.Requesttype
    const StartReading = req.body.StartReading
    const Endreading = req.body.Endreading;
    const Arriveddate = req.body.Arriveddate;
    const ArrivedTime = req.body.ArrivedTime;
    const Imagelink = req.body.Imagelink;
    const Totalpagesscan = req.body.Totalpagesscan;
    const Remarks = req.body.Remarks;
    const EntryBy = req.body.EntryBy;
    const Noboxes = req.body.Noboxes;
    const Nooffiles = req.body.Nooffiles;
    const Activity = req.body.Activity;
    const Portalid = req.body.Portalid;
    const Assetid = req.body.Assetid;
    const Assetname = req.body.Assetname;
    const ActivityGLcode = req.body.ActivityGLcode;

    try {
        await sql.connect(sqlConfig)
        const check_date = await sql.query(`select sno from NEWRMSDB.dbo.tbl_UserPortaldetails WHERE Requestid='${Requestid}' 
        and CONVERT(date,Arriveddate)=cast(GETDATE() as Date)`)

        if (!check_date.recordset.length) {
            const check_blank = await sql.query(`select  Requestid from tbl_UserPortaldetails with (nolock)  where isnull(Endreading,'')='' 
            and isnull(Totalpagesscan,'')='' and Requestid='${Requestid}'`)

            if (!check_blank.recordset.length) {
                const result = await sql.query(`insert into NEWRMSDB.dbo.tbl_UserPortaldetails(Requestid,Requesttype,StartReading,Endreading,Arriveddate,ArrivedTime,Imagelink,Totalpagesscan,Remarks,EntryBy,Entrydate,Portalid,Noboxes,Nooffiles,Activity,Assetid,Assetname,ActivityGLcode,Updateddate) 
                                                 values('${Requestid}','${Requesttype}','${StartReading}','${Endreading}','${Arriveddate}','${ArrivedTime}','${Imagelink}','${Totalpagesscan}','${Remarks}','${EntryBy}',getdate(),'${Portalid}','${Noboxes}','${Nooffiles}','${Activity}','${Assetid}','${Assetname}','${ActivityGLcode}',getdate())`)

                res.status(200).send({ message: 'Added' })
            }
            else {
                res.status(208).send({ message: 'Not Acceptable' })
            }
        }
        else {
            res.status(208).send({ message: 'Already' })
        }
    }
    catch (err) {
        res.send(err)
    }
}

const updateportalrequest = async (req, res) => {
    const Endreading = req.body.Endreading;
    const Totalpagesscan = req.body.Totalpagesscan;
    const Noboxes = req.body.Noboxes;
    const Nooffiles = req.body.Nooffiles;
    const Activity = req.body.Activity;
    const Remarks = req.body.Remarks;
    const Portalid = req.body.Portalid;

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`update NEWRMSDB.dbo.tbl_UserPortaldetails set Endreading='${Endreading}' , Totalpagesscan='${Totalpagesscan}',Noboxes='${Noboxes}',Nooffiles='${Nooffiles}',Remarks='${Remarks}',Updateddate=getdate() where Portalid='${Portalid}'`)
        res.send("updated")
    }
    catch (err) {
        console.log(err)
    }
}

const scannerportaldatamorethanone = async (req, res) => {
    const EntryBy = req.body.EntryBy;
    const Arriveddate = req.body.ArrivalDate;
    const Requesttype = req.body.RequestType;
    const Requestid = req.body.Requestid
    console.log(EntryBy)

    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select * from NEWRMSDB.dbo.tbl_UserPortaldetails tup WHERE  EntryBy = '${EntryBy}' and Arriveddate = '2023-06-27' and Requesttype='${Requesttype}' and Requestid = '${Requestid}'`)
        if (result.recordset[0]) {
            result.send('no data')
        } else {
            res.send(result.recordset)
        }
    }
    catch (err) {
        res.send(err)

    }
}

const totalportalrequest = async (req, res) => {
    const EntryBy = req.body.EntryBy;
    const requesttype = req.body.requesttype
    try {
        await sql.connect(sqlConfig)

        if (requesttype === "all") {
            const result = await sql.query(`select u.Portalid,u.Requestid,convert(varchar(15),arriveddate,105)  as Arriveddate,u.Requesttype,c.custname,c.custid,case when isnull
            (u.portalstatus,'')='' then 'Open' else 'Close' END AS [RequestStatus] From tbl_UserPortaldetails u with (nolock) left join   tbl_rmsrequest  r with (nolock) on  u.Requestid=r.requestid left join
            NEWAWLDB.dbo.tbl_customer c with (nolock) on r.custid=c.custid   where u.EntryBy='${EntryBy}'  order by u.Arriveddate desc `)
            if (result.recordset) {
                res.send(result.recordset)
            } else {
                res.send('no data')
            }

        } else {
            const result = await sql.query(`select  distinct requestid,requesttype,convert(varchar(15),arriveddate,105) as ARRIVEDDATE,portalid  from  NEWRMSDB.dbo.tbl_userportaldetails with (nolock) where entryby='${EntryBy}' and Requesttype='${requesttype}' order by Arriveddate DESC  `)
            if (result.recordset) {
                res.send(result.recordset)
            } else {
                res.send('no data')
            }
        }
    }
    catch (err) {
        res.send(err)
    }
}

const totalscannerdetails = async (req, res) => {
    const Requestid = req.body.Requestid
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select  Scnmodelno,Scannermodel  From tbl_DboxAllocate_Scanning  with (nolock) where  Requestid='${Requestid}'`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const getportalrequest = async (req, res) => {
    const Portalid = req.body.Portalid
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`select *,convert(varchar(15),arriveddate,105) as ARRIVEDDATE from NEWRMSDB.dbo.tbl_userportaldetails where Portalid = '${Portalid}'`)
        res.send(result.recordset[0])
    }
    catch (err) {
        res.send(err)
    }

}

const requestidforuser = async (req, res) => {
    const empid = req.body.empid;
    const reqtype = req.body.reqtype;
    console.log(`   select distinct r.Requestid From NEWRMSDB.dbo.RMS_requestDBOX r with (nolock) left join NEWRMSDB.dbo.tbl_Dboxallot_emp d with (nolock)
    on r.Requestid=d.Requestid  left join tbl_rmsrequest t with (nolock) on t.requestid=d.Requestid where d.Allotempid='${empid}'and t.request_type='${reqtype}' and isnull(r.status,'')=''`)
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(` 
        select distinct r.Requestid From NEWRMSDB.dbo.RMS_requestDBOX r with (nolock) left join NEWRMSDB.dbo.tbl_Dboxallot_emp d with (nolock)
        on r.Requestid=d.Requestid  left join tbl_rmsrequest t with (nolock) on t.requestid=d.Requestid where d.Allotempid='${empid}'and t.request_type='${reqtype}' and isnull(r.status,'')=''`)
        res.send(result.recordset)
    }
    catch (err) {
        res.send(err)
    }
}

const FileUploadinDB = async (req, res) => {
    const portalid = req.body.portalid;
    const requestid = req.body.requestid;
    const custid = req.body.custid;
    const Imagelink = req.body.Imagelink;
    const EntryBy = req.body.EntryBy;
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query(`insert into NEWRMSDB.dbo.Dbox_portalimageupload(portalid,requestid,custid,Imagelink,EntryBy,Entryon) 
        values('${portalid}','${requestid}','${custid}','${Imagelink}','${EntryBy}',getdate())`)
        res.send(result.recordset)
        console.log(result.recordset)
    }
    catch (err) {
        res.send(err)
    }

}

module.exports = { insertscannerportaldetails, scannerportaldatamorethanone, totalportalrequest, totalscannerdetails, getportalrequest, updateportalrequest, requestidforuser, FileUploadinDB }
