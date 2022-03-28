import classnames from 'classnames';
import yaml from 'js-yaml';

import styles from './index.module.scss';

import Banner from './../../components/Banner/Banner';
import Card from './../../components/Card/Card';
import Checklist from './../../components/Checklist/Checklist';
import Container from './../../components/Container/Container';
import Embedded from './../../components/Embedded/Embedded';
import Form from './../../components/Form/Form';
import Grid from './../../components/Grid/Grid';
import Head from './../../components/Head/Head';
import Header from './../../components/Header/Header';
import List from './../../components/List/List';
import PlainList from './../../components/PlainList/PlainList';
import Table from './../../components/Table/Table';
import TestRail from './../../components/TestRail/TestRail';

import { Categories, Component, Setting, Ursus } from './../../types/ursusTypes';

import ursusConfig from '../../../../ursus.yml';
import { COMPONENTS } from '../../utils/constants';

export type Props = {
  className: string;
  setting: Setting;
  sections: Component[];
};

function Config({ className, setting, sections }: Props) {
  return (
    <div className={classnames(styles.Config, className)}>
      <Head />
      <Header className={styles.header} setting={setting} />
      <div className={styles.content}>
        {sections &&
          sections.length > 0 &&
          sections.map((item: Component, index: number) => {
            switch (item.component) {
              case COMPONENTS.CARD:
                return <Card list={item.items} title={item.title} key={index} />;
              case COMPONENTS.TIPS:
                return <Banner message={item.content} key={index} />;
              case COMPONENTS.TABLE:
                return (
                  <>
                    <Table title={item.title} list={item.items} key={index} checklist={item.checklist} />
                    {item.checklist && <Grid checklist={item.checklist} key={index} />}
                  </>
                );
              case COMPONENTS.CHECKLIST:
                return <Checklist list={item.items} key={index} />;
              case COMPONENTS.PLAINLIST:
                return <PlainList title={item.title} list={item.items} key={index} />;
              case COMPONENTS.EMBEDDED:
                return <Embedded title={item.title} link={item.link} key={index} />;
              case COMPONENTS.LIST:
                return (
                  <List
                    title={item.title}
                    list={item.items}
                    key={index}
                    isBlockItem={item?.config?.columnDirection ?? false}
                  />
                );
              case COMPONENTS.CONTAINER:
                return <Container title={item.title} reportLink={item.reportLink} list={item.items} key={index} />;
              case COMPONENTS.TESTRAIL:
                return <TestRail title={item.title} key={index} />;
              case COMPONENTS.FORM:
                return <Form title={item.title} field={item.items} key={index} />;
              default:
                return null;
            }
          })}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const config = yaml.load(ursusConfig) as Ursus;
  const paths = Object.keys(config.categories).map((name) => ({
    params: {
      node: name.toLowerCase()
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export type StaticPropsTypes = {
  params: {
    node: keyof Categories;
  };
};

export async function getStaticProps({ params: { node } }: StaticPropsTypes) {
  const config = yaml.load(ursusConfig) as Ursus;
  const selectedCategory = config.categories[node];

  return {
    props: {
      ...selectedCategory
    }
  };
}

export default Config;
