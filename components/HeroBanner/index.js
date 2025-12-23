'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import classes from './styles.module.css';

const HeroBanner = ({ header, meta = {} }) => {
    const ref = useRef(null);

    // Guard clause: return null if no header data
    if (!header) return null;

    useEffect(() => {
        if (header.text && ref.current) {
            ref.current.innerHTML = header.text;
        }
    }, [header.text]);

    const H1Title = meta.h1 || '';
    const H2Title = meta.h2 || '';

    return (
        <>
            <a className={classes.root} href={header.link}>
                {/* Desktop image */}
                <div
                    className="hidden md:block relative w-full"
                    style={{ minHeight: '450px', maxHeight: '450px' }}
                >
                    <Image
                        src={header.image_url}
                        alt=""
                        fill
                        className={classes.image}
                        sizes="(max-width: 768px) 100vw, 1440px"
                        priority
                    />
                </div>

                {/* Mobile image */}
                <div
                    className="block md:hidden relative w-full"
                    style={{ minHeight: '300px', maxHeight: '300px' }}
                >
                    <Image
                        src={header.image_mobile_url || header.image_url}
                        alt=""
                        fill
                        className={classes.image}
                        sizes="100vw"
                        priority
                    />
                </div>

                <div
                    className={classes.textBlock}
                    style={{
                        color: header.text_color,
                        backgroundColor: header.text_background_color
                    }}
                    ref={ref}
                >
                    {header.text}
                </div>
            </a>
            <div className={classes.titleWrapper}>
                {H1Title && (
                    <div
                        className={classes.h1Title}
                        dangerouslySetInnerHTML={{ __html: H1Title }}
                    />
                )}
                {H2Title && (
                    <div
                        className={classes.h2Title}
                        dangerouslySetInnerHTML={{ __html: H2Title }}
                    />
                )}
            </div>
        </>
    );
};

export default HeroBanner;
