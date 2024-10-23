import { tkManager } from '@lib/networks/http';

export const downloadFormURI = (uri, name) => {
  const link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.target = '_blank';

  document.body.appendChild(link);
  link.click();

  setTimeout(() => document.body.removeChild(link), 500);
};

export const downloadBlobFile = async ({ nodeName, fileName, filter }) => {
  const filterQueryParam = encodeURIComponent(JSON.stringify(filter));

  const token = await tkManager.getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STATIC_CDN}/${nodeName}?filter=${filterQueryParam}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  downloadFormURI(url, fileName);
};
