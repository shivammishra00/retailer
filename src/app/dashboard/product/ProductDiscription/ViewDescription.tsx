import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEye } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import moment from 'moment';
import UpdateDescription from './UpdateDescription';


interface PropsType {
    pid: string;
}

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

export default function ViewDescription({pid}:PropsType): React.JSX.Element {

    const [list, setlist] = useState<DescriptionList[]>([]);
    const[viewModal, setviewModal] = useState<boolean>(false);

    console.log(list)
    /////////======================///////////////========================/////////
    // jab hum alag se component banakar usme get ki api call karte hai or is component ko main component me call karte hai .. or vaha se props ke through id vagaira pass karte hai fir by id data ko get karte hai .. to us data ki kisi bhi value ko access karne ke liye pahle if condition lagakar check karna hoga ki usme ye value hai bhi ya nhi . otherwise undefined ki error aayegi..  //
    
    //== or jab yahi value return me print karni ho tab ternary operator ki help se conditional rendring kara lege ki yadi {list.length>0 to ye print ho : otherwise ye print ho ==// 
    if(list[0]){
        console.log(list[0].processer)
    }
    /////////======================///////////////========================/////////

    const CallModalFunction = ():void =>{
        setviewModal(true)
    }

    /////////======================///////////////========================/////////
    const handleCloseUpdate = ():void =>{
        setviewModal(false)
    }


    // =============  create get api ============// 
    const showDescription = async () =>{
        try{
            await axios.get(`http://localhost:5000/api/retailer/productDescription/viewDescription/`+ pid)
            .then(res => {
                // console.log(res)
                if(res.data.Status){
                    setlist(res.data.result)
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

    useEffect(()=>{
        showDescription()
    }, [])

  return (
    <div>
       <FaRegEye className="text-danger" size={26} onClick={CallModalFunction} />
      
       <Modal
        show={viewModal}
        onHide={() => setviewModal(false)}
        style={{ marginTop: "40px", marginBottom: "70px"}}
      >
        <Modal.Header className="d-block text-center">
          <Modal.Title className="d-inline-block">View Product Discription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {/* <p> conditional rendring karni padegi is formet me data get karke print karne me </p> */}
        {list.length > 0 ? (
                      <div style={{ marginLeft: "10px" }}>
                         <h5>Product Id : <span style={{ marginLeft: "30px", color: "blue" }}>{list[0].pid}</span> </h5>
             
                         <h5>Product Size : <span style={{ marginLeft: "5px", color: "blue" }}>{list[0].size}</span> </h5>
             
                         <h5>Weight : <span style={{ marginLeft: "55px", color: "blue" }}>{list[0].weight}</span> </h5>
             
                         <h5>Ram : <span style={{ marginLeft: "60px", color: "blue" }}>{list[0].ram}</span> </h5>
             
                         <h5>Rom : <span style={{ marginLeft: "58px", color: "blue" }}>{list[0].rom}</span> </h5>
             
                         <h5>Manufacturing Date : <span style={{ marginLeft: "5px", color: "blue" }}>
                           {moment(list[0].mfd).format('DD-MM-YYYY')}
                         </span> </h5>
             
                         <h5>Expiry Date : <span style={{ marginLeft: "80px", color: "blue" }}>
                           {moment(list[0].expdate).format('DD-MM-YYYY')}
                         </span> </h5>
             
                         <h5>Screen : <span style={{ marginLeft: "35px", color: "blue" }}>{list[0].screen}</span> </h5>
             
                         <h5>Processer : <span style={{ marginLeft: "10px", color: "blue" }}>{list[0].processer}</span> </h5>
             
                         <h5>Material : <span style={{ marginLeft: "30px", color: "blue" }}>{list[0].material}</span> </h5>
             
                         <h5>Origine Country : <span style={{ marginLeft: "40px", color: "blue" }}>{list[0].originecountry}</span> </h5>
             
                         <h5>Battery : <span style={{ marginLeft: "40px", color: "blue" }}>{list[0].battery}</span> </h5>

                          <br/>
                          
                         <span className='d-flex'>
                            <h5>Camera:</h5> 
                            <span style={{ marginLeft: "40px", color: "blue" }}>
                                <h5>{list[0].camera}</h5>
                            </span> 
                         </span>

                         <br/>

                         <span className='d-flex'>
                            <h5>Discription:</h5> 
                            <span style={{ marginLeft: "20px", color: "blue" }}>
                                <h5>{list[0].discription}</h5>
                            </span> 
                         </span>

                      </div>
                    ) : (
                        <p>No data available</p>
                    )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setviewModal(false)}
          >
            Close
          </Button>
           
        {/* <p>call here updateDescription component</p> */}
          <UpdateDescription list={list} showDescription={showDescription} />

        </Modal.Footer>
      </Modal>
    </div>
  )
}
