"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { trys } from "@/lib/utils"
import { api } from "@/trpc/react"
import { Scanner } from "@yudiel/react-qr-scanner"
import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { QrCode, CreditCard, CheckCircle, ArrowLeft, Timer } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const {
    isPending,
    mutateAsync,
    isSuccess: forceSuccess,
  } = api.sjcetPay.spotForceSuccess.useMutation({
    onSuccess: () => {
      toast("Payment Success", {
        description: "Payment has been processed successfully",
      })
    },
    onError: (error) => {
      toast.error(`Payment Failed - ${error.data?.code}`, {
        description: error.message,
      })
    },
  })

  const [orderId, setOrderId] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/desk">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Desk
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Scanner</h1>
          <p className="text-muted-foreground">Process venue payments via QR code scanning</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Force Payment Success</CardTitle>
              <CardDescription className="text-base mt-2">
                Allow customers to initiate purchases on their phones and scan their 'Pay at Venue' QR code
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-4 w-4 text-amber-600" />
                  <span className="font-medium text-amber-800 dark:text-amber-200">Important Notice</span>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Each scan requires at least a 5-second gap between attempts
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderId" className="text-sm font-medium">
                  Order ID
                </Label>
                <Input
                  id="orderId"
                  placeholder="Enter Order ID"
                  value={orderId}
                  className="h-14 text-lg"
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="pt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button disabled={orderId.length === 0} className="w-full h-12 text-base gap-2" size="lg">
                    <QrCode className="h-5 w-5" />
                    Open QR Scanner
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader className="text-center">
                    <DialogTitle className="flex items-center justify-center gap-2">
                      <QrCode className="h-5 w-5" />
                      QR Code Scanner
                    </DialogTitle>
                    <DialogDescription className="mt-2">
                      Position the QR code within the scanner frame
                    </DialogDescription>
                  </DialogHeader>

                  <div className="text-center mb-4">
                    {isPending && (
                      <Badge variant="secondary" className="gap-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                        Processing Payment...
                      </Badge>
                    )}
                    {forceSuccess && !isPending && (
                      <Badge variant="default" className="gap-2">
                        <CheckCircle className="h-3 w-3" />
                        Payment Success
                      </Badge>
                    )}
                    {!isPending && !forceSuccess && (
                      <Badge variant="outline" className="gap-2">
                        <QrCode className="h-3 w-3" />
                        Ready to Scan
                      </Badge>
                    )}
                  </div>

                  <div className="w-full aspect-square bg-black rounded-lg overflow-hidden">
                    <Scanner
                      formats={["qr_code"]}
                      classNames={{
                        container: "p-0 qr-container h-full",
                        video: "w-full h-full object-cover",
                      }}
                      paused={isPending}
                      allowMultiple={true}
                      scanDelay={5000}
                      onScan={(results) => {
                        const result = results[0]
                        if (!result) return

                        const { isSuccess, data, error } = trys(() => result.rawValue)

                        if (!isSuccess) {
                          toast.error(error.title, {
                            description: error.message,
                          })
                          return
                        }

                        mutateAsync({
                          id: data,
                          orderId,
                        })
                      }}
                      onError={(error) => {
                        console.error(error)
                        toast.error("Scanner Error", {
                          description: "Failed to access camera or scan QR code",
                        })
                      }}
                    />
                  </div>

                  <div className="text-center text-sm text-muted-foreground">
                    <p>Hold the QR code steady within the frame</p>
                    <p className="text-xs mt-1">
                      Order ID: <span className="font-mono">{orderId}</span>
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}