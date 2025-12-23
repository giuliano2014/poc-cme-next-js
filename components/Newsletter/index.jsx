'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './newsletter.module.css';

// Configuration des réseaux sociaux
const SOCIAL_LINKS = [
    {
        type: 'facebook',
        icon: '/icons/facebook_orange_icon.svg',
        url: 'https://www.facebook.com/CMonEtiquette/'
    },
    {
        type: 'instagram',
        icon: '/icons/instagram_orange_icon.svg',
        url: 'https://www.instagram.com/cmonetiquette/'
    },
    {
        type: 'pinterest',
        icon: '/icons/pinterest_orange_icon.svg',
        url: 'https://www.pinterest.fr/CMonEtiquette/'
    },
    {
        type: 'youtube',
        icon: '/icons/youtube_orange_icon.svg',
        url: 'https://www.youtube.com/@c-monetiquette'
    },
    {
        type: 'tiktok',
        icon: '/icons/tiktok_orange_icon.svg',
        url: 'https://www.tiktok.com/@cmonetiquette?lang=fr'
    }
];

// Validation d'email simple
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!email) {
            setError('Veuillez entrer une adresse e-mail');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Veuillez entrer une adresse e-mail valide');
            return;
        }

        setIsLoading(true);

        try {
            const mutation = `
                mutation subscribeEmailToNewsletter($email: String!) {
                    subscribeEmailToNewsletter(email: $email) {
                        status
                    }
                }
            `;

            const response = await fetch('/api/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { email }
                })
            });

            const result = await response.json();

            if (result.errors) {
                throw new Error(
                    result.errors[0]?.message || "Erreur lors de l'inscription"
                );
            }

            if (
                result.data?.subscribeEmailToNewsletter?.status === 'SUBSCRIBED'
            ) {
                setShowSuccess(true);
                setEmail('');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 10000);
            }
        } catch (err) {
            setError(err.message || "Erreur lors de l'inscription");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const SocialMediaList = ({ className }) => (
        <ul className={className}>
            {SOCIAL_LINKS.map((social) => (
                <li key={social.type}>
                    <Image
                        src={social.icon}
                        alt={`${social.type} icon`}
                        width={24}
                        height={24}
                        className={styles.socialIcon}
                        onClick={() => handleSocialClick(social.url)}
                        loading="lazy"
                    />
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <div className={styles.root} data-cy="Newsletter-root">
                {/* Mobile: Social media + titre sur la même ligne */}
                <div className={styles.socialMediaContainer}>
                    <p
                        className={styles.newsletterText}
                        data-cy="Newsletter-infoText"
                    >
                        Suivez-nous
                    </p>
                    <div className={styles.separator}></div>
                    <SocialMediaList className={styles.socialMediaListMobile} />
                </div>

                {/* Loading overlay */}
                {isLoading && (
                    <div className={styles.loadingContainer}>
                        <span>Inscription en cours...</span>
                    </div>
                )}

                {/* Titre */}
                <div className={styles.title} data-cy="Newsletter-title">
                    <div>NEWSLETTER</div>
                    <div>Recevez nos offres + exclusivités !</div>
                </div>

                {/* Formulaire */}
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label
                        htmlFor="newsletter-email"
                        className={styles.formLabel}
                    >
                        Email
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="email"
                            id="newsletter-email"
                            autoComplete="email"
                            placeholder="Votre adresse e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={
                                error
                                    ? styles.newsletterInputError
                                    : styles.newsletterInput
                            }
                        />
                        <button
                            type="submit"
                            className={styles.subscribeButton}
                            disabled={isLoading}
                            data-cy="Newsletter-submitButton"
                        >
                            S'inscrire
                        </button>
                    </div>
                </form>

                {/* Message d'erreur */}
                {error && <div className={styles.errorMessage}>{error}</div>}

                {/* Message de succès */}
                {showSuccess && (
                    <div className={styles.responseText}>
                        Votre inscription a bien été prise en compte
                    </div>
                )}
            </div>

            {/* Desktop: Social media en dessous */}
            <SocialMediaList className={styles.socialMediaListDesktop} />
        </div>
    );
};

export default Newsletter;
