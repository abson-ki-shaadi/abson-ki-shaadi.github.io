/**
 * ============================================================
 * #ABSON WEDDING WEBSITE - GOOGLE APPS SCRIPT
 * ============================================================
 *
 * Features
 * 1. RSVP submissions -> Google Sheet
 * 2. Guest photo/video uploads -> Google Drive
 * 3. Upload records -> Guest Photos sheet
 * 4. Drive connection test -> Drive Test sheet
 * 5. Automatic fallback to a new Drive folder if the configured
 *    folder is not accessible by the account executing this script.
 *
 * IMPORTANT:
 * Deploy as a Web App:
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * After changing code, create a NEW deployment/version and update
 * the website with the new /exec URL.
 * ============================================================
 */


/* ============================================================
   CONFIGURATION
   ============================================================ */

// NEW Google Sheet supplied by the user.
const SPREADSHEET_ID =
  '1r8vV4oPPYwv8-4r7NELvvqukItVg4-va-lyjF86U0_U';

const RSVP_SHEET = 'RSVP';
const PHOTO_SHEET = 'Guest Photos';
const TEST_SHEET = 'Drive Test';

// Existing Drive folder ID supplied previously.
// If this folder is not accessible to the account executing
// this script, the script automatically creates a new folder
// called "#ABSON Guest Uploads" in that account's My Drive.
const PREFERRED_PHOTO_FOLDER_ID =
  '1OcT9HW5yoRr3pcnmDHW0QGOQLJRkTq1j';

const FALLBACK_FOLDER_NAME = '#ABSON Guest Uploads';

// Maximum upload size accepted by this endpoint.
// Keep uploads reasonably small for Apps Script web apps.
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;


/* ============================================================
   INITIAL SETUP
   ============================================================ */

function setup() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const rsvpSheet = getOrCreateSheet_(ss, RSVP_SHEET);
  ensureHeader_(rsvpSheet, [
    'Timestamp',
    'Name',
    'Guests',
    'Attendance',
    'Event',
    'Message'
  ]);

  const photoSheet = getOrCreateSheet_(ss, PHOTO_SHEET);
  ensureHeader_(photoSheet, [
    'Timestamp',
    'Guest Name',
    'File Name',
    'File Type',
    'File Size (Bytes)',
    'Drive Link',
    'File ID'
  ]);

  const testSheet = getOrCreateSheet_(ss, TEST_SHEET);
  ensureHeader_(testSheet, [
    'Timestamp',
    'Test',
    'Status',
    'Details'
  ]);

  // This is the important part for the new Google account.
  const folder = getPhotoFolder_();

  testSheet.appendRow([
    new Date(),
    'Drive folder',
    'READY',
    folder.getName() + ' | ' + folder.getUrl()
  ]);

  return 'Setup completed. Drive folder: ' + folder.getUrl();
}


/* ============================================================
   GET REQUEST
   ============================================================ */

function doGet(e) {
  return jsonResponse_({
    ok: true,
    project: '#ABSON Wedding Website',
    message: 'Wedding endpoint is working',
    timestamp: new Date().toISOString()
  });
}


/* ============================================================
   POST REQUEST
   ============================================================ */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse_({
        ok: false,
        error: 'POST body is empty or missing'
      });
    }

    let payload;

    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return jsonResponse_({
        ok: false,
        error: 'Invalid JSON received',
        details: String(parseError)
      });
    }

    const action = String(payload.action || '').trim();

    // Explicit RSVP action.
    if (action === 'rsvp') {
      return handleRSVP_(payload);
    }

    // Explicit guest upload action.
    if (
      action === 'uploadGuestFile' ||
      action === 'upload' ||
      action === 'guestUpload'
    ) {
      return handleGuestUpload_(payload);
    }

    // Backward compatibility:
    // If action is missing but RSVP fields exist, treat as RSVP.
    if (
      !action &&
      (
        payload.name !== undefined ||
        payload.attendance !== undefined ||
        payload.guests !== undefined
      )
    ) {
      return handleRSVP_(payload);
    }

    return jsonResponse_({
      ok: false,
      error: 'Unknown action',
      action: action || 'not specified'
    });

  } catch (err) {
    console.error(err && err.stack ? err.stack : err);

    return jsonResponse_({
      ok: false,
      error: String(err && err.message ? err.message : err)
    });
  }
}


