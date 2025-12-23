'use client';

import classes from './cartTrigger.module.css';

const CartTrigger = ({ itemsCount = 0 }) => {
    const handleClick = () => {
        // TODO: Ouvrir le mini-cart ou rediriger vers le panier
        console.log('Cart clicked');
    };

    const maybeItemCounter =
        itemsCount > 0 ? (
            <span className={classes.counter} data-cy="CartTrigger-counter">
                {itemsCount}
            </span>
        ) : null;

    return (
        <div className={`${classes.root} ${classes.sofiaPro}`}>
            <div className={classes.triggerContainer}>
                <button
                    aria-label={`Panier (${itemsCount} articles)`}
                    className={classes.trigger}
                    onClick={handleClick}
                    data-cy="CartTrigger-trigger"
                >
                    <svg
                        className={classes.triggerIcon}
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        stroke="#336a79"
                        strokeWidth="1.5"
                    >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    {maybeItemCounter}
                </button>
            </div>
        </div>
    );
};

export default CartTrigger;
