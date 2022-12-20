
import { PrismaClient, User } from "@prisma/client";
import { GetServerSideProps } from "next";

const prisma = new PrismaClient();

export type UsersPageProps = {
    users: User[]
};

export default function UsersPage({ users } : UsersPageProps) {
    return <div>        
        {users.map(({email, id, name}) => (
            <div> Name {name} id {id} email {email}</div>
        ))}
    </div>
}

export const getServerSideProps: GetServerSideProps<UsersPageProps> = async () => {

    const users = await prisma.user.findMany();

    return {
        props: {
            users
        }
    }
}