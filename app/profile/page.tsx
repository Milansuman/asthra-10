// Adjust path as needed
import type { userZod } from '@/lib/validator';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import type { z } from 'zod';
import ProfileClient from './components/ProfileClient';

type userSchema = Partial<z.infer<typeof userZod>>;

const sampleUser: userSchema = {
    email: 'rajatsandeepsen2025@ai.sjcetpalai.ac.in',
    name: 'Rajat Sandeep Sen',
    image: '/profileplaceholder.webp',
    id: '1234567890',
    college: 'SJCET',
    department: 'AD',
};

export default async function ProfilePage() {
    const session = await getServerSession();



    if (!session) {
        redirect('/');

    }

    return <ProfileClient session={session} user={sampleUser} />;
}