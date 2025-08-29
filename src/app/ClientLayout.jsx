"use client";

import { usePathname } from "next/navigation";
import WhatsAppWidget from "./components/WhatsAppWidget";
import WelcomeModal from "./components/WelcomeModal";

function isAdminPath(pathname) {
  return pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showComponents = !isAdminPath(pathname);

  return (
    <>
      {children}
      {showComponents && (
        <>
          <WhatsAppWidget />
          <WelcomeModal />
        </>
      )}
    </>
  );
}
