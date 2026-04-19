import { revalidateTag } from 'next/cache';

export const revalidateHook = (globalSlug: string): any => {
    return async ({ doc, req: { payload } }: any) => {
        if (process.env.SEEDING === 'true') {
            return doc;
        }

        // Payload runs inside the same Next.js process (via withPayload),
        // so we can call revalidateTag directly — no HTTP self-fetch needed.
        // This avoids Cloud Run's inability to make requests back to itself.
        try {
            revalidateTag('dictionary');
            payload.logger.info(`Successfully revalidated tag "dictionary" for ${globalSlug}`);
        } catch (err) {
            payload.logger.error(`Error revalidating ${globalSlug}: ${err}`);
        }
        return doc;
    };
};
