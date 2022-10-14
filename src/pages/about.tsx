import { GetStaticProps } from 'next';

import PageAbout, { PageAboutProps } from '@/components/PageAbout/PageAbout';

export const getStaticProps: GetStaticProps<PageAboutProps> = async () => {
  return {
    props: {
      head: { title: 'About' }
    }
  };
};

export default PageAbout;
