import { HComment } from '@components/shared/common-form-elements/h-comment';
import { NoCommentIcon } from '@icons';
import { useHTranslation } from '@lib/i18n';
import { Divider, Tooltip } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { UserAvatar } from '../../../../shared/common/h-avatar';
import { HPreviewUser } from '../../../../shared/common/h-preview-user';

export const PreviewUserTable = (props: any) => {
  const { document, user, userTitle, showComment = true } = props;
  const { t } = useHTranslation('admin-common');
  return (
    <div className={'wrapper-preview-user-table'}>
      <div className={'wrapper-preview-user__avatar'}>
        <Tooltip
          placement="topLeft"
          title={<HPreviewUser {...{ user, userTitle }} />}
        >
          <div>
            <UserAvatar {...{ user }} />
          </div>
        </Tooltip>
        <Divider />
        {/*<Avatar.Group*/}
        {/*	maxCount={2}*/}
        {/*	size="large"*/}
        {/*	maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}*/}
        {/*>*/}
        {/*	<UserAvatar {...{user}}/>*/}
        {/*	<UserAvatar {...{user}}/>*/}
        {/*</Avatar.Group>*/}
      </div>
      {showComment ? (
        <div className={'wrapper-preview-user__comment'}>
          <Scrollbars style={{ width: '100%', height: 350 }}>
            <div className="ui-loan-detail-bank">
              <HComment
                {...{
                  className: 'm-t-10',
                  documentId: document?.id,
                  inputRows: 1,
                  defaultContent: <NoComment />,
                }}
              />
            </div>
          </Scrollbars>
        </div>
      ) : (
        <div className={'no-sharing'}>
          <NoCommentIcon />
        </div>
      )}
    </div>
  );
};

export const NoComment = () => {
  return (
    <div className={'no-comment'}>
      <NoCommentIcon />
    </div>
  );
};
