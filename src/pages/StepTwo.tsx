import * as React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useStoreState } from "../store";
import { Button, Form, Input, InputNumber, Table, Typography } from "antd";
import {
  ArrowLeftOutlined,
  LineChartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ReactFileReader from "react-file-reader";
import { minmax } from "../components/functions";
import PdfFile from "../components/PdfFile";
import Chart from "../components/Chart";
import { Link } from "react-router-dom";

declare module "react" {
  interface HTMLAttributes<T> {
    for?: string;
  }
}
const { Title } = Typography;

export default function StepTwo() {
  const stepone: any = useStoreState((state) => state.abcs.stepone);
  // console.log(stepone);
  const [form] = Form.useForm();

  const [chartValueLabel, setChartValueLabel] = useState<any>();
  const [chartValueData, setChartValueData] = useState<any>();
  const [finalItems, setfinalItems] = useState<any>();
  const [minMaxValue, setminMaxValue] = useState<any>();
  const [showTable, setshowTable] = useState<boolean>(false);
  const [shwChart, setshwChart] = useState<boolean>(false);
  const [shwChartBtn, setshwChartBtn] = useState<boolean>(false);

  const handleFiles = (files) => {
    let reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      let csv: any = reader.result;
      let lines = csv.split("\n");
      let result: any = [];
      let headers = lines[0].split(",");
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = parseFloat(currentline[j]);
        }
        result.push(obj);
      }
      //console.log(result);
      let chartDatalabel =
        Array.isArray(result) &&
        result.map(function (item) {
          return item.KP;
        });
      let chartDataData =
        Array.isArray(result) &&
        result.map(function (item) {
          return item.X;
        });
      setChartValueLabel(chartDatalabel);
      setChartValueData(chartDataData);
      setminMaxValue(minmax(result, "X", "Y", "Z"));
      setshwChartBtn(true);
    };
    reader.readAsText(files[0]);
  };
  //console.log(chartValueData);

  useEffect(() => {
    form.setFieldsValue({
      minX: minMaxValue?.minX,
      maxX: minMaxValue?.maxX,
      minY: minMaxValue?.minY,
      maxY: minMaxValue?.maxY,
      minZ: minMaxValue?.minZ,
      maxZ: minMaxValue?.maxZ,
    });
  }, [minMaxValue]);

  const onFinish = (values: any) => {
    values.minX = values.minX === undefined ? 0 : values.minX;
    values.maxX = values.maxX === undefined ? 0 : values.maxX;
    values.minY = values.minY === undefined ? 0 : values.minY;
    values.maxY = values.maxY === undefined ? 0 : values.maxY;
    values.minZ = values.minZ === undefined ? 0 : values.minZ;
    values.maxZ = values.maxZ === undefined ? 0 : values.maxZ;
    // console.log(values);
    setfinalItems([values]);
    setshowTable(true);
    // history.push("/secondstep");
  };

  const showChartFunc = () => {
    setshwChart(!shwChart);
  };

  const columns = [
    {
      title: "Minimum X",
      dataIndex: "minX",
      key: "minX",
    },
    {
      title: "Maximum X",
      dataIndex: "maxX",
      key: "maxX",
    },
    {
      title: "Minimum Y",
      dataIndex: "minY",
      key: "minY",
    },
    {
      title: "Maximum Y",
      dataIndex: "maxY",
      key: "maxY",
    },
    {
      title: "Minimum Z",
      dataIndex: "minZ",
      key: "minZ",
    },
    {
      title: "Maximum Z",
      dataIndex: "maxZ",
      key: "maxZ",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Step Two</title>
        <meta name="description" content="Second Step" />
      </Helmet>
      <div style={{ margin: 10 }}>
        <div style={{ marginBottom: 35 }}>
          <Link to="/" style={{ marginBottom: 10 }}>
            {" "}
            <Button type="primary">
              {" "}
              <ArrowLeftOutlined />
              Go Back
            </Button>{" "}
          </Link>
          <div style={{ display: "flex", margin: 10 }}>
            <span style={{ width: "20%" }}>Project Name</span>
            <Input value={stepone?.projectName} disabled />
          </div>
          <div style={{ display: "flex", margin: 10 }}>
            <span style={{ width: "20%" }}>Project Description</span>
            <Input.TextArea value={stepone?.projectDescription} disabled />
          </div>
          <div style={{ display: "flex", margin: 10 }}>
            <span style={{ width: "20%" }}>Client</span>
            <Input value={stepone?.client} disabled />
          </div>
          <div style={{ display: "flex", margin: 10 }}>
            <span style={{ width: "20%" }}>Contractor</span>
            <Input value={stepone?.contractor} disabled />
          </div>
        </div>
        <ReactFileReader
          handleFiles={handleFiles}
          fileTypes={".csv"}
          style={{ marginBottom: 35 }}
        >
          <Button>
            <UploadOutlined /> Upload CSV File
          </Button>
        </ReactFileReader>
        <Form layout="horizontal" onFinish={onFinish} form={form}>
          <div style={{ display: "flex", margin: 10 }}>
            <Form.Item name="minX" label="Min X">
              <InputNumber defaultValue={0} style={{ width: 120 }} />
            </Form.Item>
            <Form.Item name="maxX" label="Max X">
              <InputNumber defaultValue={0} style={{ width: 120 }} />
            </Form.Item>
            <Form.Item name="minY" label="Min Y">
              <InputNumber defaultValue={0} style={{ width: 120 }} />
            </Form.Item>
            <Form.Item name="maxY" label="Max Y">
              <InputNumber defaultValue={0} style={{ width: 120 }} />
            </Form.Item>
            <Form.Item name="minZ" label="Min Z">
              <InputNumber defaultValue={0} style={{ width: 120 }} />
            </Form.Item>
            <Form.Item name="maxZ" label="Max Z">
              <InputNumber defaultValue={0} style={{ width: 120 }} />
            </Form.Item>
          </div>
          <Form.Item>
            {shwChartBtn && (
              <Button
                style={{ float: "left" }}
                type="primary"
                onClick={() => showChartFunc()}
              >
                {" "}
                <LineChartOutlined />
                {shwChart ? "Hide Chart" : "Show Chart"}
              </Button>
            )}
            <Button htmlType="submit" style={{ float: "right" }} type="primary">
              Result
            </Button>
          </Form.Item>
        </Form>
        {showTable && (
          <>
            <div style={{ marginBottom: 20 }}>
              <Title level={3}>Result Table: </Title>
              <Table
                dataSource={finalItems}
                columns={columns}
                pagination={false}
              />
              <div style={{ marginTop: 10, float: "right" }}>
                <PdfFile pdfValue={finalItems} />
              </div>
            </div>
            <br />
          </>
        )}
        {shwChart ? (
          <>
            <Title level={3}>Result Chart: </Title>
            <Chart
              chartValueLabel={chartValueLabel}
              chartValueData={chartValueData}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
