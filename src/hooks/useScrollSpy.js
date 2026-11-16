import { useEffect, useState } from "react";

export function useScrollSpy(sectionsId = [], offset = 100) {
    const [activeSection, setActiveSection] = useState(null);

    function handleScroll() {
        const scrollPosition = window.scrollY + offset;
        const activeId = sectionsId.find((id) => {
            const section = document.getElementById(id);
            if (!section) return false;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const isSectionFound =
                (scrollPosition >= sectionTop) &&
                (scrollPosition < sectionTop + sectionHeight);
            return isSectionFound;
        });
        if (activeId)
            setActiveSection(activeId);
        else
            setActiveSection(null);
    };

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionsId, offset]);

    return activeSection;
};

export function scrollToSection(sectionId, offset = 80) {
    const section = document.getElementById(sectionId);
    if (section) {
        const top = section.offsetTop - offset;
        window.scrollTo({ top, behavior: "smooth" });
    };
};