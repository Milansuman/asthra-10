'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import React from "react"
import Plusbox from "./box"
import { useSession } from "next-auth/react"

interface ErrorCardProps {
    error: Error
    data: object
    className?: string
}

const ErrorCard: React.FC<ErrorCardProps> = ({
    error,
    data,
    className
}) => {
    const { data: session } = useSession()

    const formatJsonToText = (obj: object, indent = ""): string => {
        let result = ""
        for (const [key, value] of Object.entries(obj)) {
            const formattedKey = key.replace(/([A-Z])/g, ' $1').trim()
            if (typeof value === 'object' && value !== null) {
                result += `${indent}${formattedKey}:\n${formatJsonToText(value, `${indent}  `)}`
            } else {
                result += `${indent}${formattedKey}: ${String(value)}\n`
            }
        }
        return result
    }

    const handleReportError = () => {
        const userEmail = session?.user?.email || "Unknown User"
        const message = `Error Report\n\nUser Email: ${userEmail}\nError: ${error.name} -\nData:\n${formatJsonToText(data)}`
        const encodedMessage = encodeURIComponent(message)
        const phoneNumber = "+919846101882"
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
        window.open(whatsappUrl, '_blank')
    }

    const renderJsonMessage = (json: object) => {
        try {
            return (
                <div className="space-y-2 w-full">
                    {Object.entries(json).map(([key, value]) => (
                        <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-start items-start gap-2">
                            <span className="font-medium text-white capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-white">
                                {typeof value === 'object' && value !== null ? (
                                    <div>{renderJsonMessage(value)}</div>
                                ) : (
                                    String(value)
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            )
        } catch (e) {
            return <div className="text-red-500">Error parsing JSON</div>
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <Plusbox className="p-2 w-fit">
                <Card className={`p-2 relative bg-glass ${className}`}>
                    <CardHeader className="flex items-center justify-center">
                        <CardTitle className="text-xl font-semibold text-center">
                            {error.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col items-center gap-4">
                        <div className="flex sm:flex-col items-center gap-4">
                            <Label variant="glass" className="text-sm font-thin text-center bg-red-500">
                                Error
                            </Label>
                            <div className="text-center">
                                {error.message}
                            </div>
                            <div className="text-center text-sm text-white mt-2 p-2 bg-glass rounded-md w-full">
                                <div className="font-medium mb-2">data:</div>
                                {renderJsonMessage(data)}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-center gap-4">
                        <Button
                            variant="outline"
                            onClick={handleReportError}
                            className="bg-glass hover:bg-gray-200/50"
                        >
                            Report Error
                        </Button>
                        <Button
                            variant="outline"
                            link="/profile"
                            className="bg-glass hover:bg-gray-200/50"
                        >
                            Back to Profile
                        </Button>
                    </CardFooter>
                </Card>
            </Plusbox>
        </div>
    )
}

export default ErrorCard