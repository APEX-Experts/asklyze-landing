import { GlobalConfig } from 'payload';

export const revalidateHook = (globalSlug: string): any => {
    return async ({ doc, req: { payload } }: any) => {
        if (process.env.SEEDING === 'true') {
            return doc;
        }

        // We will call the Next.js revalidation endpoint
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/revalidate?tag=dictionary`);
            if (!res.ok) {
                payload.logger.error(`Failed to revalidate ${globalSlug}`);
            }
        } catch (err) {
            payload.logger.error(`Error revalidating ${globalSlug}: ${err}`);
        }
        return doc;
    };
};
