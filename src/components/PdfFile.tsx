import React from "react";
import { Button } from "antd";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useStoreState } from "../store";
import { FilePdfOutlined } from "@ant-design/icons";

export default function PdfFile(props: any) {
  const stepone: any = useStoreState((state) => state.abcs.stepone);
  const getColumns = function () {
    return [
      { title: "Minimum X", dataKey: "minX" },
      { title: "Maximum X", dataKey: "maxX" },
      { title: "Minimum Y", dataKey: "minY" },
      { title: "Maximum Y", dataKey: "maxY" },
      { title: "Minimum Z", dataKey: "minZ" },
      { title: "Maximum Z", dataKey: "maxZ" },
    ];
  };

  const getData: any = function () {
    return props?.pdfValue;
  };

  const pdfDownload = () => {
    //console.log(props?.pdfValue)
    let doc: any = new jsPDF("p", "mm", "a4");
    doc.setFontSize(10);
    let pageSize = doc.internal.pageSize;
    let pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    let description = doc.splitTextToSize(
      stepone?.projectDescription,
      pageWidth - 35,
      {}
    );
    doc.text(15, 30, "Project Name : " + stepone?.projectName);
    doc.text(15, 35, "Project Description : ");
    doc.text(description, 48, 35);
    doc.text(15, 40, "Client : " + stepone?.client);
    doc.text(15, 45, "Contractor : " + stepone?.contractor);
    doc.autoTable(getColumns(), getData(10), {
      startY: 50,
      theme: "grid",
      headerStyles: {
        fillColor: [105, 105, 105],
        textColor: [255, 255, 255],

        fontSize: 9,
      },
      styles: {
        halign: "center",
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
        fontSize: 8,
      },
      margin: { bottom: 15 },
    });
    doc.save("Result.pdf");
  };
  return (
    <>
      <Button type="primary" onClick={() => pdfDownload()}>
      <FilePdfOutlined />Download PDF
      </Button>
    </>
  );
}
