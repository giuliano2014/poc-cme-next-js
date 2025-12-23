'use client';

import classes from './accountTrigger.module.css';

const AccountTrigger = () => {
    const handleClick = () => {
        // TODO: Ouvrir le menu compte ou rediriger vers la page de connexion
        console.log('Account clicked');
    };

    return (
        <div className={`${classes.root} ${classes.sofiaPro}`}>
            <button
                aria-label="Mon compte"
                onClick={handleClick}
                data-cy="AccountTrigger-trigger"
                className={classes.button}
            >
                <svg
                    className={classes.icon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#336a79"
                    strokeWidth="1.5"
                >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </button>
        </div>
    );
};

export default AccountTrigger;
