import React from 'react';
import Layout from '@theme/Layout';
import MatchScoringCalculator from '../components/MatchScoringCalculator';

export default function ScoringCalculatorPage() {
  return (
    <Layout
      title="Match Scoring Calculator"
      description="Plan autonomous, teleop, and end game scoring strategies for FRC matches."
    >
      <main>
        <MatchScoringCalculator />
      </main>
    </Layout>
  );
}
