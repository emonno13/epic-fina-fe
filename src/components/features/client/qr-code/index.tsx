import { endpoints } from '@lib/networks/endpoints';
import { httpRequester } from '@lib/networks/http';
import { useEffect } from 'react';

const QRCodeComponent = (props) => {
  const { query, data: base } = props;

  useEffect(() => {
    getLocation();
  }, []);

  const renderLink = () => {
    return query?.url ? query?.url : base?.value?.[0]?.tags?.[0];
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const data = {
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          campaignId: query?.campaignId,
          uui: window?.navigator?.userAgent,
          link: renderLink(),
        };
        postInfo(data);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
      window.location.assign(renderLink());
    }
  };

  const postInfo = async (data: any) => {
    await httpRequester.postToApi({
      url: `${endpoints.endpointWithApiDomain('/request-campaign/public')}`,
      params: data,
    });

    window.location.assign(renderLink());
  };

  return (
    <div className="max-w-1100 m-auto">
      Link:{' '}
      <a href={renderLink()} target="_blank" rel="noreferrer">
        {renderLink()}
      </a>
    </div>
  );
};

export default QRCodeComponent;
