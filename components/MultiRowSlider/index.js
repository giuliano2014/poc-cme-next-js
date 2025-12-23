'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './styles.module.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// Custom hooks for Next.js
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ innerWidth: 1024 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ innerWidth: window.innerWidth });
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

const useIOS = () => {
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
        setIsIOS(ios);
    }, []);

    return { isIOS };
};

const NextArrow = (props) => {
    const { onClick, className, style } = props;
    return (
        <BsChevronRight
            className={className}
            onClick={onClick}
            style={{
                ...style,
                display: 'block',
                color: '#404143',
                cursor: 'pointer',
                width: '30px',
                height: 'auto'
            }}
        />
    );
};

const PrevArrow = (props) => {
    const { onClick, className, style } = props;
    return (
        <BsChevronLeft
            className={className}
            onClick={onClick}
            style={{
                ...style,
                display: 'block',
                color: '#404143',
                cursor: 'pointer',
                width: '30px',
                height: 'auto'
            }}
        />
    );
};

const MultiRowSlider = ({ parentSelection }) => {
    const ref = useRef(null);
    const refSlider = useRef(null);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 768;
    const { isIOS } = useIOS();

    // Guard clause
    if (!parentSelection) return null;

    useEffect(() => {
        if (parentSelection.text && ref.current) {
            ref.current.innerHTML = parentSelection.text;
        }
    }, [parentSelection.text]);

    useEffect(() => {
        if (parentSelection.pagination_main_color) {
            document.documentElement.style.setProperty(
                '--multirow-thumb-color',
                parentSelection.pagination_main_color
            );
        }
        if (parentSelection.pagination_secondary_color) {
            document.documentElement.style.setProperty(
                '--multirow-track-color',
                parentSelection.pagination_secondary_color
            );
        }
    }, [parentSelection]);

    return (
        <div
            className={`${classes.sliderContainer}  ${isIOS && classes.ios}`}
            style={{ backgroundColor: parentSelection.background_color }}
        >
            <PrevArrow
                onClick={() =>
                    refSlider.current.scrollBy({
                        top: 0,
                        left: -251,
                        behaviour: 'smooth'
                    })
                }
                className={classes.prevArrow}
            />

            <NextArrow
                onClick={() =>
                    refSlider.current.scrollBy({
                        top: 0,
                        left: 251,
                        behaviour: 'smooth'
                    })
                }
                className={classes.nextArrow}
            />
            <div
                className={classes.title}
                style={{ color: parentSelection.text_color }}
                ref={ref}
            >
                {parentSelection?.text}
            </div>
            <div className={classes.horizontalSlider}>
                <div className={classes.slider} ref={refSlider}>
                    <div className={classes.slidesContainer}>
                        {parentSelection?.image_blocks.map((product, index) => {
                            return (
                                <div key={index} className={classes.slide}>
                                    <Link href={product.link}>
                                        <div className={classes.img_container}>
                                            <Image
                                                src={product.image_url}
                                                alt=""
                                                width={isMobile ? 116 : 215}
                                                height={isMobile ? 106 : 192}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiRowSlider;
