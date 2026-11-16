"use client";
import { scrollToSection } from "@/hooks/useScrollSpy";
import {
    NAV_LINKS,
    PERSONAL_INFO,
    SOCIAL_LINKS
} from "@/utils/constants";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import FadeIn from "../animations";
import { Heart, Mail, MapPin } from "lucide-react";

export default function Footer() {

    const socialIcons = {
        github: BsGithub,
        linkedin: BsLinkedin
    };

    return (
        <footer className="relative bg-black overflow-hidden border-t border-white/10 ">
            <div className="absolute inset-0 hoverflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 opacity-30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div >
                    <FadeIn delay={0}>
                        <div className="grid grid-cols-1 md:grid-cols-2 items-end md:gap-12">
                            <div>
                                <h3 className="text-3xl font-bold bg-linear-to-r from-primary/80 via-primary to-primary/80 bg-clip-text text-transparent mb-2">
                                    {PERSONAL_INFO.name}
                                </h3>
                                <p className="text-white/60 text-sm mb-4 md:mb-6 leading-relaxed">
                                    {PERSONAL_INFO.tagline}
                                </p>
                            </div>
                            <div className="flex gap-4 mb-6">
                                {Object.entries(SOCIAL_LINKS).slice(0, 3).map(([platform, url]) => {
                                    const Icon = socialIcons[platform];
                                    if (Icon)
                                        return (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:scale-110 transition-all duration-300 group"
                                            >
                                                <Icon className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors " />
                                            </a>
                                        );
                                    else
                                        return null;
                                })}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mb-12">
                            <a
                                href={`mailto:${PERSONAL_INFO.email}`}
                                className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                                    {PERSONAL_INFO.email}
                                </span>
                            </a>
                            <div className="group flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-primary/30 transition-all duration-300 cursor-pointer">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div className="text-white/70 text-sm group-hover:text-white transition-colors">
                                    {PERSONAL_INFO.location}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn delay={300}>
                    <div className="py-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-white/50 text-sm">
                                &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
                            </p>
                            <p className="flex items-center gap-2 text-white/50 text-sm">
                                Built with <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> using React & Tailwind CSS
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </footer>
    );

};