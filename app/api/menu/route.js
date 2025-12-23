export async function GET() {
    const query = `
    query getMenu {
      menu {
        banner_menu {
          path
          subtitle
          title
        }
        flags {
          subtitle
          title
          url
          image_url
        }
        categories {
          name
          image_categorie_url
          image_categories {
            url_image
            title_image
            target_url
          }
          url
          external
          badge
          text_color
          include_in_menu: status
          products {
            name
            new
            url
            external
            badge
            text_color
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(
            'https://mcstaging.c-monetiquette.fr/graphql',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            }
        );

        const data = await response.json();

        if (data.errors) {
            console.error('GraphQL errors:', data.errors);
            return Response.json(
                { error: 'GraphQL query failed' },
                { status: 500 }
            );
        }

        return Response.json(data.data.menu);
    } catch (error) {
        console.error('Error fetching menu:', error);
        return Response.json(
            { error: 'Failed to fetch menu' },
            { status: 500 }
        );
    }
}
