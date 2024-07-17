"use client";
import Layout from "@/app/component/layout";
import { FormEvent, ChangeEvent , useState, useEffect } from "react";
import { Tab, Tabs, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import Image from "next/image";
import { FaEdit,FaRegEye } from "react-icons/fa";
import { MdAddBox } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import AddDiscription from './ProductDiscription/AddDiscription';
import ViewDescription from "./ProductDiscription/ViewDescription";

////////======== data post for type define ===========////////////
interface ProductInputType  {
  pid: string;
  pname: string;
  regno: string;
  subcatid: string;
  price: string;
  discount: string;
  brandname: string;
  quantity: string;
  image: File | null ;
}

//////===============  Data get for Type Define ================/////////
interface ProductListType  {
  pid: string;
  pname: string;
  regno: string;
  subcatid: string;
  price: string;
  discount: string;
  brandname: string;
  quantity: string;
  image: string ;
  addedon: Date;
  subcatname: string,
  lastupdate: Date
}

//////=============  Update Price Type   =============/////////////
interface UpdatePriceType {
  price: string
}
//////=============  Update Discount Type   =============/////////////
interface updateDiscountType {
  discount: string
}
//////=============  Update Quantity Type   =============/////////////
interface updateQuantityType {
  quantity: string
}


export default function Product() {
  const [productList, setproductList] = useState<ProductListType[]>([])
  const [inputData, setinputData] = useState<ProductInputType>({
    pid: "P01",
    pname: "realme 5",
    regno: "RE1",
    subcatid: "SC3",
    price: "12500",
    discount: "10%",
    brandname: "realme",
    quantity: "3000",
    image: null
  });
  // console.log(inputData)

  const [updatePriceModal, setupdatePriceModal] = useState<boolean>(false);
  const[updateDiscountModal, setupdateDiscountModal] = useState<boolean>(false);
  const[updateQuantityModal, setupdateQuantityModal] = useState<boolean>(false);

  ////=========== update ke liye useState  ===============//////
  const [newpid, setnewpid] = useState<string>("");
  const [updatePrice, setupdatePrice] = useState<UpdatePriceType>({
    price: ""
  })

  const [dispid, setdispid] = useState<string>("");
  const [updateDiscount, setupdateDiscount] = useState<updateDiscountType>({
    discount: ""
  })

  const [quanpid, setquanpid] = useState<string>("");
  const [updateQuantity, setupdateQuantity] = useState<updateQuantityType>({
    quantity: ""
  })

  ///=========== handle input change ================///
  const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value, files} = e.target;
    if(files){
      setinputData({...inputData, [name]: files[0]})
    }
    else{
      setinputData({...inputData, [name]: value})
    }
  }

  ///============ create post api ===================///
  const handleSubmit = async (e:FormEvent) =>{
    e.preventDefault()

    const formdata = new FormData()
    formdata.append("pid", inputData.pid)
    formdata.append("pname", inputData.pname)
    formdata.append("regno", inputData.regno)
    formdata.append("subcatid", inputData.subcatid)
    formdata.append("price", inputData.price)
    formdata.append("discount", inputData.discount)
    formdata.append("brandname", inputData.brandname)
    formdata.append("quantity", inputData.quantity)
    //Argument of type 'File | null' is not assignable to parameter of type 'string | Blob'
    if(inputData.image){     
      formdata.append("image", inputData.image)
    }
    console.log(formdata)

    try{
      await axios.post(`http://localhost:5000/api/retailer/product/addproduct`, formdata )
      .then(res =>{
        console.log(res)
        if(res.data.Status){
          toast.success(res.data.Message)
          //////   reset your field after status success
          setinputData({
            pid: "",
            pname: "",
            regno: "",
            subcatid: "",
            price: "",
            discount: "",
            brandname: "",
            quantity: "",
            image: null
          })
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

  ///============= create get api for all product list ===================///
  const viewProduct = async () =>{
    try{
      await axios.get(`http://localhost:5000/api/retailer/product/viewproduct`)
      .then(res =>{
        // console.log(res)
        setproductList(res.data.result)
      })
      .catch(err => console.log(err))
    } catch(err) {
      console.log(err)
    }
  }
  useEffect(()=>{
    viewProduct()
  }, [])


  ///=========== Price Modal Call Here ==============///
  const openModalPrice = (pid:string, newprice: string) =>{
    setnewpid(pid),
    setupdatePrice({
      ...updatePrice,
      price: newprice
    })
    setupdatePriceModal(true)
  }

  ///=========== Price Update Api ==============///
  const priceUpdateHandle = async () =>{
    try{
      await axios.patch(`http://localhost:5000/api/retailer/product/updateprice/`+ newpid, updatePrice)
      .then(res => {
        console.log(res)
        if(res.data.Status){
          toast.success(res.data.Message)
          setupdatePriceModal(false)
          viewProduct()
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

  ///========== Discount Modal Call Here ============///
  const openModalDiscount = (pid:string, newdiscount:string) =>{
    setdispid(pid)
    setupdateDiscount({
      ...updateDiscount,
      discount: newdiscount
    })
    setupdateDiscountModal(true)
  }
 
  ///=========== Discount Update Api ==============///
  const discountUpdateHandle = async () =>{
    try{
      await axios.patch(`http://localhost:5000/api/retailer/product/updatediscount/`+ dispid, updateDiscount)
      .then(res => {
        console.log(res)
        if(res.data.Status){
          toast.success(res.data.Message)
          setupdateDiscountModal(false)
          viewProduct()
        }
        else{
          toast.success(res.data.Error)
        }
      })
      .catch(err => console.log(err))
    }
    catch(err){
      console.log(err)
    }
  }

  ///==========  Quantity Modal Call Here  ===============////
  const openModalQuantity = (pid:string, newquantity:string) =>{
    setquanpid(pid)
    setupdateQuantity({
      ...updateQuantity,
      quantity: newquantity
    })
    setupdateQuantityModal(true)
  }

  ///=========== Quantity Update Api ==============///
  const quantityUpdate = async () =>{
    try{
      await axios.patch(`http://localhost:5000/api/retailer/product/updatequantity/`+ quanpid, updateQuantity)
      .then(res => {
        console.log(res)
        if(res.data.Status){
          toast.success(res.data.Message)
          setupdateQuantityModal(false)
          viewProduct()
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
    <Layout>
      <>
        <div>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Add Product">
              <div className="d-flex flex-column align-items-center pt-4 mb-4">
                <div className="card mx-5  shadow-lg bg-light" style={{width:"80%"}}>
                  <div style={{border: "1px solid black", boxShadow: "3px 3px 3px 3px  #5DEBD7"}}>
                    <h4 className='text-center mt-2'>Add Products</h4>

                    <form className="row g-3 p-3" onSubmit={handleSubmit}>
                      <div className="col-md-4">
                        <label className="form-label">Product Id</label>
                        <input type="text" className="form-control" name="pid"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.pid}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" name="pname"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.pname}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Registration Number</label>
                        <input type="text" className="form-control" name="regno"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.regno}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">SubCategory Id</label>
                        <input type="text" className="form-control" name="subcatid"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.subcatid}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Price</label>
                        <input type="text" className="form-control" name="price"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.price}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Discount</label>
                        <input type="text" className="form-control" name="discount"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.discount}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Brand Name</label>
                        <input type="text" className="form-control" name="brandname"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.brandname}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Quantity</label>
                        <input type="text" className="form-control" name="quantity"
                        onChange={(e)=>setinputData({...inputData, [e.target.name]: e.target.value})}  value={inputData.quantity}
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label">Product Photo</label>
                        <input type="file" className="form-control" name="image"
                        onChange={handleChange}  
                        />
                      </div>
                      

                      <button type='submit' className='btn btn-success w-50 rounded-0 mb-2  mt-3 d-block mx-auto '>
                        Retailer Register
                      </button>
                    </form>
                  </div>
                  
                </div>
              </div>
            </Tab>

            <Tab eventKey="profile" title="View Product">
              <>
              <Row className="justify-content-center pt-4 mb-4">
                <Col xs={10} lg={11}>
                  <div className="container">
                    <div className="bg-light shadow-lg">
                      <div style={{border: "1px solid black", boxShadow: "3px 3px 3px 3px  #5DEBD7"}}>
                        <Table responsive >
                            <thead className="text-center thead-dark">
                              <tr>
                                <th>S.NO.</th>
                                <th style={{minWidth:"200px"}}>PRODUCT ID</th>
                                <th style={{minWidth:"200px"}}>PRODUCT NAME</th>
                                <th style={{minWidth:"200px"}}>REGISTRATION NO.</th>
                                <th style={{minWidth:"200px"}}>SUBCATEGORY ID</th>
                                <th style={{minWidth:"210px"}}>SUBCATEGORY NAME</th>
                                <th style={{minWidth:"100px"}}>PRICE</th>
                                <th style={{minWidth:"100px"}}>DISCOUNT</th>
                                <th style={{minWidth:"100px"}}>BRANDNAME</th>
                                <th style={{minWidth:"100px"}}>QUANTITY</th>
                                <th style={{minWidth:"100px"}}>PHOTO</th>
                                <th style={{minWidth:"200px"}}>ADDED ON</th>
                                <th style={{minWidth:"220px"}}>PRODUCT DISCRIPTION</th>
                                <th style={{minWidth:"100px"}}>IMAGE</th>
                                <th style={{minWidth:"200px"}}>Last Update</th>
                              </tr>
                            </thead>

                            <tbody className="text-center">
                              {
                                productList.map((p ,index)=>{
                                  return(
                                    <tr key={index}>
                                      <td>{index+1}</td>
                                      <td>{p.pid}</td>
                                      <td>{p.pname}</td>
                                      <td>{p.regno}</td>
                                      <td>{p.subcatid}</td>
                                      <td>{p.subcatname}</td>
                                      <td>
                                        {p.price}
                                        <span onClick={()=>openModalPrice(p.pid, p.price)}>
                                          <FaEdit className="text-primary" size={26} />
                                        </span>
                                      </td>
                                      <td>
                                        {p.discount}
                                        <span style={{marginLeft:"8px"}} 
                                        onClick={()=>openModalDiscount(p.pid, p.discount)}>
                                          <FaEdit className="text-primary"  size={26}/>
                                        </span>
                                      </td>
                                      <td>{p.brandname}</td>
                                      <td>
                                        {p.quantity}
                                        <span style={{marginLeft:"8px"}}
                                        onClick={()=>openModalQuantity(p.pid, p.quantity)}>
                                          <FaEdit className="text-primary" size={26} />
                                        </span>
                                      </td>
                                      <td>
                                        <Image src={p.image} unoptimized alt="product picture" width={40} height={40} className="border"/>
                                      </td>
                                      <td>{moment(p.addedon).format('DD-MM-YYYY')}</td>
                                      <td>
                                        <span className="d-flex" style={{marginLeft:"60px"}}>
                                          <AddDiscription pid={p.pid} />
                                          <ViewDescription pid={p.pid} />
                                        </span>
                                      </td>
                                      <td>
                                        <span><MdAddBox className='text-primary' size={26}/></span>
                                        <span><FaRegEye className="text-danger" size={26} /></span>
                                      </td>
                                      <td>{moment(p.lastupdate).format('DD-MM-YYYY')}</td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                            
                        </Table>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {/* <P> update Price modal </P> */}
              <Modal show={updatePriceModal} onHide={()=>setupdatePriceModal(false)} style={{marginTop:"40px", marginBottom:"40px"}}>
                <Modal.Header className="d-block text-center">
                  <Modal.Title className="d-inline-block">Update Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="row g-3 p-3">
                    <div className="col-md-12">
                      <label className="form-label">Price</label>
                      <input type="text" className="form-control" name="price" 
                       value={updatePrice.price} 
                       onChange={(e) => setupdatePrice({...updatePrice, [e.target.name]:e.target.value})}
                       />
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>setupdatePriceModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={()=>priceUpdateHandle()}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* <P> update Discount modal </P> */}
              <Modal show={updateDiscountModal} onHide={()=>setupdateDiscountModal(false)} style={{marginTop:"40px", marginBottom:"40px"}}>
                <Modal.Header className="d-block text-center">
                  <Modal.Title className="d-inline-block">Update Discount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="row g-3 p-3">
                    <div className="col-md-12">
                      <label className="form-label">Discount</label>
                      <input type="text" className="form-control" name="discount" 
                      value={updateDiscount.discount}
                      onChange={(e)=>setupdateDiscount({...updateDiscount, [e.target.name]:e.target.value})}
                       />
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>setupdateDiscountModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => discountUpdateHandle()}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* <P> update Quantity modal </P> */}
              <Modal show={updateQuantityModal} onHide={()=>setupdateQuantityModal(false)} style={{marginTop:"40px", marginBottom:"40px"}}>
                <Modal.Header className="d-block text-center">
                  <Modal.Title className="d-inline-block">Update Quantity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="row g-3 p-3">
                    <div className="col-md-12">
                      <label className="form-label">Quantity</label>
                      <input type="text" className="form-control" name="quantity" 
                      value={updateQuantity.quantity}
                      onChange={(e)=>setupdateQuantity({...updateQuantity, [e.target.name]:e.target.value})}
                      />
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>setupdateQuantityModal(false)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={quantityUpdate}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>
              </>
            </Tab>
          </Tabs>
        </div>
      </>
    </Layout>
  );
}
