"use client";

import React from 'react';
import { MOCK_CLIENTS } from '@/data/mock-data';
import ClientDashboard from '@/components/client/ClientDashboard';

export default function ClientPage() {
  const MOCK_USER = MOCK_CLIENTS[0];

  return <ClientDashboard user={MOCK_USER} />;
}