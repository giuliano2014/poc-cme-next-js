'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';

export default function ProductSlider({ productSlider }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        dragFree: false
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const scrollbarRef = useRef(null);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const onScroll = useCallback(() => {
        if (!emblaApi) return;
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    const updateScrollPosition = useCallback(
        (clientX) => {
            if (!emblaApi || !scrollbarRef.current) return;
            const rect = scrollbarRef.current.getBoundingClientRect();
            const dragPosition = Math.max(
                0,
                Math.min(1, (clientX - rect.left) / rect.width)
            );
            const targetIndex = Math.round(
                dragPosition * (emblaApi.scrollSnapList().length - 1)
            );
            emblaApi.scrollTo(targetIndex, false);
        },
        [emblaApi]
    );

    const onScrollbarClick = useCallback(
        (event) => {
            updateScrollPosition(event.clientX);
        },
        [updateScrollPosition]
    );

    const onScrollbarMouseDown = useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
        if (scrollbarRef.current) {
            const rect = scrollbarRef.current.getBoundingClientRect();
            const dragPosition = Math.max(
                0,
                Math.min(1, (event.clientX - rect.left) / rect.width)
            );
            setScrollProgress(dragPosition * 100);
        }
    }, []);

    const onScrollbarMouseMove = useCallback(
        (event) => {
            if (!isDragging) return;
            requestAnimationFrame(() => {
                updateScrollPosition(event.clientX);
            });
        },
        [isDragging, updateScrollPosition]
    );

    const onScrollbarMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        onScroll();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('scroll', onScroll);
        emblaApi.on('reInit', onScroll);
    }, [emblaApi, onSelect, onScroll]);

    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e) => onScrollbarMouseMove(e);
            const handleMouseUp = () => onScrollbarMouseUp();

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [isDragging, onScrollbarMouseMove, onScrollbarMouseUp]);

    if (
        !productSlider ||
        !productSlider.products ||
        productSlider.products.length === 0
    ) {
        return null;
    }

    const { background_color, products } = productSlider;

    return (
        <div
            className="relative w-full py-16 px-4"
            style={{ backgroundColor: background_color || '#f5f5f5' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="relative">
                    <button
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Produit précédent"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                    </button>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6">
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className="flex-[0_0_calc(25%-18px)] min-w-0"
                                >
                                    <a
                                        href={product.link}
                                        className="flex flex-col items-center text-center group"
                                    >
                                        <div className="mb-4 overflow-hidden rounded-lg w-full relative h-48">
                                            <Image
                                                src={
                                                    product.image_url ||
                                                    '/placeholder.svg'
                                                }
                                                alt={product.main_text}
                                                fill
                                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, 25vw"
                                            />
                                        </div>
                                        <h3
                                            className="text-lg font-bold mb-2"
                                            style={{
                                                color:
                                                    product.text_color || '#000'
                                            }}
                                        >
                                            {product.main_text}
                                        </h3>
                                        <p
                                            className="text-sm mb-3"
                                            style={{
                                                color:
                                                    product.text_color || '#000'
                                            }}
                                        >
                                            {product.secondary_text}
                                        </p>
                                        {product.color_samples &&
                                            product.color_samples.length >
                                                0 && (
                                                <div className="flex gap-2 justify-center">
                                                    {product.color_samples.map(
                                                        (color, colorIndex) => (
                                                            <div
                                                                key={colorIndex}
                                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                                style={{
                                                                    backgroundColor:
                                                                        color
                                                                }}
                                                                title={color}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Produit suivant"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    ref={scrollbarRef}
                    className="mt-8 w-full cursor-pointer select-none"
                    onClick={onScrollbarClick}
                    onMouseDown={onScrollbarMouseDown}
                >
                    <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gray-800 rounded-full"
                            style={{
                                width: `${scrollProgress}%`,
                                transition: isDragging
                                    ? 'none'
                                    : 'width 0.1s ease-out'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
