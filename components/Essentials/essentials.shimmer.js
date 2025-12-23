import React from 'react';
import classes from './styles.module.css';

const EssentialsShimmer = () => {
    return (
        <div className={classes.root_shimmer}>
            <div
                className="animate-pulse bg-gray-200 w-full h-full rounded"
                style={{ minHeight: '513px' }}
            />
        </div>
    );
};

export default EssentialsShimmer;
