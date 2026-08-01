# 📸 Gallery Folder

This folder contains all event photo galleries for the Furries at Berkeley website.

---

## Folder Structure

```
public/gallery/
├── README.md           ← you are here
├── furmeet-fall-2026/  ← event folder
│   ├── event.json      ← event metadata (required)
│   ├── cover.jpg       ← cover photo (referenced in event.json)
│   ├── photo01.jpg
│   ├── photo02.jpg
│   └── ...
├── 2/
│   ├── event.json
│   └── ...
└── ...
```

**Event date determine display order** — most recent event is first.

---

## How to Add a New Event

1. **Create a new folder** inside `public/gallery/`. Use a descriptive name, e.g. "furmeet-fall-2026".

2. **Drop your photos** into the folder. Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`

3. **Create an `event.json`** in the folder using the template below.

4. That's it! The gallery page will automatically pick up the new event on the next build.

---

## `event.json` Template

```json
{
  "name": "Event Name Here",
  "slug": "event-url-slug",
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
| `slug` | ✅ | URL-safe identifier — used for the sub-page URL: `/gallery/[slug]`. Use lowercase letters, numbers, and hyphens only. |
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

- **Slug must be unique** across all events. If two events share a slug, only one will build correctly.
- **Cover photo** should be a good landscape-ish crop — it's displayed at 4:3 ratio on the card.
- **File names** don't need to follow any specific convention, but keeping them simple (e.g. `01.jpg`, `02.jpg`) makes `event.json` easier to write.
- **Photos load lazily** — only the currently viewed photo is loaded in the lightbox, so large event folders are fine.
