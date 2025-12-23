'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classes from './styles.module.css';

// Custom hook for window size
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

const Reassurance = ({ reassurance }) => {
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 768;

    // Guard clause
    if (!reassurance) return null;

    return (
        <div
            className={classes.root}
            style={{ backgroundColor: reassurance.background_color }}
        >
            {reassurance.blocks.map((block, index) => {
                return (
                    <div key={index} className={classes.iconContainer}>
                        <div className={classes.imgContainer}>
                            <Image
                                src={block.image_url}
                                alt={block.main_text || 'icon'}
                                width={isMobile ? 26 : 30}
                                height={isMobile ? 30 : 36}
                            />
                        </div>

                        <div
                            style={{
                                color: block.text_color
                            }}
                        >
                            <div className={classes.mainText}>
                                {block.main_text}
                            </div>
                            <div className={classes.secondaryText}>
                                {block.secondary_text}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Reassurance;
