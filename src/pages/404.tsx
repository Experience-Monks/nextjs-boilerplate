import { GetStaticProps } from 'next';

import PageNotFound, { PageNotFoundProps } from '@/components/PageNotFound/PageNotFound';

export const getStaticProps: GetStaticProps<PageNotFoundProps> = async () => {
  return {
    props: {
      head: { title: 'Not Found' }
    }
  };
};

export default PageNotFound;
