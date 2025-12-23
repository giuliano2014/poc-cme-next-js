'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';
import Newsletter from './Newsletter';

const Footer = () => {
    const pathname = usePathname();
    const [footerData, setFooterData] = useState(null);
    const [openAccordions, setOpenAccordions] = useState({});

    // Texte de la région (hardcodé pour l'instant, à remplacer par i18n si nécessaire)
    const regionText = (
        <>
            L'Union Européenne et la Région Nouvelle Aquitaine apportent leur
            soutien à C-MonEtiquette pour les projets suivants :
            <li>
                L'innovation en vue d'accroitre sa compétitivité et sa
                croissance
            </li>
            <li>Les investissements productifs et produits innovants</li>
        </>
    );

    const regionLogo =
        'https://www.c-monetiquette.fr/media/wysiwyg/header/logo_footer_fr.svg';

    useEffect(() => {
        const fetchFooterData = async () => {
            const footerQuery = `
                query getFooterLinks {
                    footer {
                        store_id
                        categories {
                            id
                            name
                            url
                            status
                            products {
                                name
                                url
                                new
                                position
                                external
                            }
                        }
                    }
                }
            `;

            try {
                const response = await fetch('/api/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: footerQuery })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.data?.footer) {
                    setFooterData(result.data.footer);
                }
            } catch (error) {
                console.error('❌ Error fetching footer:', error);
            }
        };

        fetchFooterData();
    }, []);

    const toggleAccordion = (categoryId) => {
        setOpenAccordions((prev) => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    // Masquer le footer sur certaines pages
    if (
        pathname?.includes('/onestepcheckout') ||
        pathname?.includes('adyen_success') ||
        pathname?.includes('/iframe')
    ) {
        return null;
    }

    if (!footerData) {
        return null;
    }

    const links = JSON.parse(JSON.stringify(footerData?.categories || []));

    // Ajouter le bouton Didomi si disponible
    const ourServicesGroupId = 'customerService';
    const ourServicesGroupIndex = links?.findIndex(
        (linkGroup) => linkGroup.id === ourServicesGroupId
    );

    if (ourServicesGroupIndex > -1 && typeof window !== 'undefined') {
        links[ourServicesGroupIndex].products.push({
            name: 'Didomi consentement',
            onClick: () => window?.didomi?.preferences?.show()
        });
    }

    const renderLinkElements = (products, categoryId) => {
        return products.map(({ url, name, onClick, external }, index) => {
            let child = name;

            if (url) {
                child = external ? (
                    <a
                        key={`${categoryId}-${name}-${index}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {name}
                    </a>
                ) : (
                    <Link key={`${categoryId}-${name}-${index}`} href={url}>
                        {name}
                    </Link>
                );
            } else if (onClick) {
                child = (
                    <button
                        key={`${categoryId}-${name}-${index}`}
                        className={styles.linksButton}
                        onClick={onClick}
                        type="button"
                    >
                        {name}
                    </button>
                );
            }

            return (
                <li
                    key={`${categoryId}-${name}-${index}`}
                    className={styles.linkItem}
                >
                    {child}
                </li>
            );
        });
    };

    const linkGroups = links.map(({ products, name, id }) => {
        const linkElements = renderLinkElements(products, id);
        const isOpen = openAccordions[id];

        return (
            <ul key={id} className={styles.linkGroup}>
                {/* Version mobile avec accordion */}
                <div className={styles.mobileOnly}>
                    <button
                        className={styles.accordionTitle}
                        onClick={() => toggleAccordion(id)}
                        type="button"
                        aria-expanded={isOpen}
                    >
                        {name}
                        <svg
                            className={styles.accordionIcon}
                            style={{
                                transform: isOpen
                                    ? 'rotate(45deg)'
                                    : 'rotate(0deg)'
                            }}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <div
                        className={`${styles.accordionContent} ${isOpen ? styles.open : ''}`}
                    >
                        {linkElements}
                    </div>
                </div>

                {/* Version desktop */}
                <div className={styles.desktopOnly}>
                    <p className={styles.categoryName}>
                        {name}
                        <div className={styles.categorySeparator}></div>
                    </p>
                    <span>{linkElements}</span>
                </div>
            </ul>
        );
    });

    return (
        <footer data-cy="Footer-root" className={styles.root}>
            <div className={styles.footerContainer}>
                <div className={styles.wrapper}>
                    <div className={styles.links}>
                        <div className={styles.logosContainer}>
                            <div className={styles.cMonLogo}>
                                <Image
                                    className={styles.cMonLogoImg}
                                    src={regionLogo}
                                    width={150}
                                    height={93}
                                    alt="c-monEtiquette logo"
                                    loading="lazy"
                                    unoptimized
                                />
                            </div>
                            <div className={styles.separator}></div>
                            <div className={styles.euroLogos}>
                                <p className={styles.regionText}>
                                    {regionText}
                                </p>
                                <div className={styles.logoContainer}>
                                    <Image
                                        src="https://www.c-monetiquette.fr/media/wysiwyg/header/europe.svg"
                                        alt="europe flag"
                                        height={40}
                                        width={61}
                                        loading="lazy"
                                        className={styles.europeFlag}
                                        unoptimized
                                    />
                                    <Image
                                        src="https://www.c-monetiquette.fr/media/wysiwyg/header/region.svg"
                                        alt="region flag"
                                        height={40}
                                        width={89}
                                        loading="lazy"
                                        className={styles.regionFlag}
                                        unoptimized
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.linkGroupContainer}>
                            {linkGroups}
                        </div>
                        <div className={styles.newsletter}>
                            <Newsletter />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.infoContainer}>
                © {new Date().getFullYear()} C-MonEtiquette | Petit-Fernand |
                EsIstMeins. Tous droits réservés
            </div>
        </footer>
    );
};

export default Footer;
