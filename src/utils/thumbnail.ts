import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Ensures a thumbnail exists in public/gallery/[slug]/thumbs/ (and dist/) during build/dev time.
 * Uses { animated: true } so animated GIFs maintain animation in WebP output.
 */
export async function ensureThumbnail(
    slug: string,
    filename: string,
): Promise<string> {
    if (!filename) return "";

    const srcPath = join(process.cwd(), "public", "gallery", slug, filename);
    if (!existsSync(srcPath)) {
        return `/gallery/${slug}/${filename}`;
    }

    const baseName =
        filename.substring(0, filename.lastIndexOf(".")) || filename;
    const thumbFilename = `${baseName}.webp`;

    // Target folder in public/ so dev server (vite) can serve it without 404s
    const publicThumbDir = join(
        process.cwd(),
        "public",
        "gallery",
        slug,
        "thumbs",
    );
    const publicThumbPath = join(publicThumbDir, thumbFilename);

    // Target folder in dist/ if dist exists (during build)
    const distThumbDir = join(
        process.cwd(),
        "dist",
        "gallery",
        slug,
        "thumbs",
    );
    const distThumbPath = join(distThumbDir, thumbFilename);

    const thumbUrl = `/gallery/${slug}/thumbs/${thumbFilename}`;

    try {
        await mkdir(publicThumbDir, { recursive: true });

        let needBuild = true;
        if (existsSync(publicThumbPath)) {
            const srcStat = await stat(srcPath);
            const thumbStat = await stat(publicThumbPath);
            if (thumbStat.mtimeMs >= srcStat.mtimeMs) {
                needBuild = false;
            }
        }

        if (needBuild) {
            // animated: true preserves frames for GIFs and animated WebPs
            await sharp(srcPath, { animated: true })
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 90 })
                .toFile(publicThumbPath);
        }

        // If dist folder exists (e.g. during build), also ensure thumbnail is in dist/
        if (existsSync(join(process.cwd(), "dist"))) {
            await mkdir(distThumbDir, { recursive: true });
            if (!existsSync(distThumbPath)) {
                await sharp(srcPath, { animated: true })
                    .resize({ width: 800, withoutEnlargement: true })
                    .webp({ quality: 90 })
                    .toFile(distThumbPath);
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
}
