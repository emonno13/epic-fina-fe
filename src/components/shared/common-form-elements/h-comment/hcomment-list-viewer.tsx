import { UserOutlined } from '@ant-design/icons';
import { ConverterUtils } from '@lib/converter';
import { Avatar, Comment, CommentProps, List } from 'antd';
import {
  useHCommentList,
  useHCommentNewReply,
  useHCommentProps,
  useHCommentSetNewReply,
} from './contexts/h-comment-context';
import { HCommentInput } from './hcomment-input';

const getUserInfor = (
  comment = {
    content: '',
    createdAt: new Date(),
    createdBy: { firstName: '', lastName: '', fullName: '' },
    id: -1,
    currentUser: {},
  },
): CommentProps => {
  const { content, createdAt, createdBy, currentUser } = comment;
  const fullNameCurrentUser = (currentUser as any)?.fullName;
  const avatarCurrentUser = ((createdBy || currentUser) as any)?.avatar;
  const newComment: CommentProps = { content };
  newComment.author =
    fullNameCurrentUser || ConverterUtils.getFullNameUser(createdBy);
  newComment.avatar = (
    <Avatar size="large" icon={<UserOutlined />} src={avatarCurrentUser} />
  );
  newComment.datetime = ConverterUtils.dateConverterRelativeTime(createdAt);
  return newComment;
};

export const HCommentListViewer = () => {
  const comments = useHCommentList();
  const hcommentProps = useHCommentProps();
  if (!comments.length)
    return (
      <div className={'no-comment'}>
        {hcommentProps?.defaultContent || null}
      </div>
    );
  return (
    <div className="m-b-10">
      <List
        dataSource={comments}
        itemLayout="horizontal"
        renderItem={(item: CommentProps | any) => (
          <Comment
            {...{
              ...getUserInfor(item),
              actions: [
                <ActionReply key={item.id} {...{ item, currentDepth: 0 }} />,
              ],
            }}
          >
            {item?.reply && (
              <RenderCommentItem items={item.reply} currentDepth={0} />
            )}
          </Comment>
        )}
      />
    </div>
  );
};

const RenderCommentItem = ({ items, currentDepth }) => {
  return items?.map((item) => {
    return (
      <Comment
        key={item.id}
        {...{
          ...getUserInfor(item),
          actions: [
            <ActionReply
              key={`r${item.id}`}
              {...{ item, currentDepth: currentDepth + 1 }}
            />,
          ],
        }}
      >
        {item?.reply && (
          <RenderCommentItem
            items={item.reply}
            currentDepth={currentDepth + 1}
          />
        )}
      </Comment>
    );
  });
};

const ActionReply = ({ item, currentDepth }) => {
  const commentNewRely = useHCommentSetNewReply();
  const newReplyComment = useHCommentNewReply();
  const hcommentProps = useHCommentProps();
  const isReplyComment =
    !!newReplyComment?.id && !!item.id && newReplyComment?.id === item.id;
  const maxDepth = hcommentProps?.maxDepthReply || 1;
  const isCanShowReply = maxDepth > currentDepth && !hcommentProps?.documentIds;
  if (!isCanShowReply) {
    return null;
  }

  return (
    <>
      <span
        onClick={() => {
          commentNewRely && commentNewRely(item);
        }}
      >
        {hcommentProps?.replyLabel || 'Reply to'}
      </span>
      {isReplyComment && <HCommentInput />}
    </>
  );
};
