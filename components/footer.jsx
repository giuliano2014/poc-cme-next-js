'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
    const [footerData, setFooterData] = useState(null);

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

    if (!footerData) return null;

    return (
        <footer className="py-12 px-4" style={{ backgroundColor: '#fff6ef' }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {footerData.categories?.map((category) => (
                        <div key={category.id}>
                            <h3
                                className="font-bold text-lg mb-4"
                                style={{ color: '#336a79' }}
                            >
                                {category.name}
                            </h3>
                            <ul className="space-y-2">
                                {category.products?.map((product, index) => (
                                    <li key={index}>
                                        <a
                                            href={product.url}
                                            className="transition-colors duration-200"
                                            style={{ color: '#336a79' }}
                                            onMouseEnter={(e) =>
                                                (e.target.style.opacity = '0.7')
                                            }
                                            onMouseLeave={(e) =>
                                                (e.target.style.opacity = '1')
                                            }
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
                                        >
                                            {product.name}
                                            {product.new && (
                                                <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                                                    NEW
                                                </span>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
