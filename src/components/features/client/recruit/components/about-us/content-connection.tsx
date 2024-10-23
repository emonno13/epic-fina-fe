import './content-connecttion.module.scss';
const ContentConnection = (props) => {
  const { title, des, content, maxWidth } = props;

  return (
    <div className="content-connection">
      <div className="max-w-1100 m-auto">
        <h2 className="content-connection__title">
          {title}
        </h2>
        {des && <div
          className="content-connection__des"
          style={{
            maxWidth: maxWidth,
          }}
        >{des}</div>}
        {content}
      </div>
    </div>
  );
};

export default  ContentConnection;
