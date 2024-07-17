import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { MdAddBox } from "react-icons/md";

// here define props type //
interface PropsType {
    pid: string;
}

// here define Input Data Types //
interface InputDataTypes {
    pid: string;
    imageid: string;
    image: File | null;
    description: string;
    color: string;
}

export default function AddImage({pid}:PropsType):React.JSX.Element {

    const [showModal, setshowModal] = useState<boolean>(false);
    const [inputData, setinputData] = useState<InputDataTypes>({
        pid: pid,
        imageid: "IMG01",
        image: null,
        description: "this is mobile image",
        color: "blue"
    })

    // here manage handleChange //
    const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value, files} = e.target as HTMLInputElement;
        if(files){
            setinputData({...inputData, [name]:files[0]})
        }
        else{
            setinputData({...inputData, [name]: value})
        }
    }

    // end handle change manage //

    console.log(inputData)

    const handleSubmit = async () =>{
        const formdata = new FormData();
        formdata.append('pid', inputData.pid)
        formdata.append('imageid', inputData.imageid)
        if(inputData.image){
            formdata.append('image', inputData.image)
        }
        formdata.append('description', inputData.description)
        formdata.append('color', inputData.color)
       
        try{
            await axios.post(`http://localhost:5000/api/retailer/productImages/addimage`, formdata)
            .then(res => {
                console.log(res)
                if(res.data.Status){
                    setshowModal(false);
                    toast.success(res.data.Message);
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
        {/* <p>==== this this add button for add Image =====</p> */}
       <MdAddBox className='text-primary' size={26} onClick={() => setshowModal(true)}/>
        
      <Modal
        show={showModal}
        onHide={() => setshowModal(false)}
        style={{ marginTop: "40px", marginBottom: "70px"}}
      >
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">Add Product Image</Modal.Title>
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
              <label className="form-label">Image Id</label>
              <input type="text" className="form-control" name="imageid"
              value={inputData.imageid} onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Product Photo</label>
              <input type="file" className="form-control" name="image" 
              onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Color</label>
              <input type="text" className="form-control" name="color" 
              value={inputData.color} onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={2} name="description" 
              value={inputData.description} onChange={handleChange}
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
          <Button variant="primary" onClick={handleSubmit}>
            +Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
