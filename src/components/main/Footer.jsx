// components/Footer.js
import { MAIN_WEBSITE } from '@/lib/assets/assets';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-[#2f1889] to-[#1a104d] text-white pt-16 pb-8 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="hover:scale-105 transition-transform duration-300">
                            <Image
                                src={MAIN_WEBSITE.logo}
                                height={80}
                                width={180}
                                alt="logo"
                                className="filter drop-shadow-lg"
                            />
                        </div>
                        <div className="flex items-start space-x-3 group">
                            <MapPin className="mt-1 text-blue-200 group-hover:text-white transition-colors" />
                            <div className="text-gray-200 group-hover:text-white transition-colors">
                                <p>10, Shiva Compound,</p>
                                <p>Delhi-UP border, Ghaziabad</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 group">
                            <Phone className="text-blue-200 group-hover:text-white transition-colors" />
                            <p className="text-gray-200 group-hover:text-white transition-colors">+91 72487 72488</p>
                        </div>
                        <div className="flex items-center space-x-3 group">
                            <Mail className="text-blue-200 group-hover:text-white transition-colors" />
                            <p className="text-gray-200 group-hover:text-white transition-colors">book@tapscabs.com</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-blue-400 pl-3">Quick Links</h3>
                        <ul className="space-y-4">
                            {['Home', '#Why Us', '#Testimonials', 'Blogs', '#Contact'].map((link) => (
                                <li key={link}>
                                    <Link
                                        href={`/${link === 'Home' ? "" : link.toLowerCase().replace(' ', '-')}`}
                                        className="text-gray-300 hover:text-white transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.replace('#', '')}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policies */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-blue-400 pl-3">Policies</h3>
                        <ul className="space-y-4">
                            {['Terms and Conditions', 'Privacy Policy', 'Refund Policy'].map((policy) => (
                                <li key={policy}>
                                    <Link
                                        href={`/${policy.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                                        className="text-gray-300 hover:text-white transition-colors flex items-center group"
                                    >
                                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {policy}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Proof */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-bold mb-6 text-white border-l-4 border-blue-400 pl-3">We're Trusted</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Add trust badges or partner logos here */}
                            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm flex items-center justify-center">
                                <span className="text-sm font-medium">5-Star Rated</span>
                            </div>
                            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm flex items-center justify-center">
                                <span className="text-sm font-medium">5000+ Rides</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-white/10 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © 2025 <span className="font-bold text-white">Taps Cabs</span>. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-400">
                            Designed by{' '}
                            <Link
                                href="https://matchbestsoftware.com/"
                                target="_blank"
                                className="font-medium text-white hover:text-blue-300 transition-colors"
                            >
                                Matchbest Software
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}