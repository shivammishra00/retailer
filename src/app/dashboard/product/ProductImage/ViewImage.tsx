import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import moment from "moment";
import UpdateImage from "./UpdateImage";

// here define props type //
interface PropsType {
  pid: string;
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
            {list.length > 0 ? (
                      <div>
                        <div className="d-flex justify-content-center">
                           <Image src={list[0].image} height={80} width={80} unoptimized alt="product picture" />
                        </div>
                        <div className="d-flex mt-2" style={{marginLeft:"100px"}}>
                          <h5>Product Id : <span style={{ marginLeft: "30px", color: "blue" }}>{list[0].pid}</span> </h5>
                        </div>
                        <div className="d-flex" style={{marginLeft:"100px"}}>
                          <h5>Image Id : <span style={{ marginLeft: "20px", color: "blue" }}>{list[0].imageid}</span> </h5>
                        </div>
                        <div className="d-flex" style={{marginLeft:"100px"}}>
                          <h5>Upload On:</h5>
                          <span style={{ marginLeft: "20px", color: "blue" }}>
                            <h5>{moment(list[0].uploadon).format('DD-MM-YYYY')}</h5>
                          </span>
                        </div>
                        <div className="d-flex" style={{marginLeft:"110px"}}>
                          <h5>Color:</h5>
                          <span style={{ marginLeft: "60px", color: "blue" }}>
                            <h5>{list[0].color}</h5>
                          </span>
                        </div>
                        <div className="d-flex" style={{marginLeft:"90px"}}>
                          <h5>Description:</h5>
                          <span style={{ marginLeft: "20px", color: "blue" }}>
                            <h5>{list[0].description}</h5>
                          </span>
                        </div>

                      </div>
                        ) : (
                              <p>data not existed</p>
                            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setshowModal(false)}>
            Close
          </Button>
          <UpdateImage list={list}  getImage={getImage}/>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
