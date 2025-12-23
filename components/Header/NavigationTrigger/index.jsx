'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './navigationTrigger.module.css';

// Catégories à exclure du menu
const EXCLUDED_CATEGORIES = ['Nos activités pour vos enfants'];

const NavigationTrigger = ({ isOpen, onToggle }) => {
    const [menuData, setMenuData] = useState(null);
    const [activeCategory, setActiveCategory] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch('/api/menu');
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setActiveCategory(''); // Reset on close
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const toggleCategory = (e, categoryName) => {
        e.stopPropagation();
        e.preventDefault();
        setActiveCategory((prev) =>
            prev === categoryName ? '' : categoryName
        );
    };

    const handleLinkClick = () => {
        onToggle();
        setActiveCategory('');
    };

    // Filter categories
    const categories = menuData?.categories?.filter(
        (category) => !EXCLUDED_CATEGORIES.includes(category.name)
    );

    const bannerMenu = menuData?.banner_menu;
    const flags = menuData?.flags;

    return (
        <>
            {/* Trigger button */}
            <div className={classes.triggerRoot}>
                <button
                    aria-label="Menu"
                    onClick={onToggle}
                    className={classes.triggerButton}
                    data-cy="NavigationTrigger-trigger"
                >
                    <svg
                        className={classes.triggerIcon}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#336a79"
                        strokeWidth="2"
                    >
                        {isOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            <aside
                className={`${classes.root} ${isOpen ? classes.rootOpen : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Mega Banner */}
                {bannerMenu?.title && (
                    <Link
                        href={bannerMenu.path || '/'}
                        className={classes.megaBanner}
                        onClick={handleLinkClick}
                    >
                        <span
                            className={classes.titleBanner}
                            dangerouslySetInnerHTML={{
                                __html: bannerMenu.title
                            }}
                        />
                        <span className={classes.barBanner} />
                        <span
                            className={classes.subtitleBanner}
                            dangerouslySetInnerHTML={{
                                __html: bannerMenu.subtitle || ''
                            }}
                        />
                    </Link>
                )}

                <div className={classes.body}>
                    <nav className={classes.nav}>
                        {/* Categories */}
                        <ul className={classes.navList}>
                            {categories?.map((category) => {
                                const hasProducts =
                                    category.products &&
                                    category.products.length > 0;
                                const isActive =
                                    activeCategory === category.name;

                                return (
                                    <li
                                        key={category.name}
                                        className={classes.listItem}
                                    >
                                        <div
                                            onClick={(e) =>
                                                hasProducts &&
                                                toggleCategory(e, category.name)
                                            }
                                        >
                                            {hasProducts ? (
                                                <>
                                                    <span
                                                        className={
                                                            classes.navName
                                                        }
                                                        style={{
                                                            color:
                                                                category.text_color ||
                                                                'inherit'
                                                        }}
                                                    >
                                                        {category.name}
                                                    </span>
                                                    {category.badge && (
                                                        <div
                                                            className={
                                                                classes.badgeWrapper
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    classes.badge
                                                                }
                                                            >
                                                                {category.badge}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div
                                                        className={
                                                            isActive
                                                                ? classes.containerOpen
                                                                : classes.containerClosed
                                                        }
                                                    >
                                                        {category.products.map(
                                                            (product) => (
                                                                <Link
                                                                    key={
                                                                        product.name
                                                                    }
                                                                    href={
                                                                        product.external
                                                                            ? product.url
                                                                            : `/${product.url}`
                                                                    }
                                                                    className={
                                                                        classes.subAnchor
                                                                    }
                                                                    style={{
                                                                        color:
                                                                            product.text_color ||
                                                                            'inherit'
                                                                    }}
                                                                    target={
                                                                        product.external
                                                                            ? '_blank'
                                                                            : '_self'
                                                                    }
                                                                    onClick={
                                                                        handleLinkClick
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                    {product.badge && (
                                                                        <span
                                                                            className={
                                                                                classes.badgeSmall
                                                                            }
                                                                        >
                                                                            {
                                                                                product.badge
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </Link>
                                                            )
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <Link
                                                    className={classes.navName}
                                                    href={category.url || '/'}
                                                    target={
                                                        category.external
                                                            ? '_blank'
                                                            : '_self'
                                                    }
                                                    onClick={handleLinkClick}
                                                    style={{
                                                        color:
                                                            category.text_color ||
                                                            'inherit'
                                                    }}
                                                >
                                                    {category.name}
                                                </Link>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Flags section */}
                        {flags && flags.length > 0 && (
                            <div className={classes.flags}>
                                {flags.map((flag, index) => (
                                    <Link
                                        key={flag.url || index}
                                        href={flag.url || '/'}
                                        className={classes.flag}
                                        onClick={handleLinkClick}
                                    >
                                        {flag.image_url && (
                                            <Image
                                                src={flag.image_url.trim()}
                                                alt={flag.title || ''}
                                                width={62}
                                                height={62}
                                                className={classes.flagImage}
                                                unoptimized
                                            />
                                        )}
                                        <p className={classes.flagTitle}>
                                            {flag.title}
                                        </p>
                                        <p className={classes.flagSubtitle}>
                                            {flag.subtitle}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Shipping item */}
                        <div className={classes.navItem}>
                            <Image
                                src="/icons/ShippingIcon.svg"
                                alt="shipping box icon"
                                width={24}
                                height={24}
                                className={classes.navItemIcon}
                            />
                            <span>LIVRAISON</span>
                        </div>

                        {/* FAQ item */}
                        <Link
                            href="/des-questions-des-reponses"
                            className={classes.navItem}
                            onClick={handleLinkClick}
                        >
                            <Image
                                src="/icons/customServiceIconBlack.svg"
                                alt="faq icon"
                                width={24}
                                height={24}
                                className={classes.navItemIcon}
                            />
                            <span>FAQ</span>
                        </Link>

                        {/* Account item */}
                        <div className={classes.navItem}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#404143"
                                strokeWidth="1.5"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span>MON COMPTE</span>
                        </div>
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default NavigationTrigger;
