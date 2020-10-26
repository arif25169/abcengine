import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useStoreState } from "../store";
import { Button, Form, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactFileReader from "react-file-reader";
import { minmax } from "../components/functions";

export default function StepTwo() {
  const stepone = useStoreState((state) => state.abcs.stepone);
  console.log(stepone);
  const [form] = Form.useForm();

  const [jsonItems, setjsonItems] = useState<any>();
  const [finalItems, setfinalItems] = useState<any>();
  const [minMaxValue, setminMaxValue] = useState<any>();

  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      var csv: any = reader.result;
      var lines = csv.split("\n");
      var result: any = [];
      var headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = parseFloat(currentline[j]);
        }
        result.push(obj);
      }
      setjsonItems(result);
      setminMaxValue(minmax(result, "X", "Y", "Z"));
    };
    reader.readAsText(files[0]);
  };
  //console.log(jsonItems);

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
    console.log(values);
    setfinalItems(values);
    // history.push("/secondstep");
  };

  return (
    <>
      <Helmet>
        <title>Step One</title>
        <meta name="description" content="Second Step" />
      </Helmet>
      <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
        <Button>
          <UploadOutlined /> Upload CSV File
        </Button>
      </ReactFileReader>
      <br />
      <Form layout="horizontal" onFinish={onFinish} form={form}>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
