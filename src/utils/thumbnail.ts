import sharp from "sharp";
import { mkdir, stat, rename, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const inFlightPromises = new Map<string, Promise<string>>();

/**
 * Ensures an 800px WebP thumbnail exists in public/gallery/[slug]/thumbs/ during build/dev time.
 * Uses atomic tmp file + rename to be thread-safe across Astro build workers on Windows.
 */
export async function ensureThumbnail(
    slug: string,
    filename: string,
): Promise<string> {
    if (!filename) return "";

    const key = `${slug}/${filename}`;
    if (inFlightPromises.has(key)) {
        return inFlightPromises.get(key)!;
    }

    const promise = (async () => {
        const srcPath = join(process.cwd(), "public", "gallery", slug, filename);
        if (!existsSync(srcPath)) {
            return `/gallery/${slug}/${filename}`;
        }

        const baseName =
            filename.substring(0, filename.lastIndexOf(".")) || filename;
        const thumbFilename = `${baseName}.webp`;

        const publicThumbDir = join(
            process.cwd(),
            "public",
            "gallery",
            slug,
            "thumbs",
        );
        const publicThumbPath = join(publicThumbDir, thumbFilename);
        const thumbUrl = `/gallery/${slug}/thumbs/${thumbFilename}`;

        try {
            await mkdir(publicThumbDir, { recursive: true });

            let needBuild = true;
            if (existsSync(publicThumbPath)) {
                const srcStat = await stat(srcPath);
                const thumbStat = await stat(publicThumbPath);
                if (thumbStat.mtimeMs >= srcStat.mtimeMs) {
                    try {
                        const meta = await sharp(publicThumbPath).metadata();
                        const origMeta = await sharp(srcPath).metadata();
                        const targetWidth = Math.min(800, origMeta.width || 800);
                        if (meta.width === targetWidth) {
                            needBuild = false;
                        }
                    } catch {
                        needBuild = true;
                    }
                }
            }

            if (needBuild) {
                const tmpPath = `${publicThumbPath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;
                await sharp(srcPath, { animated: true })
                    .resize({ width: 800, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(tmpPath);

                try {
                    await rename(tmpPath, publicThumbPath);
                } catch {
                    if (existsSync(tmpPath)) {
                        await unlink(tmpPath).catch(() => {});
                    }
                }
            }

            return thumbUrl;
        } catch (err) {
            console.error(
                `[Thumbnail] Error generating thumbnail for ${slug}/${filename}:`,
                err,
            );
            return `/gallery/${slug}/${filename}`;
        }
    })();

    inFlightPromises.set(key, promise);
    return promise;
}
