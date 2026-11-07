import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ToolFrame from '../../components/ToolFrame';

// Season hours for the big board admin: weekly summary, hours by meeting day,
// and a per-student chart. Needs the admin passcode.
export default function BigBoardHoursPage() {
  return (
    <Layout title="Season Hours" description="Student hours from big board check-ins." noFooter>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <ToolFrame src="/tools/big-board-hours.html" title="Season Hours" />
      </main>
    </Layout>
  );
}
