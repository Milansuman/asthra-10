"use client"

import { trys } from '@/lib/utils';
import { getIdFromQr } from '@/logic/qr';
import { api } from '@/trpc/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { toast } from 'sonner';

export default function Page() {
  const { isPending: isPendingAsthra, mutateAsync: forceAsthraPayment } = api.asthra.forceSuccessPurchase.useMutation({
    onSuccess: () => {
      toast('Payment Success')
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  });
  const { isPending: isPendingEvents, mutateAsync: forceEventsPayment } = api.transaction.forceSuccessPurchase.useMutation({
    onSuccess: () => {
      toast('Payment Success')
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message
      })
    }
  });
  return (
    <main className="flex flex-col h-screen text-white p-6">
      <h3>Front Desk - Force Payment Successor</h3>
      <p>Let the user initiate purchase on their phone and scan their QR of 'Pay at Venue'</p>
      <p>Each scan atleast required 5sec gap</p>
      <div className='w-96 aspect-square'>
        <Scanner
          formats={
            ["qr_code"]
          }
          paused={isPendingEvents || isPendingAsthra}
          allowMultiple={true}
          scanDelay={5000}
          onScan={(results) => {
            const result = results[0]
            if (!result) return

            const { isSuccess, data, error } = trys(() => getIdFromQr(result.rawValue))

            if (!isSuccess) {
              toast.error(error.title, {
                description: error.message
              })
              return
            }

            const { id, eventType } = data

            if (eventType === 'ASTHRA_PASS_EVENT') {
              return
            }

            if (eventType === 'ASTHRA_PASS') {
              forceAsthraPayment({ id })
            }

            else {
              forceEventsPayment({ id })
            }
          }}
          onError={(error) => {
            console.error(
              error
            )
          }}
        />
      </div>
    </main>
  )
}