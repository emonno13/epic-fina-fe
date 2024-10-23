import { SCREEN } from '@components/features/banners-management/constants';
import { handleCallApi } from '@components/shared/utils/callApi';
import { endpoints } from '@lib/networks/endpoints';
import { doRequest } from '@lib/networks/http';
import { sample } from 'underscore';

export const ClientHomeUtils = {
  getProductDetail: async (ERP) => {
    const project = await ClientHomeUtils.fetchProject(ERP);
    const productId = project?.data?.[0]?.prioritizeProductId;

    if (!productId) {
      return null;
    }

    const paramsProduct = {
      where: {
        partnerProjectId: ERP,
      },
      include: [
        {
          relation: 'org',
        },
        {
          relation: 'productDetails',
          scope: {
            where: {
              status: {
                nin: ['deleted'],
              },
            },
            include: [{ relation: 'org' }],
          },
        },
      ],
    };

    const product = await doRequest(
      {
        url: `${endpoints.endpointWithApiDomain(`/products/public/${productId}`)}?filter=${encodeURIComponent(JSON.stringify(paramsProduct))}`,
      },
      'get',
    );

    return {
      project: project?.data?.[0],
      ...product,
    };
  },
  fetchProject: async (ERP) => {
    const params = {
      where: {
        partnerProjectId: ERP,
      },
    };

    return await doRequest(
      {
        url: `${endpoints.endpointWithApiDomain('/projects/public')}?filter=${encodeURIComponent(JSON.stringify(params))}`,
      },
      'get',
    );
  },
  fetchBanners: async (screen?: string) => {
    const bannersParams = {
      where: {
        screens: { $in: [screen || SCREEN.HOME] },
      },
      order: ['priority ASC'],
    };
    return await doRequest(
      {
        url: `${endpoints.endpointWithApiDomain('/banners/public')}?filter=${encodeURIComponent(JSON.stringify(bannersParams))}`,
      },
      'get',
    );
  },
  fetchLoans: async () => {
    return await handleCallApi({
      params: {
        withRelations: ['product', 'org'],
      },
      nodeName: 'product-details/public',
    });
  },
  fetchProjects: async () => {
    return await handleCallApi({
      nodeName: 'projects/public',
    });
  },
  fetchInsurancesByCategory: async (category) => {
    return await handleCallApi({
      nodeName: 'products/public',
      params: {
        filter: { where: { categoryId: category.id } },
      },
    });
  },
  getInsuranceData: async () => {
    const insuranceCategoriesRes = await handleCallApi({
      nodeName: 'categories/public',
    });
    if (Array.isArray(insuranceCategoriesRes?.data)) {
      const insuranceCategories = sample(insuranceCategoriesRes.data, 3);
      const promiseInsuranceProducts = await Promise.all(
        insuranceCategories.map((category) =>
          ClientHomeUtils.fetchInsurancesByCategory(category),
        ),
      );
      const newInsuranceData = insuranceCategories.map((category, index) => ({
        categoryData: category,
        productList: promiseInsuranceProducts[index],
      }));
      return newInsuranceData;
    }
    return {};
  },
  fetchRealEstates: async () => {
    return await handleCallApi({
      nodeName: 'properties/public',
    });
  },
  init: async () => {
    const [loans, projects, insuranceData, realEstates] = await Promise.all([
      ClientHomeUtils.fetchLoans(),
      ClientHomeUtils.fetchProjects(),
      ClientHomeUtils.getInsuranceData(),
      ClientHomeUtils.fetchRealEstates(),
    ]);
    return {
      loans,
      projects,
      insuranceData,
      realEstates,
    };
  },
};
