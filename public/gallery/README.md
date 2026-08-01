# 📸 Gallery Folder

This folder contains all event photo galleries for the Furries at Berkeley website.

---

## Folder Structure

```
public/gallery/
├── README.md           ← you are here
├── furmeet-fall-2026/  ← event folder (folder name is the URL slug: /gallery/furmeet-fall-2026)
│   ├── event.json      ← event metadata (required)
│   ├── cover.jpg       ← cover photo (referenced in event.json)
│   ├── photo01.jpg
│   ├── photo02.jpg
│   └── ...
├── fc-2026/                  ← event folder (URL slug: /gallery/fc-2026)
│   ├── event.json
│   └── ...
└── ...
```

**Event folder names determine the URL slug** (`/gallery/[folder-name]`). Use lowercase letters, numbers, and hyphens.  
**Event date determines display order** — most recent event is listed first.

---

## How to Add a New Event

1. **Create a new folder** inside `public/gallery/`. The folder name will be your event's URL slug (e.g. `furmeet-fall-2026`).

2. **Drop your photos** into the folder. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`.

3. **Create an `event.json`** in the folder using the template below.

4. That's it! The gallery page will automatically pick up the new event on the next build.

---

## `event.json` Template

```json
{
  "name": "Event Name Here",
  "date": "2026-06-07",
  "dateEnd": "2026-06-09",
  "description": "A short description of the event shown on the gallery card.",
  "cover": "cover.jpg",
  "photoMeta": {
    "photo01.jpg": {
      "photographer": "Nelli (@nelli)",
      "suiters": ["Barkeley", "Doe"],
      "description": "At the campanelli"
    },
    "photo02.jpg": {
      "photographer": "Barkeley",
      "suiters": [],
      "description": "A ball :3"
    }
  }
}
```

---

## Field Reference

### Top-level fields

| Field | Required | Description |
|---|---|---|
| `name` | ✅ | Display name of the event (shown on the card and sub-page) |
| `date` | ✅ | Event date in `YYYY-MM-DD` format |
| `dateEnd` | ❌ | End date in `YYYY-MM-DD` format — omit or leave blank for single-day events |
| `description` | ❌ | Short blurb shown on the card and event page |
| `cover` | ❌ | Filename of the cover photo. Falls back to the first image file in the folder if omitted. |
| `photoMeta` | ❌ | Per-photo metadata (see below). Omitting this field is fine. |

### `photoMeta` fields (per photo)

`photoMeta` is a **sparse map** — you only need entries for photos you want to annotate. All image files in the folder are displayed regardless.

| Field | Type | Description |
|---|---|---|
| `photographer` | string | Name/handle of the photographer. Leave blank (`""`) if unknown. |
| `suiters` | string[] | List of fursonas / names of suiters in the photo, e.g. `["Barkeley", "Doe"]`. Leave as `[]` if none. |
| `description` | string | A short caption or note about the photo. Leave blank (`""`) if none. |

---

## Tips

- **Folder names must be unique** across all events (e.g., `sammies`, `fall-picnic-2026`).
- **Cover photo**: Set via `cover` in `event.json`. If omitted, the first photo in the folder is used automatically. The card preview uses a WebP thumbnail while the event page hero header uses the full-resolution cover.
- **File size** should be under 5mb to ensure fast load times and not use too much data for mobile users.
- **File names** don't need any specific format, but simple names (e.g. `01.jpg`, `02.jpg`) make `event.json` easier to maintain.
- **Supported file types**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`.

