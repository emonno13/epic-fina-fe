import './doc-detail.scss';

const DocumentationDetail = ({ data }) => {
  const { title, description, infoApi, params, responseData, dataDemo } = data;
  return (
    <div className="client-documentation-detail">
      <div className="client-documentation-detail__header" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="client-documentation-detail__info">
      </div>
      {description ? <>
        <div className="client-documentation-detail__title">Mô tả</div>
        <div className="client-documentation-detail__content" dangerouslySetInnerHTML={{ __html: description }} />
      </> : <></>}

      {infoApi ? <>
        <div className="client-documentation-detail__title">Thông tin API</div>
        <div className="client-documentation-detail__content" dangerouslySetInnerHTML={{ __html: infoApi }} />
      </> : <></>}

      {params ? <>
        <div className="client-documentation-detail__title">Body</div>
        <div className="client-documentation-detail__content" dangerouslySetInnerHTML={{ __html: params }} />
      </> : <></>}

      {responseData ? <>
        <div className="client-documentation-detail__title">Giải thích dữ liệu trả về</div>
        <div className="client-documentation-detail__content" dangerouslySetInnerHTML={{ __html: responseData }} />
      </> : <></>}

      {dataDemo ? <>
        <div className="client-documentation-detail__title">Demo</div>
        <div className="client-documentation-detail__content" dangerouslySetInnerHTML={{ __html: dataDemo }} />
      </> : <></>}

    </div>
  );
};

export default DocumentationDetail;
