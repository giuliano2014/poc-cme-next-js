'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import classes from './styles.module.css';

const Support = ({ support }) => {
    const ref = useRef(null);

    // Guard clause
    if (!support) return null;

    useEffect(() => {
        if (support?.title?.text && ref.current) {
            ref.current.innerHTML = support?.title?.text;
        }
    }, [support?.title?.text]);

    return (
        <div
            className={classes.root}
            style={{ backgroundColor: support.background_color }}
        >
            <div
                ref={ref}
                style={{
                    color: support.title.text_color
                }}
                className={classes.title}
            >
                {support?.title?.text}
            </div>
            <div className={classes.buttonsContainer}>
                {support.buttons.map((button, index) => {
                    return (
                        <Link
                            key={index}
                            href={button.link}
                            style={{
                                color: button.text_color,
                                border: '1px solid ' + button.text_color
                            }}
                            className={classes.button}
                        >
                            {button.text}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Support;
