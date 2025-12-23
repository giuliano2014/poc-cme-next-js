'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './styles.module.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// Utility function for contrast border
const constrastBorderClass = (color, className) => {
    const hasFullSpec = color.length == 7;
    var m = color.substr(1).match(hasFullSpec ? /(\S{2})/g : /(\S{1})/g);
    if (m)
        var r = parseInt(m[0] + (hasFullSpec ? '' : m[0]), 16),
            g = parseInt(m[1] + (hasFullSpec ? '' : m[1]), 16),
            b = parseInt(m[2] + (hasFullSpec ? '' : m[2]), 16);
    if (typeof r != 'undefined')
        var light = (r * 299 + g * 587 + b * 114) / 1000;
    return light > 230 ? className : '';
};

// Custom hooks
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

// Arrow components
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

const ProductSlider = ({ productSlider }) => {
    const [visibleItems, setVisibleItems] = useState(new Set());
    const imageRefs = useRef(new Map());
    const ref = useRef(null);
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 520;
    const { isIOS } = useIOS();

    // Guard clause
    if (!productSlider) return null;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.dataset.productId;
                    if (entry.isIntersecting) {
                        setVisibleItems((prev) => new Set([...prev, id]));
                    }
                });
            },
            {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            }
        );

        imageRefs.current.forEach((ref) => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (productSlider.slider_pagination_main_color) {
            document.documentElement.style.setProperty(
                '--product-thumb-color',
                productSlider.slider_pagination_main_color
            );
        }
        if (productSlider.slider_pagination_secondary_color) {
            document.documentElement.style.setProperty(
                '--product-track-color',
                productSlider.slider_pagination_secondary_color
            );
        }
    }, [productSlider]);

    return (
        <div
            className={`${classes.root} ${isIOS && classes.ios}`}
            style={{ backgroundColor: productSlider.background_color }}
        >
            <PrevArrow
                onClick={() =>
                    ref.current.scrollBy({
                        top: 0,
                        left: -272,
                        behaviour: 'smooth'
                    })
                }
                className={classes.prevArrow}
            />

            <NextArrow
                onClick={() =>
                    ref.current.scrollBy({
                        top: 0,
                        left: 272,
                        behaviour: 'smooth'
                    })
                }
                className={classes.nextArrow}
            />
            <div className={classes.horizontalSlider}>
                <div className={classes.sliderContainer} ref={ref}>
                    <div className={classes.slidesContainer}>
                        {productSlider?.products.map((product, index) => {
                            return (
                                <div className={classes.slide} key={index}>
                                    <Link href={product.link}>
                                        <div
                                            className={
                                                classes.interactive_layer
                                            }
                                        >
                                            <div
                                                className={
                                                    classes.img_container
                                                }
                                                ref={(el) => {
                                                    imageRefs.current.set(
                                                        index.toString(),
                                                        el
                                                    );
                                                }}
                                                data-product-id={index}
                                            >
                                                {visibleItems.has(
                                                    index.toString()
                                                ) ? (
                                                    <Image
                                                        src={product.image_url}
                                                        alt=""
                                                        loading="lazy"
                                                        width={
                                                            isMobile ? 140 : 236
                                                        }
                                                        height={
                                                            isMobile ? 140 : 220
                                                        }
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: isMobile
                                                                ? 140
                                                                : 236,
                                                            height: isMobile
                                                                ? 140
                                                                : 220,
                                                            backgroundColor:
                                                                '#f0f0f0'
                                                        }}
                                                    />
                                                )}

                                                {product?.product_tag ? (
                                                    <div
                                                        className={
                                                            classes.productTag
                                                        }
                                                        style={{
                                                            backgroundColor:
                                                                product
                                                                    .product_tag
                                                                    .background_color
                                                        }}
                                                    >
                                                        {
                                                            product.product_tag
                                                                .text
                                                        }
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                        <div className={classes.textContainer}>
                                            <div
                                                className={classes.text}
                                                style={{
                                                    color: product.text_color
                                                }}
                                            >
                                                <div
                                                    className={classes.headline}
                                                >
                                                    {product.main_text}
                                                </div>
                                                {product.secondary_text && (
                                                    <div
                                                        className={
                                                            classes.secondaryText
                                                        }
                                                    >
                                                        {product.secondary_text}
                                                    </div>
                                                )}
                                            </div>
                                            {product.color_samples && (
                                                <div
                                                    className={
                                                        classes.productColorList
                                                    }
                                                >
                                                    {product.color_samples.map(
                                                        (item, colorIndex) => (
                                                            <div
                                                                key={colorIndex}
                                                                className={[
                                                                    classes.productColor,
                                                                    item ===
                                                                    '#ARCENCIEL'
                                                                        ? 'gradientColor'
                                                                        : '',
                                                                    constrastBorderClass(
                                                                        item,
                                                                        classes.productColorContrast
                                                                    )
                                                                ].join(' ')}
                                                                style={{
                                                                    backgroundColor:
                                                                        item
                                                                }}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
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

export default ProductSlider;
