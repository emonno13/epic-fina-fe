import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DocumentationDetail from './doc-detail';
import { FormUtils } from '../../../schema-form/utils/form-utils';
import { endpoints } from '../../../lib/networks/endpoints';

export const getDataOfDocPageByCategorySlugAndDocumentationSlug = (categorySlug, documentationSlug) => {
  const [documentation, setDocumentation] = useState<any[]>([]);
  useEffect(() => {
    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain(`/documentations/public/by-slug/${documentationSlug}`),
      onGotSuccess: response => setDocumentation(response || []),
    });
  }, [documentationSlug]);

  return documentation;
};

export const RenderDocComponentByPath = () => {
  const router = useRouter();
  const { asPath } = router;
  const featureNames = asPath.split('/');
  const categorySlug = featureNames[2];
  const documentationSlug = featureNames[3];
  const data = getDataOfDocPageByCategorySlugAndDocumentationSlug(categorySlug, documentationSlug);
  return (
    <DocumentationDetail {...{ data }}/>
  );
};

export const useFetchMenusConfigOfDocPage = () => {
  const [menus, setMenus] = useState<any[]>([]);
  useEffect(() => {
    FormUtils.submitForm({}, {
      method: 'get',
      endpoint: endpoints.endpointWithApiDomain('/category-documentations/public'),
      onGotSuccess: response => setMenus(response || []),
    });
  }, []);
  return menus;
};

export const normalizeDocMenuData = (menus) => {
  return menus.map(menu => {
    const { documentations, slug, name } = menu;
    return {
      href: `docs/${slug}`,
      name: name,
      children: documentations?.map(menuItem => ({
        href: `/docs/${slug}/${menuItem.slug}`,
        name: menuItem.title,
        slug: menuItem.slug,
      })),
    };
  });
};
