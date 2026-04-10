'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <button 
      onClick={toggleLocale}
      className="flex items-center gap-2 text-slate-600 hover:text-lime-500 font-medium transition-colors"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span>{locale === 'en' ? 'العربية' : 'English'}</span>
    </button>
  );
}
