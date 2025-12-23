'use client';

import React from 'react';
import Image from 'next/image';
import classes from './styles.module.css';

const Shipping = ({ deliveryInfo }) => {
    // Guard clause
    if (!deliveryInfo) return null;

    const splitedText = deliveryInfo?.secondary_text?.split(' ');
    const firstPartOfText = splitedText?.slice(0, splitedText.length - 2);
    const secondPartOfText = splitedText?.slice(-2);

    const handleButtonClick = () => {
        // Placeholder for shipping modal or link functionality
        console.log('Shipping button clicked');
        // You can add navigation or modal logic here
    };

    return (
        <div
            className={classes.root}
            style={{ backgroundColor: deliveryInfo.background_color }}
        >
            <div
                className={classes.mainText}
                style={{
                    color: deliveryInfo.text_color
                }}
            >
                <Image
                    src="/icons/HomePageShippingIcon.svg"
                    alt="shipping icon"
                    className={classes.shippingIcon}
                    width={48}
                    height={42}
                />
                {deliveryInfo.main_text}
            </div>

            <div
                className={classes.separator}
                style={{ backgroundColor: deliveryInfo.separator_color }}
            ></div>
            <div
                className={classes.secondaryText}
                style={{
                    color: deliveryInfo.text_color
                }}
            >
                {firstPartOfText?.join(' ')}
                {` `}
                <span>{secondPartOfText?.join(' ')}</span>
            </div>
            <button
                style={{
                    color: deliveryInfo.button.textColor,
                    backgroundColor: deliveryInfo.button.background_color
                }}
                className={classes.button}
                type="button"
                onClick={handleButtonClick}
            >
                {deliveryInfo.button.text}
            </button>
        </div>
    );
};

export default Shipping;
