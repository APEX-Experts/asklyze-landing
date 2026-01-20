'use server'

import { handleServerFunctions } from '@payloadcms/next/layouts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps = async (args: any) => {
    return handleServerFunctions(args)
}
