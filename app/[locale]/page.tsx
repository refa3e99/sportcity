import Image from 'next/image';
import { ArrowRight, MapPin, Phone, Mail, CheckCircle, Shirt, Scissors, Palette, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function LandingPage() {
  const tNav = useTranslations('Navigation');
  const tHero = useTranslations('Hero');
  const tAbout = useTranslations('About');
  const tServices = useTranslations('Services');
  const tCollection = useTranslations('Collection');
  const tLocation = useTranslations('Location');
  const tCTA = useTranslations('CTA');
  const tFooter = useTranslations('Footer');

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-lime-500 rounded-md flex items-center justify-center"> */}
              {/* <Shirt className="text-white w-5 h-5" /> */}
              <div>
                <Image src="/logo2.svg" alt="icon" width={100} height={100} />
              </div>
              {/* </div> */}
              <span className="font-bebas text-2xl tracking-wider text-slate-900 mt-1">SPORT CITY</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#about" className="text-slate-600 hover:text-lime-500 font-medium transition-colors">{tNav('about')}</a>
              <a href="#services" className="text-slate-600 hover:text-lime-500 font-medium transition-colors">{tNav('services')}</a>
              <a href="#location" className="text-slate-600 hover:text-lime-500 font-medium transition-colors">{tNav('location')}</a>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 m-1">
              <div className="md:hidden shrink-0">
                <LanguageSwitcher />
              </div>
              <Link href="/playground" className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 text-sm whitespace-nowrap shrink-0 w-auto">
                <span className="hidden sm:inline">{tNav('playground')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/sportswear/1920/1080"
            alt="Sportswear Background"
            fill
            className="object-cover opacity-30"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent rtl:bg-gradient-to-l"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide mb-6 leading-tight">
              {tHero('title1')} <span className="text-lime-400">{tHero('title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl">
              {tHero('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link href="/playground" className="bg-lime-500 hover:bg-lime-600 text-white px-4 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-colors text-center flex items-center justify-center gap-2 w-auto">
                {tHero('start')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Link>
              <a href="#services" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-colors text-center w-auto">
                {tHero('view')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bebas text-4xl tracking-wide mb-6 text-slate-900">{tAbout('title')}</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {tAbout('p1')}
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                {tAbout('p2')}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-lime-500 w-6 h-6 shrink-0" />
                  <span className="font-medium text-slate-800">{tAbout('f1')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-lime-500 w-6 h-6 shrink-0" />
                  <span className="font-medium text-slate-800">{tAbout('f2')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-lime-500 w-6 h-6 shrink-0" />
                  <span className="font-medium text-slate-800">{tAbout('f3')}</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-lime-500 w-6 h-6 shrink-0" />
                  <span className="font-medium text-slate-800">{tAbout('f4')}</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-white flex items-center justify-center p-8">
              <Image
                src="/logo.png"
                alt="Sport City Logo"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section id="services" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bebas text-4xl tracking-wide mb-4 text-slate-900">{tServices('title')}</h2>
            <p className="text-slate-600 text-lg">
              {tServices('subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
              <div className="w-14 h-14 bg-lime-100 rounded-lg flex items-center justify-center mb-6">
                <Shirt className="text-lime-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{tServices('s1_title')}</h3>
              <p className="text-slate-600">
                {tServices('s1_desc')}
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Scissors className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{tServices('s2_title')}</h3>
              <p className="text-slate-600">
                {tServices('s2_desc')}
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
              <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                <Palette className="text-emerald-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{tServices('s3_title')}</h3>
              <p className="text-slate-600">
                {tServices('s3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection */}
      <section id="collection" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bebas text-4xl tracking-wide mb-4 text-slate-900">{tCollection('title')}</h2>
            <p className="text-slate-600 text-lg">
              {tCollection('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* Category 1 */}
            <div className="group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <Image
                src="https://images.unsplash.com/photo-1663563624389-95349417e247?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Team Jerseys"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bebas text-2xl tracking-wide">{tCollection('c1_title')}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{tCollection('c1_desc')}</p>
              </div>
            </div>

            {/* Category 2 */}
            <div className="group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <Image
                src="https://images.unsplash.com/photo-1659081469066-c88ca2dec240?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Activewear"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bebas text-2xl tracking-wide">{tCollection('c2_title')}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{tCollection('c2_desc')}</p>
              </div>
            </div>

            {/* Category 3 */}
            <div className="group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <Image
                src="https://images.unsplash.com/photo-1715609104589-97585b210c6e?q=80&w=945&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Outerwear"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bebas text-2xl tracking-wide">{tCollection('c3_title')}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{tCollection('c3_desc')}</p>
              </div>
            </div>

            {/* Category 4 */}
            <div className="group relative h-64 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <Image
                src="https://t3.ftcdn.net/jpg/02/59/82/20/360_F_259822053_WPeuyegBS9tJkaKULvIwuC3kEUmjcO3z.jpg"
                alt="Accessories"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-bebas text-2xl tracking-wide">{tCollection('c4_title')}</h3>
                <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{tCollection('c4_desc')}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              {tCollection('visit_text')}
            </p>
            <a href="#location" className="inline-flex items-center gap-2 text-lime-500 font-bold hover:text-lime-600 transition-colors">
              {tCollection('visit_btn')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </a>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-slate-100 rounded-xl overflow-hidden h-[400px] relative">
              <iframe
                src="https://www.google.com/maps?q=31.9873608,35.9041633&hl=es;z=14&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="font-bebas text-4xl tracking-wide mb-6 text-slate-900">{tLocation('title')}</h2>
              <p className="text-slate-600 text-lg mb-8">
                {tLocation('subtitle')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tLocation('address_title')}</h4>
                    <p className="text-slate-600">{tLocation('address_val1')}<br />{tLocation('address_val2')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tLocation('phone_title')}</h4>
                    <p className="text-slate-600">+962 7 8691 2223</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-slate-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tLocation('email_title')}</h4>
                    <p className="text-slate-600">sportcityjo@gmail.com</p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">{tLocation('connect')}</h4>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/sportcityjo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-pink-100 hover:text-pink-600 rounded-full flex items-center justify-center transition-colors text-slate-700" aria-label="Instagram">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/sportcityjo" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-blue-100 hover:text-blue-600 rounded-full flex items-center justify-center transition-colors text-slate-700" aria-label="Facebook">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://wa.me/962786912223" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-100 hover:bg-green-100 hover:text-green-600 rounded-full flex items-center justify-center transition-colors text-slate-700" aria-label="WhatsApp">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a href="mailto:sportcityjo@gmail.com" className="w-12 h-12 bg-slate-100 hover:bg-lime-100 hover:text-lime-500 rounded-full flex items-center justify-center transition-colors text-slate-700" aria-label="Email">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-lime-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-bebas text-5xl tracking-wide mb-6">{tCTA('title')}</h2>
          <p className="text-xl text-lime-100 mb-10">
            {tCTA('subtitle')}
          </p>
          <Link href="/playground" className="inline-flex bg-white text-lime-500 hover:bg-slate-100 px-4 sm:px-8 py-3 sm:py-4 rounded-md font-bold text-base sm:text-lg transition-colors items-center justify-center gap-2 shadow-lg w-auto">
            {tCTA('btn')} <ArrowRight className="w-5 h-5 rtl:rotate-180" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Image
              src="/logo2.svg"
              alt="icon"
              width={100}
              height={100}
              className="bg-white rounded-md"
            />
            <span className="font-bebas text-2xl tracking-wider text-white mt-1">SPORT CITY</span>
          </div>
          <p>&copy; {new Date().getFullYear()} {tFooter('rights')}</p>
        </div>
      </footer>
    </div>
  );
}
