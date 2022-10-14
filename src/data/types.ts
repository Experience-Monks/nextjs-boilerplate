export type HeadProps = {
  title: string;
  image?: string;
  keywords?: string[];
  siteName?: string;
  description?: string;
};

export type PageProps = {
  head: HeadProps;
  unsupported?: boolean;
};
