import { CheckOutlined } from '@ant-design/icons';
import { Link } from '@components/shared/link';
import { Button } from 'antd';

export const OverviewAssetProduct = ({
  asset,
  handleClick,
  selectedProgramId,
}) => {
  const productProgramList = asset?.productProgramList || [];
  return (
    <div className="overview-asset-product" onClick={handleClick}>
      {selectedProgramId === asset.id && (
        <span className="tick">
          <CheckOutlined style={{ color: '#fff' }} />
        </span>
      )}
      <div>
        <div className="asset__header">
          <div className="asset__header--left">
            {/* <div className="asset__header--left--color" style={{ backgroundColor: asset?.color || '#1DA57A' }} /> */}
            <div className="asset__header--left--code">{asset?.code}</div>
          </div>
          <div className="asset__header--right">
            <a>Xem chi tiết</a>
          </div>
        </div>
        <div className="asset__body">
          {/* <div className="asset__body__title">Chương trình</div> */}
          <div className="asset__body__program">
            {productProgramList.map((item: any) => (
              <ProgramOfAsset key={item.id} productProgram={item} />
            ))}
          </div>
        </div>
      </div>

      <Link href={`/danh-sach-chung-chi-quy/${asset?.slug}`}>
        <Button className="w-full" type="primary">
          Đầu tư thêm
        </Button>
      </Link>
    </div>
  );
};

const ProgramOfAsset = ({ productProgram }) => {
  return (
    <div className="asset-program">
      <div className="asset-program__name">{productProgram?.nameEn}:</div>
      <div className="asset-program__volume">
        {productProgram?.holdingVolume}
      </div>
    </div>
  );
};

export default OverviewAssetProduct;
