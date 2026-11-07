import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ToolFrame from '../../components/ToolFrame';

// Student check-in kiosk. On the shop tablet, open /tools/big-board-checkin.html
// directly in full-screen mode instead of this page.
export default function BigBoardCheckinPage() {
  return (
    <Layout title="Check In" description="Argos student check-in and check-out." noFooter>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main>
        <ToolFrame src="/tools/big-board-checkin.html" title="Argos Check-In" />
      </main>
    </Layout>
  );
}
