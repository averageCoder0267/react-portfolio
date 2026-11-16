"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { categories, projects } from "@/data/projects";
import FadeIn from "../animations/FadeIn";
import { ProjectCard } from "../ui";
import {
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Globe,
    Palette,
    Target,
    Zap
} from "lucide-react";

export default function ProjectsSection() {

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        slidesToScroll: 1,
        containScroll: "trimSnaps"
    });

    const [activeCategory, setActiveCategory] = useState("All");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [snapCount, setSnapCount] = useState(0);

    const filteredProjects = (activeCategory === "All")
        ? projects
        : projects.filter((project) => (
            project.category === activeCategory
        ));

    const updateCarousel = useCallback((api) => {
        setCurrentIndex(api.selectedScrollSnap());
        setSnapCount(api.scrollSnapList().length);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        updateCarousel(emblaApi);

        emblaApi.on("select", updateCarousel);
        emblaApi.on("reInit", updateCarousel);

        return () => {
            emblaApi.off("select", updateCarousel);
            emblaApi.off("reInit", updateCarousel);
        };
    }, [emblaApi, updateCarousel]);

    function handleCategoryChange(category) {
        setActiveCategory(category);
        setCurrentIndex(0);
    };

    const categoryIcons = {
        "All": Target,
        "Web Apps": Globe,
        "UI Components": Palette,
        "Full Stack": Zap
    };

    return (
        <section id="projects" className="relative py-20 bg-black overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-primary/20 opacity-20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary-10 opacity-20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FadeIn delay={0}>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">My Work</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">Featured Projects</h2>
                        <p className="text-lg text-white/60 max-w-2xl mx-auto">Showcasing my best work and achievements</p>
                    </div>
                </FadeIn>

                {/* Category Filter */}
                <FadeIn delay={100}>
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((category => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`group relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${(activeCategory === category) ? "text-white" : "text-white/60 hover:text-white cursor-pointer"}`}
                            >
                                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${(activeCategory === category) ? "bg-primary/10 opacity-100" : "bg-white/5 border border-white/10 group-hover:bg-white/10"}`} />
                                <div className="relative flex items-center gap-2">
                                    {React.createElement(categoryIcons[category], { className: "w-4 h-4" })}
                                    <span className="text-sm">{category}</span>
                                </div>
                                {(activeCategory === category) && (
                                    <div className="absolute inset-0 rounded-full bg-primary/70 blur-lg opacity-50 -z-10" />
                                )}
                            </button>
                        )))}
                    </div>
                </FadeIn>

                {/* Projects Carousel */}
                <FadeIn delay={200}>
                    <div className="relative">
                        <div
                            ref={emblaRef}
                            className="overflow-x-auto hide-scrollbar"
                        >
                            <div className="flex gap-6 pb-4">
                                {filteredProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start"
                                    >
                                        <ProjectCard project={project} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        {filteredProjects.length > 3 && (
                            <>
                                <button
                                    onClick={emblaApi?.scrollPrev}
                                    disabled={!emblaApi?.canScrollPrev()}
                                    className="flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                    aria-label="Previous projects"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={emblaApi?.scrollNext}
                                    disabled={!emblaApi?.canScrollNext()}
                                    className="flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-4 items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                    aria-label="Next projects"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            </>
                        )}

                        {/* Navigation Dots */}
                        {filteredProjects.length > 3 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
                                {Array.from({ length: snapCount }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => emblaApi?.scrollTo(index)}
                                        className={`transition-all duration-300 rounded-full cursor-pointer
                                            ${(index === currentIndex)
                                                ? "bg-primary w-6 h-2"
                                                : "bg-white/30 w-2 h-2 hover:bg-primary/50"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};