import { LOAN_STATUS } from '@components/features/fina/products/utils';
import { useEffect, useState } from 'react';
import { endpoints } from '../../../../../../lib/networks/endpoints';
import { FormUtils } from '../../../../../../schema-form/utils/form-utils';
import { RelationUtils } from './../../../../../../schema-form/utils/form-utils';

export const useFetchCategoriesOutStanding = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint('categories/public'),
        hiddenValues: {
          filter: {
            where: {
              isOutstanding: true,
              type: 'loan_products',
            },
            fields: ['id', 'name', 'description'],
          },
        },
        onGotSuccess: (response) => {
          setCategories(response?.data || []);
        },
      },
    );
  }, []);

  return categories;
};

export const useFetchProductDetailsByCategoryId = (categoryId: string) => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    FormUtils.submitForm(
      {},
      {
        method: 'get',
        endpoint: endpoints.generateNodeEndpoint('product-details/public'),
        hiddenValues: {
          filter: {
            where: { categoryId, status: LOAN_STATUS.APPROVED },
            include: [
              RelationUtils.entity('org', ['id', 'backgroundColor', 'image']),
              RelationUtils.entity('product', ['id', 'type']),
            ],
            fields: [
              'id',
              'name',
              'outstandingAdvantages',
              'info',
              'slug',
              'orgId',
              'productId',
            ],
          },
        },
        onGotSuccess: (response) => {
          setProducts(response?.data || []);
        },
      },
    );
  }, [categoryId]);

  return products;
};
