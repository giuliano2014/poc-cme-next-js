'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './styles.module.css';
import { BsChevronLeft } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';

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

const Essentials = ({ essentials }) => {
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 768;
    const { isIOS } = useIOS();
    const refDesktop = useRef(null);
    const refMobile = useRef(null);
    const refSlider = useRef(null);

    // Guard clause
    if (!essentials) return null;

    useEffect(() => {
        if (essentials.slider.slider_pagination_main_color) {
            document.documentElement.style.setProperty(
                '--essentials-thumb-color',
                essentials.slider.slider_pagination_main_color
            );
        }
        if (essentials.slider.slider_pagination_secondary_color) {
            document.documentElement.style.setProperty(
                '--essentials-track-color',
                essentials.slider.slider_pagination_secondary_color
            );
        }
    }, [essentials]);

    useEffect(() => {
        if (essentials?.title.text) {
            if (isMobile && refMobile.current) {
                refMobile.current.innerHTML = essentials?.title.text;
            } else if (refDesktop.current) {
                refDesktop.current.innerHTML = essentials?.title.text;
            }
        }
    }, [essentials?.title.text, isMobile]);

    return (
        <div
            className={classes.wrapper}
            style={{ backgroundColor: essentials.background_color }}
        >
            <div className={`${classes.root} ${isIOS && classes.ios}`}>
                <PrevArrow
                    onClick={() =>
                        refSlider.current.scrollBy({
                            top: 0,
                            left: -316,
                            behaviour: 'smooth'
                        })
                    }
                    className={classes.prevArrow}
                />

                <NextArrow
                    onClick={() =>
                        refSlider.current.scrollBy({
                            top: 0,
                            left: 316,
                            behaviour: 'smooth'
                        })
                    }
                    className={classes.nextArrow}
                />
                <div
                    className={classes.titleMobile}
                    style={{ color: essentials?.title.text_color }}
                    ref={refMobile}
                >
                    {essentials?.title.text}
                </div>
                <div className={classes.flags}>
                    {essentials?.round_elements.map((flag, index) => {
                        return (
                            <Link
                                key={index}
                                href={flag.link}
                                className={classes.flag}
                                style={{ color: flag.text_color }}
                            >
                                <Image
                                    src={flag.image_url}
                                    alt=""
                                    width={120}
                                    height={120}
                                    loading="lazy"
                                    className={classes.flagImage}
                                />
                                <p className={classes.flagTitle}>
                                    {flag.main_text}
                                </p>
                                <p className={classes.flagSubtitle}>
                                    {flag.secondary_text}
                                </p>
                            </Link>
                        );
                    })}
                </div>
                <div className={classes.mainImage}>
                    <Link href={essentials?.main_image.link}>
                        <div className={classes.mainImgContainer}>
                            <Image
                                src={
                                    isMobile &&
                                    essentials?.main_image.image_mobile_url
                                        ? essentials?.main_image
                                              .image_mobile_url
                                        : essentials?.main_image.image_url
                                }
                                alt=""
                                className={classes.image}
                                width={isMobile ? 768 : 340}
                                height={isMobile ? 254 : 453}
                            />
                            <div
                                className={classes.mainImageText}
                                style={{
                                    color: essentials?.main_image.text_color,
                                    backgroundColor:
                                        essentials?.main_image
                                            .text_background_color
                                }}
                            >
                                <div className={classes.headline}>
                                    {essentials?.main_image.text}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className={classes.sliderContainer}>
                    <div
                        className={classes.titleDektop}
                        style={{ color: essentials?.title.text_color }}
                        ref={refDesktop}
                    >
                        {essentials?.title.text}
                    </div>
                    <div className={classes.horizontalSlider}>
                        <div className={classes.slider} ref={refSlider}>
                            <div className={classes.slidesContainer}>
                                {essentials?.slider?.slides.map(
                                    (slide, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={classes.slide}
                                            >
                                                <Link href={slide.link}>
                                                    <div
                                                        className={
                                                            classes.img_container
                                                        }
                                                    >
                                                        <Image
                                                            src={
                                                                slide.image_url
                                                            }
                                                            alt=""
                                                            className={
                                                                classes.image
                                                            }
                                                            width={
                                                                isMobile
                                                                    ? 140
                                                                    : 280
                                                            }
                                                            height={
                                                                isMobile
                                                                    ? 140
                                                                    : 360
                                                            }
                                                        />
                                                        <div
                                                            className={
                                                                classes.text
                                                            }
                                                            style={{
                                                                color: slide.text_color,
                                                                backgroundColor:
                                                                    slide.text_background_color
                                                            }}
                                                        >
                                                            <div
                                                                className={
                                                                    classes.headline
                                                                }
                                                            >
                                                                {slide.text}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Essentials;
