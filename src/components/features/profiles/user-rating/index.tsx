import ExpertDetailOvertallReviewSummary from '@components/shared/client/expert-detail/overall-review/summary';
import { useState } from 'react';
import { useCurrentUser } from '../../../../lib/providers/auth';
import { HFeature, HTable } from '../../../../schema-form/features';
import { HFeatureForm } from '../../../../schema-form/features/forms/h-feature-form';
import { HDocumentDrawerPanel } from '../../../../schema-form/features/panels';
import { HSearchFormWithCreateButton } from '../../../../schema-form/features/search-form';
import { UserRatingDetailSchemaForm } from './user-rating-schema-form';
import { UserRatingTableSchema } from './user-rating.table-schema';

import './user-rating.module.scss';

export const UserRating = () => {
  const currentUser = useCurrentUser();
  const [statistics, setStatistics] = useState({});
  return (
    <HFeature
      {...{
        featureId: 'user-ratings',
        nodeName: 'user-ratings',
        documentRelations: ['user', 'sender'],
      }}
    >
      <HSearchFormWithCreateButton
        withRelations={['user', 'sender']}
        hiddenFields={{ userId: currentUser?.id }}
        resetIfSuccess={false}
        layout="horizontal"
        className={'hidden'}
        onGotSuccess={(document) => {
          setStatistics(document?.statistics);
        }}
      />
      <div className={'statistics-rating'}>
        <div className={'statistics-rating__rate'}>
          <ExpertDetailOvertallReviewSummary {...{ RatesData: statistics }} />
        </div>
        <div className={'statistics-rating__accuracy'}>
          <div className={'statistics-rating__accuracy-image'}>
            <img
              id="u649_img"
              className="img "
              src="https://storage.googleapis.com/image-fina/upload/fina/accuracy_1639018710987.png"
            />
          </div>
          <div className={'statistics-rating__accuracy-content'}>
            <h3>Đánh giá đã được xác minh?</h3>
            <p>
              Các bài đánh giá được liên kết với giao dịch đã xác minh giữa nhà
              cung cấp hoặc người mua về đại lý. Các đánh giá đã được xác minh
              được tính vào xếp hạng của đại lý
            </p>
          </div>
        </div>
      </div>
      <HDocumentDrawerPanel>
        <HFeatureForm
          {...{
            schema: UserRatingDetailSchemaForm,
            hideSubmitAndContinueButton: true,
            hiddenValues: { senderId: currentUser?.id },
          }}
        />
      </HDocumentDrawerPanel>
      <HTable schema={() => UserRatingTableSchema()} />
    </HFeature>
  );
};
