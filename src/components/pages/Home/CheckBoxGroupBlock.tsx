import { Checkbox, Col, Row } from "antd";

interface Props {
  title: string;
  options: string[];
  selected: string[];
  onChange: (checkedValues: string[]) => void;
}

const CheckboxGroupBlock = ({ title, options, selected, onChange }: Props) => {
  return (
    <div style={{ paddingBottom: "16px", borderBottom: "1px solid #ccc" }}>
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{title}</div>
      <Checkbox.Group value={selected} onChange={onChange} style={{ width: "100%" }}>
        <Row gutter={[16, 8]}>
          {options.map((option) => (
            <Col span={8} key={option}>
              <Checkbox value={option}>{option}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </div>
  );
};

export default CheckboxGroupBlock;
