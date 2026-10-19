import React from 'react';
import Layout from '@theme/Layout';
import ToolFrame from '../../components/ToolFrame';

export default function PoseEstimatorLabPage() {
  return (
    <Layout
      title="Pose Estimator Lab"
      description="Drive a swerve robot on the 2026 field and see how vision and odometry are fused into one pose."
      noFooter
    >
      <main>
        <ToolFrame src="/tools/pose-estimator-lab.html" title="Pose Estimator Lab" />
      </main>
    </Layout>
  );
}
