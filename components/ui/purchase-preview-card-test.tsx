'use client';

import Image from 'next/image';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PurchaseCardProps {
  title: string;
  description: string;
  features: string[];
}

export const PurchaseCardCard: FC<PurchaseCardProps> = ({
  title,
  description,
  features,
}) => (
  <Card className="ambit m-2 max-w-sm bg-white shadow-lg rounded-none">
    <CardHeader>
      <CardTitle className="-mb-2 font-semibold text-3xl text-black">
        {title}
      </CardTitle>
      <CardDescription className="text-neutral-700">
        {description}
      </CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col items-center space-y-6">
      <Image
        src="/asthra .png"
        alt="Asthra Logo"
        width={300}
        height={200}
        className="my-4"
      />
      {features.length > 0 && (
        <ul className="w-full list-disc space-y-2 pl-5 text-black">
          {features.map((feature, index) => (
            <li key={index} className="list-item items-center gap-2">
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </CardContent>
    <CardFooter className="flex justify-between gap-4">
      <Button
        variant="outline"
        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white font-semibold text-button-primary"
        onClick={() => console.log('clicked view')}
      >
        <span>View</span>
      </Button>
      <Button
        className="flex-1 rounded-lg bg-button-primary font-bold text-white hover:bg-blue-700"
        onClick={() => console.log('clicked buy')}
      >
        Buy Ticket
      </Button>
    </CardFooter>
  </Card>
);
