'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import classes from './smartBar.module.css';

const SmartBar = () => {
    const [smartBarData, setSmartBarData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchSmartBar = async () => {
            try {
                const query = `
                    query getSmartBarNew {
                        getSmartBarNew {
                            message
                            url_link
                            external
                            date_to
                        }
                    }
                `;

                const response = await fetch('/api/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query })
                });

                const result = await response.json();
                if (result.data?.getSmartBarNew) {
                    setSmartBarData(result.data.getSmartBarNew);
                }
            } catch (error) {
                console.error('Error fetching SmartBar:', error);
            }
        };

        fetchSmartBar();
    }, []);

    // Auto-rotate items with vertical slide animation
    useEffect(() => {
        if (!smartBarData || smartBarData.length <= 1) return;

        const interval = setInterval(() => {
            setIsAnimating(true);

            // After animation starts, wait for it to complete then change index
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % smartBarData.length);
                setIsAnimating(false);
            }, 500); // Match the CSS transition duration
        }, 5000);

        return () => clearInterval(interval);
    }, [smartBarData]);

    if (!smartBarData || smartBarData.length === 0) {
        return <div className={classes.root} style={{ height: '36px' }} />;
    }

    const currentItem = smartBarData[currentIndex];
    const nextIndex = (currentIndex + 1) % smartBarData.length;
    const nextItem = smartBarData[nextIndex];

    const renderSlide = (item) => {
        const slideContent = (
            <div
                className={classes.slideContent}
                dangerouslySetInnerHTML={{ __html: item.message }}
            />
        );

        if (item.url_link) {
            return (
                <Link
                    href={item.url_link}
                    className={classes.link}
                    target={item.external ? '_blank' : '_self'}
                >
                    {slideContent}
                </Link>
            );
        }

        return slideContent;
    };

    return (
        <div
            className={`${classes.root} ${classes.sofiaPro}`}
            data-cy="smart-bar"
        >
            <div className={classes.sliderWrapper}>
                <div
                    ref={sliderRef}
                    className={`${classes.slider} ${isAnimating ? classes.sliderAnimating : ''}`}
                >
                    <div className={classes.slide}>
                        {renderSlide(currentItem)}
                    </div>
                    {smartBarData.length > 1 && (
                        <div className={classes.slide}>
                            {renderSlide(nextItem)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartBar;
