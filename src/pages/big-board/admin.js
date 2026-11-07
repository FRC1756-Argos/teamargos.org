import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ToolFrame from '../../components/ToolFrame';

// Admin page for the big board: edit announcements and deadlines.
// Needs the admin passcode, not the team passcode.
export default function BigBoardAdminPage() {
  return (
    <Layout title="Big Board Admin" description="Edit big board announcements and deadlines." noFooter>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <ToolFrame src="/tools/big-board-admin.html" title="Big Board Admin" />
      </main>
    </Layout>
  );
}
