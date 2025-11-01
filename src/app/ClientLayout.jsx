"use client";

import { usePathname } from "next/navigation";
import WhatsAppWidget from "./components/WhatsAppWidget";
import WelcomeModal from "./components/WelcomeModal";

function isAdminPath(pathname) {
  return pathname.startsWith('/admin-dashboard') || pathname.startsWith('/admin-login');
}

function isQuickInquiryPath(pathname) {
  return pathname === '/quick-inquiry';
}

function isPrivacyPolicyPath(pathname) {
  return pathname === '/privacy-policy';
}

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const showComponents = !isAdminPath(pathname);
  const isQuickInquiry = isQuickInquiryPath(pathname);
  const isPrivacyPolicy = isPrivacyPolicyPath(pathname);

  return (
    <>
      {children}
      {showComponents && !isQuickInquiry && !isPrivacyPolicy && (
        <>
          <WhatsAppWidget />
          <WelcomeModal />
        </>
      )}
    </>
  );
}
