"use client"

import type React from "react"

import { useCallback, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type UploadResult = { url: string; success: boolean } | { error: string }

export function UploadPosterDialog({
    onUploaded,
    className,
}: {
    onUploaded?: (url: string) => void
    className?: string
}) {
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const reset = useCallback(() => {
        setFile(null)
        setPreview(null)
        setUploadedUrl(null)
        if (inputRef.current) inputRef.current.value = ""
    }, [])

    const onSelect = useCallback(async (f: File) => {
        if (!f) return
        setFile(f)
        const reader = new FileReader()
        reader.onload = () => setPreview(reader.result as string)
        reader.readAsDataURL(f)
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault()
            const f = e.dataTransfer.files?.[0]
            if (f) onSelect(f)
        },
        [onSelect],
    )

    const canUpload = useMemo(() => !!preview && !uploading, [preview, uploading])

    const upload = useCallback(async () => {
        if (!preview) return
        try {
            setUploading(true)
            const res = await fetch("/api/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: preview }),
            })
            const data: UploadResult = await res.json()
            if (!res.ok || "error" in data) {
                throw new Error(("error" in data && data.error) || "Failed to upload")
            }
            setUploadedUrl(data.url)
            onUploaded?.(data.url)
            toast("Image uploaded", { description: "URL copied to clipboard." })
            try {
                await navigator.clipboard.writeText(data.url)
            } catch { }
        } catch (err: any) {
            toast.error("Upload failed", { description: err?.message ?? "Unknown error" })
        } finally {
            setUploading(false)
        }
    }, [preview, onUploaded])

    return (
        <Card className={cn("text-black", className)}>
            <CardHeader>
                <CardTitle>Upload Poster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="flex min-h-60 w-full items-center justify-center rounded-md border border-dashed bg-background/40 p-4"
                    role="button"
                    aria-label="Drop image here"
                >
                    {preview ? (
                        <div className="w-full max-w-md">
                            {/* Use Next Image for performance; fall back to img if crossOrigin needed */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={preview || "/placeholder.svg"}
                                alt="Poster preview"
                                className="mx-auto aspect-square w-full max-w-sm rounded-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="text-center text-foreground/80">
                            <p className="mb-2">Drag & drop poster here</p>
                            <p className="text-sm">or choose a file</p>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const f = e.target.files?.[0]
                            if (f) onSelect(f)
                        }}
                    />
                    <Button variant="outline" onClick={reset}>
                        Clear
                    </Button>
                </div>

                {uploadedUrl && (
                    <div className="rounded-md border p-3">
                        <p className="text-sm font-medium">Click to copy URL</p>
                        <button
                            type="button"
                            className="mt-2 w-full truncate text-left underline"
                            onClick={async () => {
                                if (!uploadedUrl) return
                                await navigator.clipboard.writeText(uploadedUrl)
                                toast("Copied URL to clipboard")
                            }}
                            title={uploadedUrl}
                        >
                            {uploadedUrl}
                        </button>
                        <p className="mt-2 text-xs text-foreground/70">
                            Add this link in the poster field when creating or editing events.
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button onClick={upload} disabled={!canUpload}>
                    {uploading ? "Uploading..." : "Upload"}
                </Button>
                <Button variant="secondary" onClick={reset}>
                    Add Another Image
                </Button>
            </CardFooter>
        </Card>
    )
}