/* ============================================================
   RSVP HANDLER
   ============================================================ */

function handleRSVP_(payload) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, RSVP_SHEET);

  ensureHeader_(sheet, [
    'Timestamp',
    'Name',
    'Guests',
    'Attendance',
    'Event',
    'Message'
  ]);

  const name = cleanValue_(payload.name);
  const guests = cleanValue_(payload.guests);
  const attendance = cleanValue_(payload.attendance);
  const eventName = cleanValue_(payload.event);
  const message = cleanValue_(payload.message);

  if (!name) {
    throw new Error('Guest name is required.');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    sheet.appendRow([
      new Date(),
      name,
      guests,
      attendance,
      eventName,
      message
    ]);
  } finally {
    lock.releaseLock();
  }

  return jsonResponse_({
    ok: true,
    type: 'rsvp',
    message: 'RSVP successfully recorded',
    name: name
  });
}


/* ============================================================
   GUEST PHOTO / VIDEO UPLOAD
   ============================================================ */

function handleGuestUpload_(payload) {
  if (!payload.base64) {
    throw new Error('No file data received from website.');
  }

  if (!payload.fileName) {
    throw new Error('No file name received.');
  }

  let base64Data = String(payload.base64);

  // Accept both:
  // data:image/jpeg;base64,/9j/...
  // and plain base64.
  if (base64Data.indexOf(',') !== -1) {
    base64Data = base64Data.split(',')[1];
  }

  base64Data = base64Data.replace(/\s/g, '');

  if (!base64Data) {
    throw new Error('File data is empty.');
  }

  // Approximate decoded size before decoding.
  const estimatedBytes = Math.floor(base64Data.length * 0.75);

  if (estimatedBytes > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      'File is too large. Please upload a file smaller than 25 MB.'
    );
  }

  const mimeType =
    String(payload.mimeType || 'application/octet-stream');

  const fileName =
    sanitizeFileName_(String(payload.fileName));

  const guestName =
    cleanValue_(payload.guestName);

  const decodedBytes = Utilities.base64Decode(base64Data);

  if (decodedBytes.length > MAX_FILE_SIZE_BYTES) {
    throw new Error(
      'File is too large. Please upload a file smaller than 25 MB.'
    );
  }

  const blob = Utilities.newBlob(
    decodedBytes,
    mimeType,
    fileName
  );

  // This function verifies/accesses the Drive folder.
  // If the old folder belongs to another account and cannot be
  // accessed, it automatically creates a new folder for the
  // current script owner.
  const folder = getPhotoFolder_();

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  let file;

  try {
    file = folder.createFile(blob);
  } finally {
    lock.releaseLock();
  }

  // Save upload information to the new Google Sheet.
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, PHOTO_SHEET);

  ensureHeader_(sheet, [
    'Timestamp',
    'Guest Name',
    'File Name',
    'File Type',
    'File Size (Bytes)',
    'Drive Link',
    'File ID'
  ]);

  sheet.appendRow([
    new Date(),
    guestName,
    file.getName(),
    mimeType,
    file.getSize(),
    file.getUrl(),
    file.getId()
  ]);

  return jsonResponse_({
    ok: true,
    type: 'guest-upload',
    message: 'File uploaded successfully',
    fileName: file.getName(),
    fileId: file.getId(),
    fileUrl: file.getUrl(),
    folderName: folder.getName(),
    folderUrl: folder.getUrl()
  });
}


/* ============================================================
   DRIVE FOLDER
   ============================================================ */

