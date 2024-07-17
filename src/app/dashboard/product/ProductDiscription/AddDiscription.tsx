import axios from "axios";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdAddBox } from "react-icons/md";

interface PropsType {
  pid: string;
}

interface InputDataTypes {
  pid: string;
  discription: string;
  size: string;
  weight: string;
  ram: string;
  rom: string;
  screen: string;
  processer: string;
  mfd: string;
  expdate: string;
  material: string;
  originecountry: string;
  battery :string;
  camera: string;
}

export default function AddDiscription({pid}:PropsType):React.JSX.Element {

    const[showModal, setshowModal] = useState<boolean>(false)
    const [inputData, setinputData] = useState<InputDataTypes>({
      pid: pid,
      discription: "Brand Warranty of 1 Year Available for Mobile and 6 Months for Accessories",
      size: "6.5 inch",
      weight: "198 G",
      ram: "4 GB RAM",
      rom: "128 GB ROM",
      screen: "16.51 cm  HD + Display",
      processer: "Qualcomm Snapdragon 665 2 GHz Processor",
      mfd: "2001-03-02",
      expdate: "2006-04-05",
      material: "plastic",
      originecountry: "made in india",
      battery: "5000 mAH Battery",
      camera: "12MP + 8MP + 2MP + 2MP Quad Camera | 13MP Front Camera",
    });

    // console.log(inputData)

    // here create post api //
    const addDescription = async () =>{
      try{
        await axios.post(`http://localhost:5000/api/retailer/productDescription/addDescription`, inputData)
        .then(res => {
          console.log(res)
          if(res.data.Status){
            setshowModal(false)
            toast.success(res.data.Message)
          }
          else{
            toast.success(res.data.Error)
          }
        })
        .catch(err => console.log(err))
      } catch(err){
        console.log(err)
      }
    }
  return (
    <div>
      <MdAddBox className='text-primary ' size={26} onClick={() => setshowModal(true)}/>

      <Modal
        show={showModal}
        onHide={() => setshowModal(false)}
        style={{ marginTop: "40px", marginBottom: "70px"}}
      >
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">Add Product Discription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3 p-3">
            <div className="col-md-6">
              <label className="form-label">Product Id</label>
              <input type="text" className="form-control" name="pid"
              value={inputData.pid} readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Product Size</label>
              <input type="text" className="form-control" name="size"
              value={inputData.size}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Discription</label>
              <textarea className="form-control" rows={2} name="discription" 
              value={inputData.discription}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Weight</label>
              <input type="text" className="form-control" name="weight" 
             value={inputData.weight}
             onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Ram</label>
              <input type="text" className="form-control" name="ram" 
              value={inputData.ram}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Rom</label>
              <input type="text" className="form-control" name="rom" 
              value={inputData.rom}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Screen</label>
              <input type="text" className="form-control" name="screen" 
              value={inputData.screen}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Processer</label>
              <input type="text" className="form-control" name="processer" 
              value={inputData.processer}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Manufacturing Date</label>
              <input type="date" className="form-control" name="mfd" 
              value={inputData.mfd}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Expiry Date</label>
              <input type="date" className="form-control" name="expdate" 
              value={inputData.expdate}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Material</label>
              <input type="text" className="form-control" name="material"
              value={inputData.material}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Origine Country</label>
              <input type="text" className="form-control" name="originecountry" 
              value={inputData.originecountry}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Battery</label>
              <input type="text" className="form-control" name="battery" 
              value={inputData.battery}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Camera</label>
              <input type="text" className="form-control" name="camera"
              value={inputData.camera}
              onChange={(e)=>setinputData({...inputData, [e.target.name]:e.target.value})}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setshowModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={addDescription}>
            +Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
