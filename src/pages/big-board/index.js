import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ToolFrame from '../../components/ToolFrame';

// Meeting big board. On the shop TV, open /tools/big-board.html directly in
// full-screen mode instead of this page.
export default function BigBoardPage() {
  return (
    <Layout title="Big Board" description="Argos meeting dashboard." noFooter>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <ToolFrame src="/tools/big-board.html" title="Argos Big Board" />
      </main>
    </Layout>
  );
}
