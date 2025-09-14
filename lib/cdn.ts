export const cdn = (path: string) => {
    const base = process.env.CDN_URL?.replace(/\/$/, "") || "";
    const cleanPath = path.replace(/^\/+/, "");
    return `${base}/${cleanPath}`;
}