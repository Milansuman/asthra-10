"use client";

import type { userZod } from '@/lib/validator';
import { Session } from 'next-auth';
import Image from 'next/image';
import React, { useState } from 'react';
import type { z } from 'zod';
import { Button } from '../ui/button';

type userSchema = Partial<z.infer<typeof userZod>>;

type ProfileClientProps = {
    session: Session;
    user: userSchema;
};


function MainProfileContent({
    onEditProfile,
    onViewPass,
    onViewRegisteredEvents,
    onShowTransactions,
}: {
    onEditProfile: () => void;
    onViewPass: () => void;
    onViewRegisteredEvents: () => void;
    onShowTransactions: () => void;
}) {
    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Profile Image */}
            <div className="profile-image w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-transparent mx-auto sm:mx-0">
                <Image
                    src={sampleUser.image || '/profileplaceholder.webp'}
                    width={50}
                    height={50}
                    alt="profile image"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* User Info */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{sampleUser.name}</p>
                <p className="text-lg sm:text-xl md:text-2xl break-words">{sampleUser.email}</p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                    <Button variant={"glass"} size={"sm"}>

                        College: {sampleUser.college}
                    </Button>
                    <Button variant={"glass"} size={"sm"}>
                        Department: {sampleUser.department}
                    </Button>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <Button
                    variant="glass"
                    size="glass"
                >
                    400 Credits Remaining
                </Button>
                <Button
                    onClick={onEditProfile}
                    variant="glass"
                    size="glass"
                >
                    Edit Profile
                </Button>
                <Button
                    onClick={onViewPass}
                    variant="glass"
                    size="glass"
                >
                    View Pass
                </Button>
                <Button
                    variant="glass"
                    size="glass"
                >
                    Asthra Pass Unlocked
                </Button>
                <Button
                    onClick={onViewRegisteredEvents}
                    variant="glass"
                    size="glass"
                >
                    View Registered Events
                </Button>
                <Button
                    onClick={onShowTransactions}
                    variant="glass"
                    size="glass"
                >
                    Show Transactions
                </Button>
                <Button
                    variant="glass"
                    size="glass"
                >
                    My Events
                </Button>
            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <Button
                    variant="glass"
                    size="glass"
                >
                    Generate Certificate
                </Button>
                <Button
                    variant="glass"
                    size="glass"
                >
                    Logout
                </Button>
            </div>
        </div>
    );
}

// Edit Profile Form Component
function EditProfileForm({ onBack }: { onBack: () => void }) {
    return (
        <div className="w-full">
            <Button
                onClick={onBack}
                variant="glass"
                size="glass"
            >
                &larr;{" "} Back
            </Button>
            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    defaultValue={sampleUser.name || ''}
                    placeholder="Name"
                    className="p-2 rounded-md bg-white/80 text-black border-2 border-border"
                />
                <input
                    type="email"
                    defaultValue={sampleUser.email}
                    placeholder="Email"
                    className="p-2 rounded-md bg-white/80 text-black border-2 border-border"
                />
                <input
                    type="tel"
                    placeholder="Phone"
                    className="p-2 rounded-md bg-white/80 text-black border-2 border-border"
                />
                <input
                    type="text"
                    defaultValue={sampleUser.college || ''}
                    placeholder="College"
                    className="p-2 rounded-md bg-white/80 text-black border-2 border-border"
                />
                <input
                    type="text"
                    defaultValue={sampleUser.department || ''}
                    placeholder="Department"
                    className="p-2 rounded-md bg-white/80 text-black border-2 border-border"
                />
                <Button
                    variant="glass"
                    size="glass"
                >
                    Save
                </Button>
            </form>
        </div>
    );
}

// Registered Events List Component
function RegisteredEventsList({ onBack }: { onBack: () => void }) {
    return (
        <div className="w-full">
            <Button
                onClick={onBack}
                variant="glass"
                size="glass"
            >
                &larr;{" "} Back
            </Button>
            <h2 className="text-2xl font-bold mb-4">Registered Events</h2>
            <ul className="space-y-4">
                <li className="bg-white/80 p-4 rounded-md text-black border-2 border-border">
                    Event 1 - Registered
                </li>
                <li className="bg-white/80 p-4 rounded-md text-black border-2 border-border">
                    Event 2 - Pending
                </li>
            </ul>
        </div>
    );
}

// Transactions List Component
function TransactionsList({ onBack }: { onBack: () => void }) {
    return (
        <div className="w-full">
            <Button
                onClick={onBack}
                variant="glass"
                size="glass"
            >
                &larr;{" "} Back
            </Button>
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <ul className="space-y-4">
                <li className="bg-white/80 p-4 rounded-md text-black border-2 border-border">
                    <p>Amount: 100</p>
                    <p>Status: Completed</p>
                    <p>Time: 2023-10-01 12:00</p>
                </li>
                <li className="bg-white/80 p-4 rounded-md text-black border-2 border-border">
                    <p>Amount: 50</p>
                    <p>Status: Pending</p>
                    <p>Time: 2023-10-02 14:00</p>
                </li>
            </ul>
        </div>
    );
}

// Pass Modal Component
function PassModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-md border border-neutral-300/60 max-w-md w-full">
                <Button
                    onClick={onClose}
                    variant="destructive"
                    size="sm"
                    className="mb-4 text-white bg-transparent border-none hover:bg-white/10"
                >
                    Close
                </Button>
                <h2 className="text-2xl font-bold mb-4">Your Asthra Pass</h2>
                <p>Pass details go here.</p>
            </div>
        </div>
    );
}

// Main Client Component
function ProfileClient({ session, user }: ProfileClientProps) {
    const [currentView, setCurrentView] = useState<'main' | 'editProfile' | 'registeredEvents' | 'transactions'>('main');
    const [isPassModalOpen, setIsPassModalOpen] = useState(false);

    const handleEditProfile = () => setCurrentView('editProfile');
    const handleViewPass = () => setIsPassModalOpen(true);
    const handleViewRegisteredEvents = () => setCurrentView('registeredEvents');
    const handleShowTransactions = () => setCurrentView('transactions');
    const handleBackToMain = () => setCurrentView('main');

    let content: React.ReactNode;
    switch (currentView) {
        case 'editProfile':
            content = <EditProfileForm onBack={handleBackToMain} />;
            break;
        case 'registeredEvents':
            content = <RegisteredEventsList onBack={handleBackToMain} />;
            break;
        case 'transactions':
            content = <TransactionsList onBack={handleBackToMain} />;
            break;
        default:
            content = (
                <MainProfileContent
                    onEditProfile={handleEditProfile}
                    onViewPass={handleViewPass}
                    onViewRegisteredEvents={handleViewRegisteredEvents}
                    onShowTransactions={handleShowTransactions}
                />
            );
    }

    return (
        <div className="w-full min-h-screen p-6 grid grid-cols-1 md:grid-cols-2 gap-4 relative ambit">
            <div className="z-20 max-w-2xl max-h-screen profile container flex flex-col items-start gap-8 border border-glass bg-glass p-8 overflow-y-auto">
                {content}
            </div>
            <div className="min-w-4xl hidden md:block z-1">
            </div>
            {isPassModalOpen && <PassModal onClose={() => setIsPassModalOpen(false)} />}
        </div>
    );
}

export default ProfileClient;



const sampleUser: userSchema = {
    email: 'rajatsandeepsen2025@ai.sjcetpalai.ac.in',
    name: 'Rajat Sandeep Sen',
    image: '/profileplaceholder.webp',
    id: '1234567890',
    college: 'SJCET',
    department: 'AD',
};