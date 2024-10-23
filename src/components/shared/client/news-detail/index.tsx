import { ConverterUtils } from '@lib/converter';
import { useHTranslation } from '@lib/i18n';
import { endpoints } from '@lib/networks/endpoints';
import { CommentUtils } from '@lib/utils/comment';
import { FormUtils } from '@schema-form/utils/form-utils';
import { Tag } from 'antd';
import Script from 'next/script';
import { useCallback, useEffect, useState } from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'react-share';

import './news-detail.module.scss';

const IconCalendar = () => (
  <svg
    width="14"
    height="16"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.25 2H4.75V0.75C4.75 0.335938 4.41562 0 4 0C3.58438 0 3.25 0.335938 3.25 0.75V2H2C0.896875 2 0 2.89531 0 4V14C0 15.1031 0.896875 16 2 16H12C13.1047 16 14 15.1031 14 14V4C14 2.89531 13.1047 2 12 2H10.75V0.75C10.75 0.335938 10.4156 0 10 0C9.58437 0 9.25 0.335938 9.25 0.75V2ZM12.5 7.75H10V6H12.5V7.75ZM12.5 9.25V11.25H10V9.25H12.5ZM8.5 9.25V11.25H5.5V9.25H8.5ZM4 9.25V11.25H1.5V9.25H4ZM1.5 6H4V7.75H1.5V6ZM1.5 12.75H4V14.5H2C1.725 14.5 1.5 14.275 1.5 14V12.75ZM5.5 12.75H8.5V14.5H5.5V12.75ZM10 12.75H12.5V14C12.5 14.275 12.2763 14.5 12 14.5H10V12.75ZM5.5 6H8.5V7.75H5.5V6Z"
      fill="#AAAFB3"
    />
  </svg>
);

const IconUser = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM8 2.66667C9.46667 2.66667 10.6667 4.13333 10.6667 6C10.6667 7.86667 9.46667 9.33333 8 9.33333C6.53333 9.33333 5.33333 7.86667 5.33333 6C5.33333 4.13333 6.53333 2.66667 8 2.66667ZM12.4 13C11.2667 14 9.66667 14.6667 8 14.6667C6.33333 14.6667 4.73333 14 3.6 13C3.33333 12.7333 3.26667 12.3333 3.53333 12.0667C4.26667 11.2 5.26667 10.6 6.33333 10.2667C6.86667 10.5333 7.4 10.6667 8 10.6667C8.6 10.6667 9.13333 10.5333 9.66667 10.2667C10.8 10.6 11.7333 11.2 12.4667 12.0667C12.7333 12.3333 12.7333 12.7333 12.4 13Z"
      fill="#AAAFB3"
    />
  </svg>
);

export const IconFacebookShare = () => (
  <svg
    width="13"
    height="23"
    viewBox="0 0 13 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.20988 12.825C4.12232 12.825 2.28556 12.8256 1.43843 12.8247C1.00232 12.8244 0.846719 12.6677 0.846719 12.2288C0.846162 11.1014 0.845883 9.97408 0.846719 8.8467C0.846998 8.41337 1.01152 8.24802 1.44206 8.24774C2.28919 8.24718 4.11591 8.24746 4.20988 8.24746C4.20988 8.17022 4.2096 6.5426 4.20988 5.79306C4.21044 4.68493 4.40814 3.6242 4.97113 2.65298C5.5475 1.65889 6.38627 0.977948 7.46122 0.584217C8.14969 0.331862 8.86438 0.231199 9.59495 0.230641C10.509 0.230083 11.4231 0.23092 12.3374 0.232593C12.7303 0.23315 12.9046 0.406871 12.9054 0.802554C12.9071 1.863 12.9071 2.92346 12.9054 3.98363C12.9049 4.38349 12.7378 4.54411 12.336 4.54857C11.5868 4.55666 10.8369 4.55164 10.0885 4.58175C9.33256 4.58175 8.93493 4.95094 8.93493 5.73339C8.9168 6.561 8.9274 7.38945 8.9274 8.24718C8.99822 8.24718 11.1495 8.2469 12.155 8.24718C12.6118 8.24718 12.7679 8.40417 12.7679 8.86343C12.7679 9.98467 12.7677 11.1062 12.7668 12.2274C12.7665 12.68 12.6199 12.8244 12.1603 12.8247C11.1548 12.8253 9.01189 12.825 8.91819 12.825V21.9C8.91819 22.3838 8.76594 22.538 8.28856 22.538C7.12466 22.538 5.96047 22.5383 4.79657 22.538C4.37468 22.538 4.21016 22.3741 4.21016 21.9522C4.20988 18.9967 4.20988 12.9287 4.20988 12.825Z"
      fill="#3D6AD6"
    />
  </svg>
);

