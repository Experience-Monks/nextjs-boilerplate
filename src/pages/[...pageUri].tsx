import { GetStaticPropsContext } from 'next';
import { getNextStaticProps, is404 } from '@faustjs/next';

import Head from '@/components/Head/Head';

import sanitizer from '@/utils/sanitizer';

import { client, Page as PageType } from '@/client';

export interface PageProps {
  page: PageType | null | undefined;
}

export function PageComponent({ page }: PageProps) {
  return (
    <main>
      <Head />

      <h1>{page?.title()}</h1>

      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: sanitizer(page?.content()!) }} />
        </div>
      </main>
    </main>
  );
}

export default function Page() {
  const { usePage } = client;
  const page = usePage();

  return <PageComponent page={page} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client })
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}
