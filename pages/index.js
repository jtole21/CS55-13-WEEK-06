import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import { getSortedPostsData } from '../nextjs-blog/lib/posts-firebase';
import Link from 'next/link';
import Date from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${homeStyles.introCard}`}>
        <p>
          Hi, I&apos;m Jess Reyes. I am learning full-stack web development with
          Next.js in CS55.13.
        </p>
        <p>
          This page is pre-rendered with <code>getStaticProps</code>. The names
          below are loaded from a Cloud Firestore collection named{' '}
          <code>posts</code>.
        </p>
      </section>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${homeStyles.blogSection}`}
      >
        <h2 className={utilStyles.headingLg}>People</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, topic, name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{name}</Link>
              <br />
              <small className={utilStyles.lightText}>
                {title}
                <br />
                <Date dateString={date} />
                <span className={homeStyles.topic}>{topic}</span>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