export const IconLinkedInShare = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#0288d1"
      d="M8.421 14h.052 0C11.263 14 13 12 13 9.5 12.948 6.945 11.263 5 8.526 5 5.789 5 4 6.945 4 9.5 4 12 5.736 14 8.421 14zM4 17H13V43H4zM44 26.5c0-5.247-4.253-9.5-9.5-9.5-3.053 0-5.762 1.446-7.5 3.684V17h-9v26h9V28h0c0-2.209 1.791-4 4-4s4 1.791 4 4v15h9C44 43 44 27.955 44 26.5z"
    />
  </svg>
);

export const IconEmailShare = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 20, height: 20 }}
  >
    <path
      d="M2.33332 2.33337H11.6667C12.3083 2.33337 12.8333 2.85837 12.8333 3.50004V10.5C12.8333 11.1417 12.3083 11.6667 11.6667 11.6667H2.33332C1.69166 11.6667 1.16666 11.1417 1.16666 10.5V3.50004C1.16666 2.85837 1.69166 2.33337 2.33332 2.33337Z"
      stroke="#0B51D7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.8333 3.5L6.99999 7.58333L1.16666 3.5"
      stroke="#0B51D7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCopy = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.59839 1.09838L6.34629 4.35045C6.34001 4.3567 6.3361 4.36429 6.32985 4.3706C7.13101 4.25392 7.95404 4.33392 8.71698 4.63142L10.9242 2.42422C11.6554 1.693 12.8446 1.693 13.5758 2.42422C14.3071 3.15538 14.3071 4.34467 13.5758 5.07583C13.4511 5.20058 10.1357 8.51599 10.3238 8.3279C9.58676 9.06496 8.37764 9.03343 7.6721 8.3279C7.3067 7.96249 6.71176 7.96249 6.34629 8.3279L5.7771 8.89708C5.93498 9.16534 6.11598 9.42346 6.34629 9.65377C7.73504 11.0425 10.1255 11.1535 11.6295 9.67021C11.6357 9.66396 11.6433 9.66002 11.6496 9.65377L14.9017 6.4017C16.3661 4.9372 16.3661 2.56288 14.9017 1.09838C13.4372 -0.366126 11.0629 -0.366126 9.59839 1.09838Z"
      fill="#064DD6"
    />
    <path
      d="M7.29015 11.3608L5.07583 13.5751C4.34468 14.3063 3.15539 14.3063 2.42423 13.5751C1.69301 12.8439 1.69301 11.6546 2.42423 10.9234C2.54892 10.7987 5.87143 7.47623 5.6834 7.66426C6.4204 6.92726 7.62953 6.95873 8.33506 7.66426C8.70047 8.02973 9.29544 8.02973 9.66088 7.66426L10.2301 7.09507C10.0722 6.82682 9.89119 6.5687 9.66088 6.33845C8.27478 4.95229 5.88609 4.83435 4.37771 6.32198C4.37143 6.32823 4.36386 6.33217 4.35755 6.33845L1.09835 9.59764C-0.366087 11.0621 -0.366149 13.4365 1.09835 14.901C2.56286 16.3654 4.93724 16.3654 6.40168 14.901L9.66084 11.6417C9.66713 11.6355 9.67103 11.628 9.67728 11.6216C8.87612 11.7383 8.05312 11.6583 7.29015 11.3608Z"
      fill="#064DD6"
    />
  </svg>
);

