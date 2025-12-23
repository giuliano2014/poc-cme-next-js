import { gql } from '@apollo/client';

export const GET_HOME_PAGE_DATA = gql`
    query getHomePageData {
        getHomePageData {
            meta {
                title
                description
                keywords
                hreflangs {
                    locale
                    url
                }
                h1
                h2
            }
            header {
                image_url
                image_mobile_url
                link
                text
                text_background_color
                text_color
            }
            product_slider {
                background_color
                slider_pagination_main_color
                slider_pagination_secondary_color
                products {
                    text_color
                    main_text
                    secondary_text
                    product_tag {
                        text
                        background_color
                    }
                    link
                    image_url
                    color_samples
                }
            }
            essentials {
                background_color
                main_image {
                    image_url
                    image_mobile_url
                    link
                    text
                    text_background_color
                    text_color
                }
                round_elements {
                    image_url
                    link
                    main_text
                    secondary_text
                    text_color
                }
                slider {
                    slider_pagination_main_color
                    slider_pagination_secondary_color
                    slides {
                        image_url
                        link
                        text
                        text_background_color
                        text_color
                    }
                }
                title {
                    text
                    text_color
                }
            }
            parent_selection {
                background_color
                pagination_main_color
                pagination_secondary_color
                text
                text_color
                image_blocks {
                    image_url
                    link
                }
            }
            delivery_info {
                background_color
                button {
                    background_color
                    link
                    text
                    textColor
                }
                main_text
                secondary_text
                separator_color
                text_color
            }
            reassurance {
                background_color
                blocks {
                    image_url
                    link
                    main_text
                    secondary_text
                    text_color
                }
            }
            support {
                background_color
                buttons {
                    link
                    text
                    text_color
                }
                title {
                    text
                    text_color
                }
            }
            information {
                background_color
                description {
                    text
                    text_color
                }
                title {
                    text
                    text_color
                    image_url
                }
            }
        }
    }
`;
