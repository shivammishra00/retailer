"use client";
import Layout from "@/app/component/layout";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Tab, Tabs, Row, Col, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import {Modal, Button} from "react-bootstrap";

interface BankInputType {
  regno: string;
  accountno: string;
  accountname: string;
  bankname: string;
  ifsc: string;
  branchname: string;
  upi: string;
}

interface BankDetailsTypes {
  regno: string;
  shopname: string;
  accountname: string;
  accountno: string;
  bankname: string;
  ifsc: string;
  branchname: string;
  upi: string;
  status: string;
}

interface UpdateBankDetailsTypes {
  accountno: string;
  accountname: string;
  bankname: string;
  ifsc: string;
  branchname: string;
  upi: string;
}

export default function Banking() {

  const [inputData, setinputData] = useState<BankInputType>({
    regno: "RE1",
    accountno: "38935634562",
    accountname: "Shivank garg",
    bankname: "State bank",
    ifsc: "SBIN000A876",
    branchname :"satna",
    upi : "8884356433@gpay"
  });
  console.log("inputData",inputData)

  const [banklist, setbanklist] = useState<BankDetailsTypes[]>([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newregno, setnewregno] = useState<string>("")

  const [updateDetails, setupdateDetails] = useState<UpdateBankDetailsTypes>({
    accountno: "",
    accountname: "",
    bankname: "",
    ifsc: "",
    branchname: "",
    upi: ""
  })
   console.log(newregno)
   console.log(updateDetails)

  ////=========== create post api to add bank details  ===============//
  const handleSubmit = async (e:FormEvent) =>{
    e.preventDefault()
    try{
      await axios.post(`http://localhost:5000/api/retailer/banking/addBankDetails`, inputData)
      .then(res =>{
        console.log(res)
        if(res.data.Status){
          toast.success(res.data.Message)
        }
        else{
          toast.success(res.data.Error)
        }
      })
      .catch(err => console.log(err))
    } catch(err) {
      console.log(err)
    }
  }

  //////===========  create get api to get all bank details  =============///////
  const viewBankDetails = async () =>{
    try{
      await axios.get(`http://localhost:5000/api/retailer/banking/viewBankDetails`)
      .then(res =>{
        console.log(res)
        setbanklist(res.data.result)
      })
      .catch(err => console.log(err))
    } catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    viewBankDetails()
  }, [])


  /////==========  update modal call here ============////////
  const upadateModal = (regno:string, newaccountno:string, newaccountname:string, newbankname:string, newifsc:string, newbranchname:string, newupi:string) =>{
    // console.log(regno,accountno,accountname,bankname,ifsc,branchname,upi)
    setnewregno(regno)
    setupdateDetails({
      ...updateDetails,
      accountno: newaccountno,
      accountname: newaccountname,
      bankname: newbankname,
      ifsc: newifsc,
      branchname: newbranchname,
      upi: newupi
    })

    handleShow()
  }

  //////=========   create update api to update bank details    ==========/////////
  const updateBankDetails = async (newregno:string) =>{
    console.log(newregno)
    try{
      await axios.patch(`http://localhost:5000/api/retailer/banking/updateBankDetails/`+ newregno, updateDetails)
      .then(res => {
        console.log(res)
        if(res.data.Status){
          toast.success(res.data.Message)
          handleClose()
        }
        else{
          toast.success(res.data.Error)
        }
      })
      .catch(err => console.log(err)
      )
    } catch(err){
      console.log(err)
    }
  }
  return (
    <Layout>
      <>
        <div>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Add">
              <div className="d-flex flex-column align-items-center pt-4 mb-4">
                <div className="card mx-5  shadow-lg bg-light" style={{width:"70%"}}>
                  <div style={{border: "1px solid black", boxShadow: "3px 3px 3px 3px  #5DEBD7"}}>
                    <h4 className='text-center mt-2'>Add Bank Details</h4>

                    <form className="row g-3 p-3" onSubmit={handleSubmit}>
                      <div className="col-md-4">
                        <label className="form-label">Registration Number</label>
                        <input type="text" className="form-control" name="regno"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.regno}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Bank Account Number</label>
                        <input type="text" className="form-control" name="accountno"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.accountno}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Bank Account Name</label>
                        <input type="text" className="form-control" name="accountname"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.accountname}
                        />
                      </div>

                      <div className="col-md-12">
                        <label className="form-label">Bank Name</label>
                        <input type="text" className="form-control" name="bankname"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.bankname}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">IFSC</label>
                        <input type="text" className="form-control" name="ifsc"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.ifsc}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Branch Name</label>
                        <input type="text" className="form-control" name="branchname"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.branchname}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">UPI</label>
                        <input type="text" className="form-control" name="upi"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})} value={inputData.upi}
                        />
                      </div>

                      <button type='submit' className='btn btn-success w-50 rounded-0 mb-2  mt-3 d-block mx-auto '>
                         Add Details
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="View">
              <Row className="justify-content-center pt-4 mb-4">
                <Col xs={10} lg={11}>
                  <div className="container">
                    <div className="bg-light shadow-lg">
                      <div style={{border: "1px solid black", boxShadow: "3px 3px 3px 3px  #5DEBD7"}}>
                      <Table responsive >
                        <thead className="text-center thead-dark" >
                          <tr>
                            <th>S.No.</th>
                            <th style={{minWidth:"200px"}}>Registration Number</th>
                            <th style={{minWidth:"200px"}}>Shop Name</th>
                            <th style={{minWidth:"200px"}}>Bank Account Number</th>
                            <th style={{minWidth:"200px"}}>Bank Account Name</th>
                            <th style={{minWidth:"200px"}}>Bank Name</th>
                            <th>IFSC</th>
                            <th style={{minWidth:"200px"}}>Branch Name</th>
                            <th>UPI</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody className="text-center">
                          {banklist.map((d,index)=>{
                            return(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{d.regno}</td>
                                <td>{d.shopname}</td>
                                <td>{d.accountno}</td>
                                <td>{d.accountname}</td>
                                <td>{d.bankname}</td>
                                <td>{d.ifsc}</td>
                                <td>{d.branchname}</td>
                                <td>{d.upi}</td>
                                <td>{d.status}</td>
                                <td>
                                  <span>
                                    <FaEdit className="text-primary" size={26} 
                                    onClick={() => upadateModal(d.regno, d.accountno,    d.accountname, d.bankname, d.ifsc, d.branchname, d.upi)} />
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <Modal show={show} onHide={handleClose} style={{marginTop:"40px", marginBottom:"40px"}}>
                <Modal.Header className="d-block text-center">
                  <Modal.Title className="d-inline-block">Update Bank Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <form className="row g-3 p-3">
                          <div className="col-md-12">
                            <label className="form-label">Registration Number</label>
                            <input type="text" className="form-control" name="regno" 
                            value={newregno} readOnly />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Bank Account Number</label>
                            <input type="text" className="form-control" name="accountno"
                            value={updateDetails.accountno}
                            onChange={(e)=>setupdateDetails({...updateDetails, [e.target.name]:e.target.value})}
                           />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Bank Account Name</label>
                            <input type="text" className="form-control" name="accountname"
                            value={updateDetails.accountname}
                            onChange={(e)=>setupdateDetails({...updateDetails, [e.target.name]:e.target.value})}
                           />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Bank Name</label>
                            <input type="text" className="form-control" name="bankname"
                            value={updateDetails.bankname}
                            onChange={(e)=>setupdateDetails({...updateDetails, [e.target.name]:e.target.value})}
                           />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">IFSC</label>
                            <input type="text" className="form-control" name="ifsc"
                            value={updateDetails.ifsc}
                            onChange={(e)=>setupdateDetails({...updateDetails, [e.target.name]:e.target.value})}
                           />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Branch Name</label>
                            <input type="text" className="form-control" name="branchname"
                            value={updateDetails.branchname}
                            onChange={(e)=>setupdateDetails({...updateDetails, [e.target.name]:e.target.value})}
                           />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">UPI</label>
                            <input type="text" className="form-control" name="upi"
                            value={updateDetails.upi}
                            onChange={(e)=>setupdateDetails({...updateDetails, [e.target.name]:e.target.value})}
                           />
                          </div>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={()=>updateBankDetails(newregno)}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
            </Tab>
          </Tabs>
        </div>
      </>
    </Layout>
  );
}
