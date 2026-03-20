"use client";

import { useEffect } from 'react';

export default function ProfileEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (footer) footer.style.display = 'none';
    return () => {
      if (footer) footer.style.display = '';
    };
  }, []);

  return <>{children}</>;
}
