# #ABSON RSVP — CONNECTED TO NEW GOOGLE SHEET

The website is already connected to the new Google Apps Script Web App.

**Google Sheet ID**
`1r8vV4oPPYwv8-4r7NELvvqukItVg4-va-lyjF86U0_U`

**Web App /exec URL**
`https://script.google.com/macros/s/AKfycbytf8iqJyMMe3MrWC4rUJbthF-M26ZY_2XTpLh-BrP5b1cfWPetPSAR8zieIOr8qAcQOg/exec`

The combined Apps Script handles both RSVP and guest uploads.

### RSVP columns

The `RSVP` sheet records:
- Timestamp
- Name
- Guests
- Attendance
- Event
- Message

### Testing

1. Open the website.
2. Submit a test RSVP.
3. Open the new Google Sheet.
4. Check the `RSVP` tab for the new row.

For guest uploads, check the `Guest Photos` tab and the configured Drive folder.

### Important

Do not deploy the old `RSVP_Google_Apps_Script.gs` separately. Use `ABSON_Wedding_Apps_Script.gs`.
