"use client"
import React from "react";
import { Chart } from "react-google-charts";

export default function Charts() {
  const data = [
    ["Task", "Hours per Day"],
    ["REGNO", 11],
    ["PAN", 2],
    ["TIN", 2],
    ["GST", 2],
    ["SHOP NAME", 7],
  ];

  const options = {
    title: "Per Day Shop Registration Activity",
  };

  const data1 = [
    ["Month", "REGNO", "PAN", "SHOP NAME", "TIN", "GSTNO", "AADHAR"],
    ["2004/05", 165, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ];
  const options1 = {
    title: "Monthly Shop Registration",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 mb-1">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"290px"}
          />
        </div>
        <div className="col-12 col-md-6 mb-1">
          <Chart
            chartType="ComboChart"
            width="100%"
            height="290px"
            data={data1}
            options={options1}
          />
        </div>
      </div>
    </div>
  );
}
