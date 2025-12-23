'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './megaMenu.module.css';

// Catégories à exclure du menu
const EXCLUDED_CATEGORIES = ['Nos activités pour vos enfants'];

const MegaMenu = () => {
    const [menuData, setMenuData] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const menuRef = useRef(null);

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

    // Fermer le dropdown quand on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!menuData) return null;

    // Filtrer les catégories exclues
    const categories = menuData.categories?.filter(
        (category) => !EXCLUDED_CATEGORIES.includes(category.name)
    );

    const handleMenuItemClick = (e, index, hasSubmenu) => {
        if (hasSubmenu) {
            e.preventDefault();
            setOpenDropdown(openDropdown === index ? null : index);
        }
    };

    return (
        <nav className={classes.root} ref={menuRef}>
            {categories?.map((category, index) => {
                const hasSubmenu =
                    category.products?.length > 0 ||
                    category.image_categories?.length > 0;

                return (
                    <div key={index} className={classes.menuItem}>
                        <Link
                            href={category.url || '#'}
                            className={`${classes.menuItemLink} ${openDropdown === index ? classes.menuItemLinkActive : ''}`}
                            style={{ color: category.text_color || '#336a79' }}
                            target={category.external ? '_blank' : undefined}
                            rel={
                                category.external
                                    ? 'noopener noreferrer'
                                    : undefined
                            }
                            onClick={(e) =>
                                handleMenuItemClick(e, index, hasSubmenu)
                            }
                        >
                            {category.name}
                            {category.badge && (
                                <span className={classes.badge}>
                                    {category.badge}
                                </span>
                            )}
                            {hasSubmenu && (
                                <svg
                                    className={`${classes.chevron} ${openDropdown === index ? classes.chevronOpen : ''}`}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            )}
                        </Link>

                        {openDropdown === index && hasSubmenu && (
                            <div className={classes.dropdown}>
                                <div className={classes.dropdownContent}>
                                    {/* Products list */}
                                    {category.products?.length > 0 && (
                                        <div className={classes.productsColumn}>
                                            {category.products.map(
                                                (product, prodIndex) => (
                                                    <Link
                                                        key={prodIndex}
                                                        href={
                                                            product.url || '#'
                                                        }
                                                        className={
                                                            classes.productLink
                                                        }
                                                        style={{
                                                            color:
                                                                product.text_color ||
                                                                '#336a79'
                                                        }}
                                                        target={
                                                            product.external
                                                                ? '_blank'
                                                                : undefined
                                                        }
                                                        rel={
                                                            product.external
                                                                ? 'noopener noreferrer'
                                                                : undefined
                                                        }
                                                        onClick={() =>
                                                            setOpenDropdown(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        {product.name}
                                                        {product.new && (
                                                            <span
                                                                className={
                                                                    classes.newBadge
                                                                }
                                                            >
                                                                NEW
                                                            </span>
                                                        )}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {/* Image categories */}
                                    {category.image_categories?.length > 0 && (
                                        <div className={classes.imagesColumn}>
                                            {category.image_categories.map(
                                                (imgCat, imgIndex) => (
                                                    <Link
                                                        key={imgIndex}
                                                        href={
                                                            imgCat.target_url ||
                                                            '#'
                                                        }
                                                        className={
                                                            classes.imageLink
                                                        }
                                                        onClick={() =>
                                                            setOpenDropdown(
                                                                null
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                classes.imageContainer
                                                            }
                                                        >
                                                            <Image
                                                                src={
                                                                    imgCat.url_image ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={
                                                                    imgCat.title_image ||
                                                                    ''
                                                                }
                                                                fill
                                                                style={{
                                                                    objectFit:
                                                                        'cover'
                                                                }}
                                                                sizes="200px"
                                                            />
                                                        </div>
                                                        <p
                                                            className={
                                                                classes.imageTitle
                                                            }
                                                        >
                                                            {imgCat.title_image}
                                                        </p>
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {/* Main category image */}
                                    {category.image_categorie_url && (
                                        <div
                                            className={classes.mainImageColumn}
                                        >
                                            <div
                                                className={
                                                    classes.mainImageContainer
                                                }
                                            >
                                                <Image
                                                    src={
                                                        category.image_categorie_url
                                                    }
                                                    alt={category.name}
                                                    fill
                                                    style={{
                                                        objectFit: 'cover'
                                                    }}
                                                    sizes="300px"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default MegaMenu;
