'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const [menuData, setMenuData] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileCategory, setOpenMobileCategory] = useState(null);

    useEffect(() => {
        async function fetchMenu() {
            try {
                setIsLoading(true);
                const response = await fetch('/api/menu');
                const data = await response.json();
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMenu();
    }, []);

    if (isLoading || !menuData) {
        return (
            <header className="w-full bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="h-12 bg-gray-100 animate-pulse rounded"></div>
                </div>
            </header>
        );
    }

    const { categories, banner_menu } = menuData;

    return (
        <header className="w-full bg-white sticky top-0 z-50">
            {banner_menu && (
                <div className="w-full py-2 text-center bg-black">
                    <Link
                        href={banner_menu.path || '#'}
                        className="text-sm text-white"
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: banner_menu.title
                            }}
                        />
                        {banner_menu.subtitle && (
                            <span
                                className="ml-2"
                                dangerouslySetInnerHTML={{
                                    __html: banner_menu.subtitle
                                }}
                            />
                        )}
                    </Link>
                </div>
            )}

            <div className="border-b border-gray-200 w-full max-w-full">
                <div className="container mx-auto px-4">
                    <nav className="hidden md:flex items-center gap-6 py-4">
                        {categories &&
                            categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="relative"
                                    onMouseEnter={() => {
                                        if (
                                            category.products &&
                                            category.products.length > 0
                                        ) {
                                            setOpenDropdown(index);
                                        }
                                    }}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={category.url || '#'}
                                        className="flex items-center gap-1 text-sm font-medium hover:text-[#336a79] transition-colors"
                                        style={{
                                            color: category.text_color || '#000'
                                        }}
                                        target={
                                            category.external
                                                ? '_blank'
                                                : '_self'
                                        }
                                        rel={
                                            category.external
                                                ? 'noopener noreferrer'
                                                : undefined
                                        }
                                    >
                                        {category.name}
                                        {category.badge && (
                                            <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded">
                                                {category.badge}
                                            </span>
                                        )}
                                        {category.products &&
                                            category.products.length > 0 && (
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            )}
                                    </Link>

                                    {openDropdown === index &&
                                        category.products &&
                                        category.products.length > 0 && (
                                            <div
                                                className="absolute left-0 right-0 bg-white border-t border-b border-gray-200 shadow-lg p-6 z-[100] w-screen"
                                                style={{
                                                    position: 'fixed',
                                                    top: banner_menu
                                                        ? '99px'
                                                        : '75px',
                                                    left: 0,
                                                    right: 0
                                                }}
                                            >
                                                <div className="container mx-auto px-4">
                                                    <div className="grid grid-cols-12 gap-6">
                                                        <div className="col-span-3 space-y-2">
                                                            <h3 className="font-bold text-lg mb-4">
                                                                Produits
                                                            </h3>
                                                            {category.products.map(
                                                                (
                                                                    product,
                                                                    prodIndex
                                                                ) => (
                                                                    <Link
                                                                        key={
                                                                            prodIndex
                                                                        }
                                                                        href={
                                                                            product.url ||
                                                                            '#'
                                                                        }
                                                                        className="block text-sm hover:text-[#336a79] transition-colors"
                                                                        style={{
                                                                            color:
                                                                                product.text_color ||
                                                                                '#000'
                                                                        }}
                                                                        target={
                                                                            product.external
                                                                                ? '_blank'
                                                                                : '_self'
                                                                        }
                                                                        rel={
                                                                            product.external
                                                                                ? 'noopener noreferrer'
                                                                                : undefined
                                                                        }
                                                                    >
                                                                        {
                                                                            product.name
                                                                        }
                                                                        {product.new && (
                                                                            <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded">
                                                                                NEW
                                                                            </span>
                                                                        )}
                                                                        {product.badge && (
                                                                            <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded">
                                                                                {
                                                                                    product.badge
                                                                                }
                                                                            </span>
                                                                        )}
                                                                    </Link>
                                                                )
                                                            )}
                                                        </div>

                                                        {category.image_categories &&
                                                            category
                                                                .image_categories
                                                                .length > 0 && (
                                                                <div className="col-span-6 grid grid-cols-2 gap-4">
                                                                    {category.image_categories.map(
                                                                        (
                                                                            imgCat,
                                                                            imgIndex
                                                                        ) => (
                                                                            <Link
                                                                                key={
                                                                                    imgIndex
                                                                                }
                                                                                href={
                                                                                    imgCat.target_url ||
                                                                                    '#'
                                                                                }
                                                                                className="block hover:opacity-80 transition-opacity"
                                                                            >
                                                                                <div className="relative w-full h-32">
                                                                                    <Image
                                                                                        src={
                                                                                            imgCat.url_image ||
                                                                                            '/placeholder.svg'
                                                                                        }
                                                                                        alt={
                                                                                            imgCat.title_image
                                                                                        }
                                                                                        fill
                                                                                        className="object-cover rounded"
                                                                                        sizes="(max-width: 768px) 50vw, 25vw"
                                                                                    />
                                                                                </div>
                                                                                <p className="text-sm text-center mt-2 font-medium">
                                                                                    {
                                                                                        imgCat.title_image
                                                                                    }
                                                                                </p>
                                                                            </Link>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}

                                                        {category.image_categorie_url && (
                                                            <div className="col-span-3">
                                                                <div className="relative w-full h-48">
                                                                    <Image
                                                                        src={
                                                                            category.image_categorie_url ||
                                                                            '/placeholder.svg'
                                                                        }
                                                                        alt={
                                                                            category.name
                                                                        }
                                                                        fill
                                                                        className="object-cover rounded"
                                                                        sizes="(max-width: 768px) 100vw, 25vw"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            ))}
                    </nav>

                    <div className="md:hidden py-4">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="flex items-center gap-2 text-gray-700"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12M6 12h12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                            <span className="text-sm font-medium">Menu</span>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 max-h-screen overflow-y-auto">
                    <div className="container mx-auto px-4 py-4">
                        {categories &&
                            categories.map((category, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-100 py-2"
                                >
                                    {category.products &&
                                    category.products.length > 0 ? (
                                        <button
                                            onClick={() =>
                                                setOpenMobileCategory(
                                                    openMobileCategory === index
                                                        ? null
                                                        : index
                                                )
                                            }
                                            className="flex items-center justify-between w-full text-left text-sm font-medium py-2"
                                            style={{
                                                color:
                                                    category.text_color ||
                                                    '#000'
                                            }}
                                        >
                                            <span>
                                                {category.name}
                                                {category.badge && (
                                                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded">
                                                        {category.badge}
                                                    </span>
                                                )}
                                            </span>
                                            <svg
                                                className={`w-5 h-5 transition-transform ${openMobileCategory === index ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    ) : (
                                        <Link
                                            href={category.url || '#'}
                                            className="block text-sm font-medium py-2"
                                            style={{
                                                color:
                                                    category.text_color ||
                                                    '#000'
                                            }}
                                            target={
                                                category.external
                                                    ? '_blank'
                                                    : '_self'
                                            }
                                            rel={
                                                category.external
                                                    ? 'noopener noreferrer'
                                                    : undefined
                                            }
                                        >
                                            {category.name}
                                            {category.badge && (
                                                <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded">
                                                    {category.badge}
                                                </span>
                                            )}
                                        </Link>
                                    )}

                                    {openMobileCategory === index &&
                                        category.products &&
                                        category.products.length > 0 && (
                                            <div className="pl-4 mt-2 space-y-2">
                                                {category.products.map(
                                                    (product, prodIndex) => (
                                                        <Link
                                                            key={prodIndex}
                                                            href={
                                                                product.url ||
                                                                '#'
                                                            }
                                                            className="block text-sm py-1 hover:text-[#336a79]"
                                                            style={{
                                                                color:
                                                                    product.text_color ||
                                                                    '#000'
                                                            }}
                                                            target={
                                                                product.external
                                                                    ? '_blank'
                                                                    : '_self'
                                                            }
                                                            rel={
                                                                product.external
                                                                    ? 'noopener noreferrer'
                                                                    : undefined
                                                            }
                                                        >
                                                            {product.name}
                                                            {product.new && (
                                                                <span className="ml-2 px-2 py-0.5 text-xs bg-green-500 text-white rounded">
                                                                    NEW
                                                                </span>
                                                            )}
                                                            {product.badge && (
                                                                <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded">
                                                                    {
                                                                        product.badge
                                                                    }
                                                                </span>
                                                            )}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </header>
    );
}
