import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../nextjs-blog/lib/posts-firebase';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import postStyles from '../../styles/FirstPost.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.name}</title>
      </Head>
      <article className={postStyles.article}>
        <p className={postStyles.kicker}>{postData.topic}</p>
        <h1 className={postStyles.title}>{postData.name}</h1>
        <p className={postStyles.meta}>{postData.title}</p>
        <div className={`${utilStyles.lightText} ${postStyles.meta}`}>
          <Date dateString={postData.date} />
        </div>
        <div
          className={postStyles.body}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
