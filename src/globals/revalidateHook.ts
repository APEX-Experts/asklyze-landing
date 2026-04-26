import { GlobalAfterChangeHook } from 'payload';

export const revalidateHook = (globalSlug: string): GlobalAfterChangeHook => {
    return async ({ doc, req }) => {
        if (process.env.SEEDING === 'true') {
            return doc;
        }

        try {
            const { revalidateTag } = await import('next/cache');
            revalidateTag('dictionary');
            req.payload.logger.info(`Successfully revalidated tag "dictionary" for ${globalSlug}`);
        } catch (err) {
            req.payload.logger.error(`Error revalidating ${globalSlug}: ${err}`);
        }
        return doc;
    };
};