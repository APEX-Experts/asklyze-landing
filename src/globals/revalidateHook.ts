
export const revalidateHook = (globalSlug: string): any => {
    return async ({ doc, req: { payload } }: any) => {
        if (process.env.SEEDING === 'true') {
            return doc;
        }

        // Use NEXT_PUBLIC_SITE_URL (must be set in production .env)
        // Falls back to the internal server URL or localhost for local dev
        const siteUrl =
            process.env.NEXT_PUBLIC_SITE_URL ||
            process.env.PAYLOAD_PUBLIC_SERVER_URL ||
            'http://localhost:3000';

        try {
            const res = await fetch(
                `${siteUrl}/api/revalidate?tag=dictionary`,
                {
                    // Bypass any external proxy / CDN caching on this internal call
                    cache: 'no-store',
                    signal: AbortSignal.timeout(5000),
                }
            );
            if (!res.ok) {
                payload.logger.error(
                    `Failed to revalidate ${globalSlug}: HTTP ${res.status}`
                );
            } else {
                payload.logger.info(`Successfully revalidated ${globalSlug}`);
            }
        } catch (err) {
            payload.logger.error(`Error revalidating ${globalSlug}: ${err}`);
        }
        return doc;
    };
};
