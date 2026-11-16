"use client";
import { useEffect, useRef, useState } from "react";
import { scrollToSection, useScrollSpy } from "@/hooks/useScrollSpy";
import { NAV_LINKS, PERSONAL_INFO } from "@/utils/constants";
import { Code, Menu, X } from "lucide-react";

export default function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const activeSection = useScrollSpy(NAV_LINKS.map(({ id }) => id)) || null;
    const menuRef = useRef(null);
    const burgerRef = useRef(null);

    const handleScroll = () => setIsScrolled((window.scrollY > 50));

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return;

        function handleOutsideClick(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !burgerRef.current?.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isMenuOpen]);

    function handleNavClick(event) {
        const element = event.currentTarget;
        const sectionId = element.dataset.section;
        if (sectionId)
            scrollToSection(sectionId);
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-1000 bg-transparent w-full py-4 transition-all duration-300
        ${(isScrolled) && `bg-black/30 backdrop-blur-lg`}`}
            style={{ transform: "translate3d(0, 0, 0)" }}
        >
            <div className="max-w-(1320px) mx-auto px-5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <Code className="w-6 h-6 text-primary " />
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="text-2xl font-bold bg-linear-to-r from-primary via-primary/50 to-primary/30 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity cursor-pointer"
                            aria-label="home"
                        >
                            {PERSONAL_INFO.name}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-7">
                        {NAV_LINKS.map(({ id, label }, index) => (
                            <button
                                key={index}
                                data-section={id}
                                onClick={handleNavClick}
                                className={`text-base font-medium transition-all duration-300 cursor-pointer
                                    ${(activeSection === id) ? "text-white" : "text-white/70 hover:text-white"}`}
                            >{label}</button>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={handleNavClick}
                            data-section={"contact"}
                            className="px-7 py-3.5 bg-white text-[#212121] font-medium text-base rounded-[17px] border border-white hover:bg-white/90 transition-all duration-300 cursor-pointer"
                        >Hire Me</button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        ref={burgerRef}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="md:hidden p-4 text-white hover:text-white/80 transition-colors"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {isMenuOpen ? <X className="w-6 h-6 cursor-pointer" /> : <Menu className="w-6 h-6 cursor-pointer" />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            <nav
                id="mobile-navigation"
                ref={menuRef}
                inert={!isMenuOpen}
                className={`md:hidden transition-all duration-300 overflow-hidden
                ${(isMenuOpen) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="bg-black/95 backdrop-blur-lg border-t border-white/10 px-3 py-6 space-y-1">
                    {NAV_LINKS.map(({ id, label }) => (
                        <button
                            key={id}
                            data-section={id}
                            onClick={handleNavClick}
                            className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer
                                ${(activeSection === id)
                                    ? "text-white bg-white/10"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                }`}
                        >{label}</button>
                    ))}
                    <button
                        onClick={handleNavClick}
                        data-section="contact"
                        className="w-full px-7 py-3.5 bg-white text-[#212121]
                        font-medium text-base rounded-[17px] border border-white
                       hover:bg-white/90 transition-all duration-300 mt-2 cursor-pointer"
                    >
                        Hire Me
                    </button>
                </div>
            </nav>
        </header>
    );
};