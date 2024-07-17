import React,{useState} from 'react';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import toast from 'react-hot-toast';

interface DescriptionList {
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

//  ========  Props variable type here define  ======= //
interface UpdateDescriptionProps {
    list: DescriptionList[];
    showDescription : () => void
  }

//=====  update state ke liye type yaha define kiye gaye hai  =====//
interface UpdateListType {
    discription: string;
    size: string;
    weight: string;
    ram: string;
    rom: string;
    battery: string;
    processer: string;
    camera: string;
}

export default function UpdateDescription({list, showDescription}:UpdateDescriptionProps):React.JSX.Element {
    const[showModal, setshowModal] = useState<boolean>(false);
    const [updateData, setupdateData] = useState<UpdateListType>({
        discription: list[0].discription,
        size: list[0].size,
        weight: list[0].weight,
        ram: list[0].ram,
        rom: list[0].rom,
        battery: list[0].battery,
        processer: list[0].processer,
        camera: list[0].camera,
    })

    console.log(updateData)

    // console.log(list)
    // console.log(list[0].pid)

    //============== update ke liye api ================//
    const handleUpdate = async () =>{
        try{
            await axios.patch(`http://localhost:5000/api/retailer/productDescription/updateDescription/`+ list[0].pid, updateData)
            .then(res => {
                console.log(res)
                if(res.data.Status){
                    toast.success(res.data.Message)
                    showDescription();
                    setshowModal(false);
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
        <Button variant="primary" onClick={()=>setshowModal(true)}>
            Update Description
        </Button>

       <Modal
        show={showModal}
        onHide={() => setshowModal(false)}
        style={{ marginTop: "35px", marginBottom: "70px"}}
      >
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">Update Product Discription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3 p-3">
            <div className="col-md-6">
              <label className="form-label">Product Id</label>
              <input type="text" className="form-control" name="pid"
              value={list[0].pid} readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Product Size</label>
              <input type="text" className="form-control" name="size"
              value={updateData.size}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Discription</label>
              <textarea className="form-control" rows={2} name="discription" 
              value={updateData.discription}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Weight</label>
              <input type="text" className="form-control" name="weight" 
             value={updateData.weight}
             onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Ram</label>
              <input type="text" className="form-control" name="ram" 
              value={updateData.ram}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Rom</label>
              <input type="text" className="form-control" name="rom" 
              value={updateData.rom}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Processer</label>
              <input type="text" className="form-control" name="processer" 
              value={updateData.processer}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Battery</label>
              <input type="text" className="form-control" name="battery" 
              value={updateData.battery}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Camera</label>
              <input type="text" className="form-control" name="camera"
              value={updateData.camera}
              onChange={(e)=>setupdateData({...updateData, [e.target.name]:e.target.value})}
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
          <Button variant="primary" onClick={()=>handleUpdate()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
