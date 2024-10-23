import React from 'react';

import { Table } from 'antd';

const CustomTable = ({ ...rest }) => {
  return (
    <div className="custom-antd-table">
      <Table bordered pagination={false} {...rest} />
    </div>
  );
};

export default CustomTable;
