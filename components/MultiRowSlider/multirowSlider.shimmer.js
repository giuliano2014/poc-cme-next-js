import React from 'react';
import classes from './styles.module.css';

const MultiRowSliderShimmer = () => {
    return (
        <div className={classes.root_shimmer}>
            <div
                className="animate-pulse bg-gray-200 w-full h-full rounded"
                style={{ minHeight: '505px' }}
            />
        </div>
    );
};

export default MultiRowSliderShimmer;
