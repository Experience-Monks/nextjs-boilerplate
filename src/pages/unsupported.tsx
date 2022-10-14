import { GetStaticProps } from 'next';

import PageUnsupported, { PageUnsupportedProps } from '@/components/PageUnsupported/PageUnsupported';

export const getStaticProps: GetStaticProps<PageUnsupportedProps> = async () => {
  return {
    props: {
      head: { title: 'Not Supported' },
      unsupported: true
    }
  };
};

export default PageUnsupported;
