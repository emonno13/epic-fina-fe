import { Link } from '@components/shared/link';
import { CheckIcon } from '@icons';
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
          <CheckIcon />
        </span>
      )}

      <div>
        <div className="overview-asset-product-header">
          <span className="overview-asset-product-header-code">
            {asset?.code}
          </span>
          <a>Xem chi tiết</a>
        </div>

        <div className="overview-asset-product-body">
          <div className="overview-asset-product-body-program">
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
      <div className="asset-program-name">{productProgram?.nameEn}:</div>
      <div className="asset-program-volume">
        {productProgram?.holdingVolume}
      </div>
    </div>
  );
};

export default OverviewAssetProduct;
