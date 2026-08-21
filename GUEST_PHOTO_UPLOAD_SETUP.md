#ABSON Guest Photo Upload — CONNECTED

The website is already connected to the new combined Google Apps Script.

**Google Sheet ID**
`1r8vV4oPPYwv8-4r7NELvvqukItVg4-va-lyjF86U0_U`

**Web App /exec URL**
`https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec`

The same endpoint handles:
- Guest photo/video uploads
- Upload records in the `Guest Photos` sheet
- Drive folder handling
- RSVP submissions

### Drive upload

The Apps Script first tries the configured Drive folder. If that folder is not accessible to the new account, it automatically creates/uses:

`#ABSON Guest Uploads`

### Important

Do not replace the endpoint in `script.js` unless you deploy a newer Apps Script version.

The upload section accepts images and videos. For reliable wedding-day uploads, keep very large videos reasonably sized because Apps Script and browser upload limits apply.