function getPhotoFolder_() {
  const properties = PropertiesService.getScriptProperties();

  // If setup has already selected a working folder, reuse it.
  const savedFolderId =
    properties.getProperty('ABSON_PHOTO_FOLDER_ID');

  if (savedFolderId) {
    try {
      const savedFolder =
        DriveApp.getFolderById(savedFolderId);

      // Force an access check.
      savedFolder.getName();

      return savedFolder;
    } catch (err) {
      // Saved folder is no longer accessible.
      properties.deleteProperty('ABSON_PHOTO_FOLDER_ID');
    }
  }

  // Try the preferred existing folder.
  if (PREFERRED_PHOTO_FOLDER_ID) {
    try {
      const preferredFolder =
        DriveApp.getFolderById(PREFERRED_PHOTO_FOLDER_ID);

      preferredFolder.getName();

      properties.setProperty(
        'ABSON_PHOTO_FOLDER_ID',
        preferredFolder.getId()
      );

      return preferredFolder;

    } catch (err) {
      console.warn(
        'Preferred Drive folder is not accessible. ' +
        'Creating a new #ABSON folder. ' +
        String(err)
      );
    }
  }

  // Fallback: create the folder in the Drive of the account
  // executing this Apps Script.
  const newFolder =
    DriveApp.createFolder(FALLBACK_FOLDER_NAME);

  properties.setProperty(
    'ABSON_PHOTO_FOLDER_ID',
    newFolder.getId()
  );

  return newFolder;
}


/* ============================================================
   DRIVE TEST
   ============================================================ */

function testDriveUpload() {
  const folder = getPhotoFolder_();

  const fileName =
    'ABSON-TEST-' +
    Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      'yyyyMMdd-HHmmss'
    ) +
    '.txt';

  const blob = Utilities.newBlob(
    'This is a #ABSON Drive test file.\n' +
    'Created by the wedding website Apps Script.',
    'text/plain',
    fileName
  );

  const file = folder.createFile(blob);

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = getOrCreateSheet_(ss, TEST_SHEET);

  ensureHeader_(sheet, [
    'Timestamp',
    'Test',
    'Status',
    'Details'
  ]);

  sheet.appendRow([
    new Date(),
    'Drive upload',
    'SUCCESS',
    file.getName() + ' | ' + file.getUrl()
  ]);

  console.log('Drive folder: ' + folder.getUrl());
  console.log('Test file: ' + file.getUrl());

  return {
    success: true,
    folderName: folder.getName(),
    folderUrl: folder.getUrl(),
    fileName: file.getName(),
    fileUrl: file.getUrl(),
    fileId: file.getId()
  };
}


/* ============================================================
   CHECK CONFIGURATION
   ============================================================ */

function checkConfiguration() {
  const result = {
    spreadsheetId: SPREADSHEET_ID,
    spreadsheet: null,
    driveFolder: null,
    errors: []
  };

  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    result.spreadsheet = ss.getName();
  } catch (err) {
    result.errors.push(
      'Spreadsheet access failed: ' + String(err)
    );
  }

  try {
    const folder = getPhotoFolder_();

    result.driveFolder = {
      id: folder.getId(),
      name: folder.getName(),
      url: folder.getUrl()
    };
  } catch (err) {
    result.errors.push(
      'Drive access failed: ' + String(err)
    );
  }

  console.log(JSON.stringify(result, null, 2));

  return result;
}


/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

function getOrCreateSheet_(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  return sheet;
}


function ensureHeader_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers]);

    sheet.setFrozenRows(1);

    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold');

    sheet.autoResizeColumns(
      1,
      headers.length
    );

    return;
  }

  // If the sheet exists but is empty-looking or has old headers,
  // do not destroy existing data. Only add headers when there
  // is genuinely no first-row content.
  const firstRow =
    sheet.getRange(
      1,
      1,
      1,
      headers.length
    ).getValues()[0];

  const hasAnyHeader =
    firstRow.some(function(value) {
      return String(value || '').trim() !== '';
    });

  if (!hasAnyHeader) {
    sheet.getRange(1, 1, 1, headers.length)
      .setValues([headers]);

    sheet.setFrozenRows(1);

    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold');
  }
}


function cleanValue_(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value).trim();
}


function sanitizeFileName_(name) {
  let clean = name
    .replace(/[\\\/:*?"<>|#%{}]/g, '_')
    .trim();

  if (!clean) {
    clean = 'ABSON-Guest-Upload';
  }

  // Avoid excessively long Drive file names.
  if (clean.length > 180) {
    clean = clean.substring(0, 180);
  }

  return clean;
}


function jsonResponse_(data) {
  return ContentService
    .createTextOutput(
      JSON.stringify(data)
    )
    .setMimeType(
      ContentService.MimeType.JSON
    );
}
