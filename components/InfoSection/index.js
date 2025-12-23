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

const InfoSection = ({ information }) => {
    // Guard clause
    if (!information) return null;

    const { background_color, title, description } = information;
    const windowSize = useWindowSize();
    const isMobile = windowSize.innerWidth <= 768;
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={classes.infoSectionWrapper}
            style={{
                backgroundColor: background_color
            }}
        >
            <div className={classes.titleSection}>
                <div className={classes.titleLine} />
                <div className={classes.titleContainer}>
                    <Image
                        className={classes.icon}
                        alt="picto icon"
                        src="/icons/InformationSectionPicto.svg"
                        width={63}
                        height={61}
                    />
                    <p
                        style={{
                            color: title?.text_color
                        }}
                        className={classes.title}
                        dangerouslySetInnerHTML={{ __html: title?.text }}
                    />
                </div>
            </div>
            {isMobile ? (
                <div className={classes.description}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: isExpanded
                                ? description?.text
                                : description?.text.substring(0, 200) + '... '
                        }}
                    />
                    {!isExpanded && (
                        <button
                            onClick={() => setIsExpanded(true)}
                            className={classes.link}
                        >
                            voir plus
                        </button>
                    )}
                </div>
            ) : (
                <div
                    className={classes.description}
                    dangerouslySetInnerHTML={{ __html: description?.text }}
                />
            )}
        </div>
    );
};

export default InfoSection;
