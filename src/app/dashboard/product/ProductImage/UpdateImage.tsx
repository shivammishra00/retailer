import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

interface PropsType {
    list: ListTypes[];
    getImage: () => void
  }
  
  // here define List  Types //
  interface ListTypes {
      pid: string;
      imageid: string;
      image: File | null | any;
      description: string;
      color: string;
      uploadon: Date;
  }

//   input types here define //
 interface InputDataTypes {
    image: File | null | any;
    description : string;
    color: string;
 }

export default function UpdateImage({list, getImage}:PropsType) {
    // console.log(list[0].pid)

    const [showModal, setshowModal] = useState<boolean>(false);

    const [inputData, setinputData] = useState<InputDataTypes>({
        image: list[0].image,
        description: list[0].description,
        color: list[0].color
    })

    // here logic for handle change //
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value, files} = e.target as HTMLInputElement;
        if(files){
            setinputData({...inputData, [name]: files[0]})
        }
        else{
            setinputData({...inputData, [name]: value}) 
        }
    }

    // here create update api //
    const handleUpdate = async () =>{

        const formdata = new FormData();
        formdata.append("image", inputData.image);
        formdata.append("description", inputData.description);
        formdata.append("color", inputData.color);

        try{
            await axios.patch(`http://localhost:5000/api/retailer/productImages/updateImage/`+ list[0].imageid, formdata)
            .then(res => {
                console.log(res)
                if(res.data.Status){
                    toast.success(res.data.Message)
                    getImage();
                    setshowModal(false);
                }
                else{
                    toast.success(res.data.Error)
                }
            })
        } catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        {/* here create update button  */}
        <Button variant="primary" onClick={()=> setshowModal(true)}>Upadate</Button>

        <Modal
        show={showModal}
        onHide={() => setshowModal(false)}
        style={{ marginTop: "35px", marginBottom: "70px"}}
      >
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">Update Product Image</Modal.Title>
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
              <label className="form-label">Image Id</label>
              <input type="text" className="form-control" name="size"
             value={list[0].imageid} readOnly
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Color</label>
              <input type="text" className="form-control" name="color" 
              value={inputData.color} onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Product Photo</label>
              <input type="file" className="form-control" name="image" 
             onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Discription</label>
              <textarea className="form-control" rows={2} name="discription" 
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
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}
