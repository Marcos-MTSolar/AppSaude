/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ProfileSelector from './components/ProfileSelector';
import Dashboard from './components/Dashboard';

export default function App() {
  const [profile, setProfile] = useState<'marcos' | 'sandra' | null>(null);

  if (!profile) {
    return <ProfileSelector onSelect={setProfile} />;
  }

  return <Dashboard profile={profile} onLogout={() => setProfile(null)} />;
}

