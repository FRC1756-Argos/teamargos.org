import React from 'react';
import Layout from '@theme/Layout';
import ToolFrame from '../../components/ToolFrame';

export default function PidTuningLabPage() {
  return (
    <Layout
      title="PID Tuning Lab"
      description="Tune PID and feedforward on a simulated FRC arm, elevator, and flywheel."
      noFooter
    >
      <main>
        <ToolFrame src="/tools/pid-tuning-lab.html" title="PID Tuning Lab" />
      </main>
    </Layout>
  );
}
