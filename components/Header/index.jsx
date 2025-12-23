'use client';

import React, {
    Suspense,
    useCallback,
    useRef,
    useState,
    useEffect
} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import classes from './header.module.css';

// Lazy loaded components
const SmartBar = React.lazy(() => import('./SmartBar'));
const MegaMenu = React.lazy(() => import('./MegaMenu'));
const CartTrigger = React.lazy(() => import('./CartTrigger'));
const AccountTrigger = React.lazy(() => import('./AccountTrigger'));
const NavigationTrigger = React.lazy(() => import('./NavigationTrigger'));

// Logo URL
const LOGO_URL = '/logo-pwa.svg';

const Header = () => {
    const pathname = usePathname();
    const newHeader = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [drawer, setDrawer] = useState(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1200);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const closeDrawer = useCallback(() => {
        setDrawer(null);
    }, []);

    const handleClickNewHeader = useCallback(() => {
        if (drawer === 'nav' && isMobile) {
            closeDrawer();
        }
    }, [drawer, isMobile, closeDrawer]);

    // Hide header on checkout pages
    if (
        pathname?.includes('/onestepcheckout') ||
        pathname?.includes('adyen_success')
    ) {
        return (
            <header className={classes.checkoutV3Root} data-cy="Header-root">
                <section className={classes.navSectionContainer}>
                    <div className={classes.checkoutV3NavContainer}>
                        <Link
                            href="/"
                            className={classes.v3backButton}
                            data-cy="Header-logoContainer"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                            <div className={classes.homeLinkContainer}>
                                <Image
                                    src={LOGO_URL}
                                    alt="C-MonEtiquette logo"
                                    width={150}
                                    height={50}
                                    className={classes.logoImg}
                                    priority
                                    unoptimized
                                />
                            </div>
                        </Link>
                    </div>
                </section>
            </header>
        );
    }

    // Hide header on iframe pages
    const isIframe = pathname?.includes('/iframe');

    return (
        <>
            <header
                className={`${classes.newRoot} ${classes.sofiaPro}`}
                data-cy="Header-root"
                ref={newHeader}
                style={{
                    display: isIframe ? 'none' : 'block'
                }}
            >
                <Suspense
                    fallback={
                        <div
                            style={{
                                height: '36px',
                                backgroundColor: '#404143'
                            }}
                        />
                    }
                >
                    <SmartBar />
                </Suspense>

                <div className={classes.newActionsContainer}>
                    <div
                        className={classes.actions}
                        onClick={handleClickNewHeader}
                    >
                        <div
                            className={classes.homeLinkContainer}
                            data-cy="Header-logoContainer"
                        >
                            <Link href="/" aria-label="C-MonEtiquette">
                                <Image
                                    src={LOGO_URL}
                                    alt="C-MonEtiquette logo"
                                    width={150}
                                    height={50}
                                    className={classes.logoImg}
                                    priority
                                    unoptimized
                                />
                            </Link>
                        </div>

                        <Suspense fallback={null}>
                            <AccountTrigger />
                        </Suspense>

                        <Suspense fallback={null}>
                            <CartTrigger />
                        </Suspense>

                        <Suspense fallback={null}>
                            <NavigationTrigger
                                isOpen={drawer === 'nav'}
                                onToggle={() =>
                                    setDrawer(drawer === 'nav' ? null : 'nav')
                                }
                            />
                        </Suspense>
                    </div>

                    <div className={classes.newToolbar}>
                        <section className={classes.navSectionContainer}>
                            {!isMobile && (
                                <Suspense fallback={null}>
                                    <MegaMenu />
                                </Suspense>
                            )}
                        </section>
                    </div>
                </div>
            </header>
            {!isIframe && <div className={classes.extraSpaceDiv} />}
        </>
    );
};

export default Header;
