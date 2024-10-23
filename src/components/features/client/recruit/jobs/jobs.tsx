import useForm from 'antd/lib/form/hooks/useForm';
import Filter from './filter';
import ClientFeatureProvider from '../../../../../schema-form/client-features/providers/client-feature-provider';

import './jobs.module.scss';


const RecruitJobs = () => {
  const [form] = useForm();

  return (
    <ClientFeatureProvider {...{
      form,
      nodeName: 'jobs/public',
      pageSize: 15,
      initialFetching: true,
    }}>
      <Filter />
    </ClientFeatureProvider>
  );
};

export default RecruitJobs;
