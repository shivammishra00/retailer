"use client"
import Link from "next/link";
import { useState,ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";


interface RegiterType {
  regno: string;
  gstno: string;
  tin: string;
  pan: string;
  shopname: string;
  ownername: string;
  image: File | null;
  landline: string;
  mobile: string;
  weblink: string;
  email: string;
  address: string;
  country: string;
  state: string;
  city: string;
  pin: string;
  document_reg_no: File | null;
  document_pan_no: File | null;
  document_gst_no: File | null;
  document_shop: File | null;
  password: string;
  aadhar: string;
  termscondition: string;
}

function Signup() {

  const router = useRouter();

  const [retailer, setretailer] = useState<RegiterType>({
    regno: "RE1",
    gstno: "345234567545676",
    tin: "345436576578908",
    pan: "FQBPM9987J",
    shopname: "Shivank Electricals",
    ownername: "Shivank Garg",
    image: null,
    landline: "02324345465",
    mobile: "8122334455",
    weblink: "www.goole.com",
    email: "shivank@gmail.com",
    address: "madhavgarh",
    country: "india",
    state: "india",
    city: "satna",
    pin: "485001",
    document_reg_no: null,
    document_pan_no: null,
    document_gst_no: null,
    document_shop: null,
    password: "12345678",
    aadhar: "435465768798",
    termscondition: "retailer registration"
  })
  
  console.log(retailer)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setretailer({ ...retailer, [name]: files[0] });
    } else {
      setretailer({ ...retailer, [name]: value });
    }
  };

  const handleSubmit = (e:FormEvent) =>{
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("regno", retailer.regno)
    formdata.append("gstno", retailer.gstno)
    formdata.append("tin", retailer.tin)
    formdata.append("pan", retailer.pan)
    formdata.append("shopname", retailer.shopname)
    formdata.append("ownername", retailer.ownername)

    if (retailer.image) {
      formdata.append("image", retailer.image);
    }

    formdata.append("landline", retailer.landline)
    formdata.append("mobile", retailer.mobile)
    formdata.append("weblink", retailer.weblink)
    formdata.append("email", retailer.email)
    formdata.append("address", retailer.address)
    formdata.append("country", retailer.country)
    formdata.append("state", retailer.state)
    formdata.append("city", retailer.city)
    formdata.append("pin", retailer.pin)

    if (retailer.document_reg_no) {
      formdata.append("document_reg_no", retailer.document_reg_no);
    }
    if (retailer.document_pan_no) {
      formdata.append("document_pan_no", retailer.document_pan_no);
    }
    if (retailer.document_gst_no) {
      formdata.append("document_gst_no", retailer.document_gst_no);
    }
    if (retailer.document_shop) {
      formdata.append("document_shop", retailer.document_shop);
    }

    formdata.append("password", retailer.password)
    formdata.append("aadhar", retailer.aadhar)
    formdata.append("termscondition", retailer.termscondition)
    console.log(formdata)
    try{
      axios.post(`http://localhost:5000/api/retailer/resgiteration`, formdata)
    .then(res =>{
      console.log(res)
      if(res.data.Status){
        toast.success(res.data.Message)
        router.push("/")
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
    <>
      <div className="d-flex flex-column align-items-center pt-4 mb-4">
        <div className="card mx-5  shadow-lg bg-light" style={{border: "1px solid black" }} >

          <h4 className="text-center mt-2">Add Retailer Details</h4>

          <form className="row g-2 p-3" onSubmit={handleSubmit}>
             <div className="col-md-4">
              <label className="form-label">Registration Number</label>
              <input type="text" className="form-control" name="regno" 
              value={retailer.regno} placeholder="enter your regno"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">GST Number</label>
              <input type="text" className="form-control" name="gstno"
              value={retailer.gstno} placeholder="enter your gstno"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">TIN Number</label>
              <input type="text" className="form-control" name="tin"
              value={retailer.tin} placeholder="enter your tin no"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">PAN Number</label>
              <input type="text" className="form-control" name="pan"
              value={retailer.pan} placeholder="enter your pan no"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Shop Name</label>
              <input type="text" className="form-control" name="shopname"
              value={retailer.shopname} placeholder="enter your shop name"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Owner Name</label>
              <input type="text" className="form-control" name="ownername"
              value={retailer.ownername} placeholder="enter your owner name"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Owner Image</label>
              <input type="file" className="form-control" name="image"
              onChange={handleChange}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Contact Number</label>
              <input type="text" className="form-control" name="landline"
              value={retailer.landline} placeholder="enter your contact no"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Mobile Number</label>
              <input type="text" className="form-control" name="mobile"
              value={retailer.mobile} placeholder="enter your mobile no"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">WEB</label>
              <input type="text" className="form-control" name="weblink"
              value={retailer.weblink} placeholder="enter your web link"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Email Id</label>
              <input type="text" className="form-control" name="email"
              value={retailer.email} placeholder="enter your email id"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Password</label>
              <input type="text" className="form-control" name="password"
              value={retailer.password} placeholder="enter your password"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Address</label>
              <input type="text" className="form-control" name="address"
              value={retailer.address} placeholder="enter your address"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Country</label>
              <input type="text" className="form-control" name="country"
              value={retailer.country} placeholder="enter your country name"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state"
              value={retailer.state} placeholder="enter your state name"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">City</label>
              <input type="text" className="form-control" name="city"
              value={retailer.city} placeholder="enter your city name"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Pin Code</label>
              <input type="text" className="form-control" name="pin"
              value={retailer.pin} placeholder="enter your pin code"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Aadhar Number</label>
              <input type="text" className="form-control" name="aadhar"
              value={retailer.aadhar} placeholder="enter your aadhar card no"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Document of REG No.</label>
              <input type="file" className="form-control" name="document_reg_no"
              onChange={handleChange}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Document of PAN No.</label>
              <input type="file" className="form-control" name="document_pan_no"
              onChange={handleChange}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Document of GST No.</label>
              <input type="file" className="form-control" name="document_gst_no"
              onChange={handleChange}
              />
             </div>

             <div className="col-md-4">
              <label className="form-label">Document of Sop</label>
              <input type="file" className="form-control" name="document_shop"
              onChange={handleChange}
              />
             </div>

             <div className="col-md-8">
              <label className="form-label">Terms and Conditions</label>
              <input type="text" className="form-control" name="termscondition"
              value={retailer.termscondition} placeholder="enter terms and conditions"
              onChange={(e)=>setretailer({...retailer, [e.target.name]: e.target.value})}
              />
             </div>

             <button type='submit' className='btn btn-success w-50 rounded-0 mb-2 mt-3    d-block mx-auto '>
               Retailer Register
             </button>

             <p className="text-center">Already a member ? <Link href="/">Login Here</Link></p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
