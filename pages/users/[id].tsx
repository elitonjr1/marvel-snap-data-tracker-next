import type { GetStaticPaths, GetStaticProps } from "next";

import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export type UserPageProps = User;

export default function UserPage({ email, id, name } : UserPageProps) {
    return <div>
             <div> Name {name} id {id} email {email}</div>
           </div>
}

type UserQuery = {
    id: string;
}

export const getStaticPaths: GetStaticPaths<UserQuery> = async () => {
    
    const usersId = await prisma.user.findMany(
        {
            select: {
                id: true,
            }
        }
    )
    
    return {
        paths: usersId.map((user) => ({
            params: {id: user.id.toString()},
        })),
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps<UserPageProps, UserQuery> = async ({ params }) => {
    
    const user = await prisma.user.findFirst({
        where: {
            id: Number(params?.id)
        }
    }) as User;

    return {
        props: user,
    }
}

