import { Col } from 'antd';

const Calculator = ({ calculator }) => {
  return (
    <Col {...{ xs: 24, sm: 12, md: 12, lg: 6 }}>
      <a href={`/calculators-toolkit/${calculator?.value}`} target="_blank" rel="noreferrer">
        <div className="calculators-toolkit-item" key={calculator?.value}>
          <h2>
            <span>{calculator?.label}</span>
          </h2>
        </div>
      </a>
    </Col>
  );
};

export default Calculator;
