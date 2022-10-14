import { GetStaticProps } from 'next';

import PageHome, { PageHomeProps } from '@/components/PageHome/PageHome';

export const getStaticProps: GetStaticProps<PageHomeProps> = async () => {
  return {
    props: {
      head: { title: 'Home' }
    }
  };
};

export default PageHome;
