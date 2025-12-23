export async function POST(request) {
    const STAGING_API_URL = 'https://mcstaging.c-monetiquette.fr/graphql';

    try {
        const body = await request.json();

        console.log('[v0] Server-side GraphQL request to:', STAGING_API_URL);

        const response = await fetch(STAGING_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        console.log('[v0] Server response status:', response.status);

        const data = await response.json();

        return Response.json(data);
    } catch (error) {
        console.error('[v0] Server error:', error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
