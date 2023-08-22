import React, { useState, useEffect } from 'react'
import Navbar from '../../Navbar/Navbar';
import { rmsRequest, ReportData, Totallocation, ShreddingDupliacte } from '../../../api/index'
import Select from 'react-select';
import * as XLSX from "xlsx";
import ExcelFormat from '../../ExcelFormat/DoxAndBoxShredding.xlsx'
import './Shredding.css'
import svg from '../../Images/phoneicon.png'
import { MdClear } from 'react-icons/md';
import { BsFillChatSquareQuoteFill } from 'react-icons/bs';
import Footer from '../../Navbar/Footer'


function Shredding() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [data, setData] = useState([]);
    const [selectfiles, setSelectFiles] = useState([]);
    const [totallocation, setTotallocation] = useState([])
    const [exceldata, setExcelData] = useState([])
    const [duplicate, setDuplicate] = useState([]);

    useEffect(() => {
        const data = async () => {
            const result = await ReportData(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'),'All')
            console.log(result)
            setData(result)
            const Totallocationresult = await Totallocation();
            setTotallocation(Totallocationresult)
        }
        data()
    }, [])

    let options = data.map((ele) => {
        return { value: ele.Fileno, label: `${ele.Fileno}, ${ele.FileName}` };
    })

    const handleClick = async (e) => {
        e.preventDefault();
        // const file_name = document.getElementById('Search&Select').value;
        const noof_pages = document.getElementById('noofpages').value;
        const request_date = document.getElementById('dateofShreading').value;
        const onsite = document.getElementById('onSite').value;
        const remark = document.getElementById('remark').value;
        const locationid = localStorage.getItem('Warehouse_ID')
        const fileid = locationid + Math.floor(Math.random() * 10000000)
        const requestid = locationid + '-' + Math.floor(Math.random() * 10000000) + '-' + 'SR'

        if (!onsite || !request_date) {
            setMandatoryfield(true)
        }
        else {
            if (noof_pages) {
                const result = await rmsRequest('ShreddingRequest', '', '', request_date, '', '', '', '', noof_pages, onsite, '', remark, localStorage.getItem('User_ID'), fileid, locationid.requestid, localStorage.getItem('CUST_ID'));

            } else if (exceldata.length > 0) {

                const result = await ShreddingDupliacte(exceldata, localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))

                const duplicate = (exceldata, result) => {
                    let res = []
                    res = exceldata.filter(el => {
                        return !result.find(obj => {
                            return el.file_number === obj.fileno
                        })
                    })
                    return res
                }
                const duplicatearray = duplicate(exceldata, result)
             
                if (duplicatearray.length > 0) {
                    setDuplicate(duplicatearray)
                    document.getElementById('duplicatemodal').style.display = "block"
                } else {
                    result.forEach(async (el) => {
                        const file_name = el.fileno
                        const result = await rmsRequest('ShreddingRequest', '', '', request_date, '', file_name, '', '', '', onsite, '', remark, localStorage.getItem('User_ID'), fileid, locationid, requestid, localStorage.getItem('CUST_ID'));
                    })
                    window.location.href = '/Dashboard'
                }


            }
            else {

                selectfiles.forEach(async (datas) => {
                    const file_name = datas.value

                    const result = await rmsRequest('ShreddingRequest', '', '', request_date, '', file_name, '', '', '', onsite, '', remark, localStorage.getItem('User_ID'), fileid, locationid, requestid, localStorage.getItem('CUST_ID'));
                })
                window.location.href = '/Dashboard'


            }

        }
    }

    const handleChange = (selectedOption) => {
        setSelectFiles(selectedOption)
    }

    const handleClickUpload = (e) => {
        e.preventDefault()
        console.log(exceldata)
    }

    const handleChangeExcel = (e) => {
        const [file] = e.target.files;
        console.log(file)
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
          
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            var lines = data.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            for (var i = 1; i < lines.length - 1; i++) {
                var obj = {};
                var currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                //   console.log('result',result)
                result.push(obj);
            }
            // console.log('result',result)
            setExcelData(result)

            // setImportdata(result);
        };
        reader.readAsBinaryString(file);

    }
    const handleChangesite = (e) => {
        console.log(e.target.value)
        if (e.target.value === "Yes") {
            document.getElementById('onsideShredding').style.display = "block"
            document.getElementById('NotonsideShredding').style.display = "none"
            document.getElementById('noofpages').value = " "
        } else {
            document.getElementById('onsideShredding').style.display = "none"
            document.getElementById('NotonsideShredding').style.display = "block"
            document.getElementById('search').value = ' '
        }
    }

    const handlelessthan = () => {
        document.getElementById('PagesToBeShred').style.display = "none";
        document.getElementById('Search&Select').style.display = "block";
        document.getElementById('noofpages').value = " "


    }

    const handlemorethan = () => {
        document.getElementById('PagesToBeShred').style.display = "block"
        document.getElementById('Search&Select').style.display = "none"
        document.getElementById('search').value = ' '

    }
    return (
        <>
            <div className="generatorlogcontainer">
                <Navbar />
              
                <div className='shredding'>
                <div className='svg_div'>
                
                    <img src={svg}/>
                    </div>
                    <div className='form'>
                        <form style={{ margin: "0px 20px 0px 15px",boxShadow:"8px 8px 5px 1px grey",padding:"40px 15px 0px",minHeight:"80vh",borderRadius:"7px",background:"white" }}>
                   
                        <h3 className='pb-3'>Shredding request <BsFillChatSquareQuoteFill style={{margin:"0 0 -9px 0",fontSize:"30px"}}/> </h3>
                            <div className="form-group " >
                                <label>On Site Shredding <span style={{ color: "red" }}>*</span></label>
                                <select className="form-control" id='onSite' onChange={handleChangesite} style={{ height: "32px" }}>
                                    <option defaultValue hidden>Choose ...</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>

                            <div className="form-group" id="onsideShredding" style={{ display: "none" }} >
                                <label>No of Files <span style={{ color: "red" }}>*</span></label>
                                <input type="number" className="form-control" id='noofpages' />
                            </div>



                            <div className="form-group" id="NotonsideShredding" >
                                <div className="radio">
                                    <label>
                                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" defaultChecked onClick={handlelessthan} />
                                        less than 10
                                    </label>
                                    &nbsp;&nbsp;
                                    <label>
                                        <input type="radio" name="optionsRadios" id="optionsRadios1" value="option2" onClick={handlemorethan} />
                                        more than 10
                                    </label>
                                </div>

                                <div className="form-group" id="Search&Select">
                                    <label>Search *</label>
                                    <Select
                                        id="search"
                                        options={options}
                                        isMulti={true}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="form-group" id="PagesToBeShred" style={{ display: "none" }}>
                                    <label>Shredd *</label>
                                    <br />
                                    <button className="btn maroon_btn" onClick={(e) => e.preventDefault()} data-toggle="modal" data-target="#exampleModalCenter">Upload Document</button>
                                    {/* <input type="number" className="form-control" id='noofpages' /> */}
                                </div>
                            </div>

                            {/* <div className="form-group"> */}
                            <div className="form-group " >
                                <label>Date Of Shredding <span style={{ color: "red" }}>*</span></label>
                                <input type="date" className="form-control" id='dateofShreading' />
                            </div>

                            {/* </div> */}

                            <div className="form-group">
                                <label>Remarks</label>
                                <textarea className="form-control" placeholder="Comments" type="text" id='remark' />
                            </div>
                            {
                                mandatoryfield ?
                                    <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
                                    : null
                            }
                            <div className="form-group">
                                <button type="submit" className="dark_btn btn float-right mb-4" onClick={handleClick}>Submit</button>
                                <button type="submit" className="maroon_btn btn mr-4 float-right mb-4">Reset</button>
                            </div>
                        </form>
                    </div>
                    
                </div>

                {/* Duplicate Array */}
                <div className="col" id="duplicatemodal" style={{ display: "none",width:"400px",margin:"-580px 34% 0" }}>
                    <div className="card text-center" style={{background:"rgba(34,34,34,0.9)"}}>
                        <p className="card-title mt-4 text-white" >This Data Already Exist</p>
                        <ol>
                            {
                                duplicate.map(element => (
                                    <li>{element.file_number}</li>
                                ))
                            }
                        </ol>

                        <div className="form-group">
                            <button type="button" onClick={(e) => { e.preventDefault(); window.location.reload() }} className="btn btn-danger mr-4 float-right mb-4">Cancel</button>
                        </div>
                    </div>
                </div>
                <div>



                </div>
            </div>

            {/* // Modal Start // */}
            <div class="modal fade mt-5" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class=" model_shredding modal-content">
                        <div class="modal-header">
                            <p class="modal-title text-white" id="exampleModalLongTitle">Upload Document</p>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <MdClear style={{color:"white"}}/>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input
                            style={{border:"1px solid white",background:"none"}}
                                id=""
                                type="file"
                                onChange={handleChangeExcel}
                                className="form-control"
                                accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                required="required"
                            />
                            <br />
                            <span >
                                <a style={{ color: "white" }}
                                    href={ExcelFormat}
                                    download> Download format</a>
                            </span>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="maroon_btn btn" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClickUpload} class="dark_btn btn ">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal End */}
            <Footer/>


        </>
    )
}

export default Shredding