const NewsDetail = ({ data }) => {
  const { title, createdAt, author, content, description, category } = data;
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    if (data?.hashtagIds && data?.newHashtags) {
      FormUtils.submitForm(
        {},
        {
          method: 'get',
          endpoint: endpoints.endpointWithApiDomain('/hashtags/public'),
          hiddenValues: {
            filter: {
              where: {
                id: {
                  inq: data?.hashtagIds || [],
                },
                status: {
                  nin: ['deleted'],
                },
              },
            },
          },
          onGotSuccess: (res) => {
            setHashtags(res?.data);
          },
        },
      );
    } else {
      setHashtags([]);
    }
  }, [data]);

  const handleScroll = useCallback(() => {
    const mainElement: any = document.getElementById('height100percent');
    const elementShareTop: any = document.getElementById(
      'client-news-detail-share-top',
    );
    const elementShareBottom: any = document.getElementById(
      'client-news-detail-share-bottom',
    );
    const position = mainElement?.scrollTop;
    const elementShareDistanceToTop = elementShareBottom?.offsetTop;

    elementShareTop?.classList?.remove('hidden');

    if (position + screen.height / 2 > elementShareDistanceToTop) {
      elementShareTop?.classList?.add('hidden');
    }
  }, []);

  useEffect(() => {
    const mainElement: any = document.getElementById('height100percent');
    mainElement.addEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleSearchNews = (textHashtag: string, idHashtag) => {
    textHashtag &&
      window
        .open(
          `/tim-kiem-tin-tuc?keyword=${textHashtag}&idHashtag=${idHashtag}`,
          '_blank',
        )
        ?.focus();
  };

  // @ts-ignore
  window.callbackSuccess = () => {
    // @ts-ignore
    const zaloSocialSDK = window?.ZaloSocialSDK;

    if (zaloSocialSDK) zaloSocialSDK.reload();
  };

  return (
    <div className="client-news-detail">
      <div className="client-news-detail-share-sticky">
        <div className="client-news-detail-share-sticky-wrapper">
          <NewsDetailShareAction id="client-news-detail-share-top" />
        </div>
      </div>
      <div
        className="client-news-detail__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="client-news-detail__info">
        <div className="client-news-detail__info_author">
          <IconUser /> {author}
        </div>
        <div className="client-news-detail__info__created-at">
          <IconCalendar /> {ConverterUtils.dateConverterToString(createdAt)}
        </div>
      </div>
      <p
        className="client-news-detail__desc"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div
        className="client-news-detail__content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <p className="client-news-detail__author">
        {author} . {category?.name}
      </p>
      <p className="client-news-detail__hashtag">
        {hashtags?.map((tag: any, index) => (
          <Tag key={index} onClick={() => handleSearchNews(tag?.name, tag?.id)}>
            #{tag?.name}
          </Tag>
        ))}
      </p>
      <NewsDetailShareAction id={'client-news-detail-share-bottom'} />
    </div>
  );
};

export default NewsDetail;

const NewsDetailShareAction = ({ id }) => {
  const { t } = useHTranslation('common');

  const handleCopyLink = () => {
    CommentUtils.copyToClipboard(
      location.href,
      t('The news link has been copied', { vn: 'Đã copy link bài viết' }),
    );
  };

  return (
    <div className="client-news-detail-share" id={id}>
      <span className="client-news-detail-share-title">
        {t('Share', { vn: 'Chia sẻ' })}
      </span>
      <span className="client-news-detail-share-item">
        <FacebookShareButton {...{ url: location.href }}>
          <IconFacebookShare />
        </FacebookShareButton>
      </span>
      <span className="client-news-detail-share-item">
        <LinkedinShareButton {...{ url: location.href }}>
          <IconLinkedInShare />
        </LinkedinShareButton>
      </span>
      <span className="client-news-detail-share-item">
        <EmailShareButton {...{ url: location.href }}>
          <IconEmailShare />
        </EmailShareButton>
      </span>
      <span className="client-news-detail-share-item">
        <div
          className="zalo-share-button"
          data-href={location.href}
          data-oaid={process.env.NEXT_PUBLIC_DATA_OAID}
          data-layout="2"
          data-color="blue"
          data-customize="false"
          data-callback="callbackSuccess"
        />
        <Script
          type="text/javascript"
          src="https://sp.zalo.me/plugins/sdk.js"
        />
      </span>
      <span
        className="client-news-detail-share-item"
        onClick={() => handleCopyLink()}
      >
        <IconCopy />
      </span>
    </div>
  );
};
