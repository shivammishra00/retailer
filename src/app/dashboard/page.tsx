"use client"
import Layout from "../component/layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dash.css";
import Charts from "../DashCharts/Charts";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Dashboard() {
   
   const router = useRouter();

    ////////  verify retailer   /////// 
  useEffect(()=>{
    const verifyRetailer = async () =>{
      try{
       await axios.get(`http://localhost:5000/api/retailer/verify`)
       .then(res =>{
         console.log(res)
         if(res.data.role === "retailer"){
           router.push(`/dashboard`)
         }
         else{
           router.push(`/`)
         }
       })
       .catch(err => console.log(err))
      } catch(err){
       console.log(err)
      }
   }
   verifyRetailer()
  }, [router])

  return (
    <Layout>
      <>
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4 col-xl-3">
              <div className="card bg-c-blue order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Shops</h6>
                  <h2 className="text-right">
                    <i className="fa fa-cart-plus f-left"></i>
                    <span>486</span>
                  </h2>
                  <p className="m-b-0">
                    Total Shops<span className="f-right">351</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-xl-3">
              <div className="card bg-c-green order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Product</h6>
                  <h2 className="text-right">
                    <i className="fa fa-rocket f-left"></i>
                    <span>486</span>
                  </h2>
                  <p className="m-b-0">
                    Total Product<span className="f-right">351</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xl-3">
              <div className="card bg-c-yellow order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Retaielr</h6>
                  <h2 className="text-right">
                    <i className="fa fa-refresh f-left"></i>
                    <span>486</span>
                  </h2>
                  <p className="m-b-0">
                    Total Retailer<span className="f-right">351</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-xl-3">
              <div className="card bg-c-pink order-card">
                <div className="card-block">
                  <h6 className="m-b-20">Retailer</h6>
                  <h3 className="text-right">
                    <i className="fa fa-credit-card f-left"></i>
                    <span>486</span>
                  </h3>
                  <p className="m-b-0">
                    Total Retailer<span className="f-right">351</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Charts/>
        </div>
      </>
    </Layout>
  );
}
