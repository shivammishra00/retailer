import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";

// here define props type //
interface PropsType {
  pid: string;
}

// here define List  Types //
interface ListTypes {
    pid: string;
    imageid: string;
    image: File | null;
    description: string;
    color: string;
    uploadon: Date;
}

export default function ViewImage({ pid }: PropsType) {

  const [showModal, setshowModal] = useState<boolean>(false);
  const[list, setlist] = useState<ListTypes[]>([])
  console.log(list)

//====== yadi list me kuchh data hai tahi print kare for error handling ==========///
  if(list[0]){
      console.log(list[0].description)
    }

  const getImage = async () =>{
    try{
        await axios.get(`http://localhost:5000/api/retailer/productImages/viewImage/`+ pid)
        .then(res => {
            // console.log(res)
            if(res.data.Status){
                setlist(res.data.result)
            }
        })
        .catch(err => console.log(err))
    } catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    getImage()
  }, [])
  return (
    <div>
        {/* here create button for viewImage   */}
      <FaRegEye className="text-danger" size={26} onClick={() => setshowModal(true)} />

      <Modal
        show={showModal}
        onHide={() => setshowModal(false)}
        style={{ marginTop: "40px", marginBottom: "70px" }}
      >
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">
            View Image Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {list.length > 0 ? (<p>{list[0].description}</p>): (<h3>data not existed</h3>)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowModal(false)}>
            Close
          </Button>
          <Button variant="primary">Upadate</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
