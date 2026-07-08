# Maya Birthday Website

A very small static one-page birthday greeting site. It uses only HTML, CSS, and vanilla JavaScript.

## Replace the Photo

Put Maya's photo here:

```text
assets/maya.jpg
```

Use the same filename, or update the `src` on the `<img>` tag in `index.html`.

## Replace the Video

The preview video URL is stored in `script.js`:

```js
const PREVIEW_VIDEO_URL = "...";
```

You can use a Dropbox raw file URL there. If you prefer a local file, put the short preview video here and set the video source back to that path:

```text
assets/preview.mp4
```

## Replace the Dropbox Folder URL

Open `script.js` and change this constant:

```js
const DROPBOX_FOLDER_URL = "...";
```

The `סרטונים אישיים` button opens that link in a new tab after the password is entered.

To change the password, update this constant in `script.js`:

```js
const VIDEOS_PASSWORD = "arialia";
```

## Deploy for Free on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files and folders:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets/`
3. In GitHub, go to `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Choose the `main` branch and the root folder.
6. Save. GitHub will show the public website URL after it publishes.

No build step is needed.
