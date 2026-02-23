// QueenLine Studios – Google Apps Script
// Paste this ENTIRE script in Extensions → Apps Script
// Then Deploy → New Deployment → Web App → Anyone

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Handle both JSON and URL-encoded form data
    let data = {};

    if (e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else {
      // URL-encoded: parse e.parameter directly
      data = e.parameter;
    }

    // Append a new row to the sheet
    sheet.appendRow([
      data.name          || "",
      data.phone         || "",
      data.email         || "",
      data.city          || "",
      data.address       || "",
      data.service       || "",
      data.occasion      || "",
      data.fabric        || "",
      data.budget        || "",
      data.style         || "",
      data.bust          || "",
      data.waist         || "",
      data.hips          || "",
      data.shoulder      || "",
      data.sleeve        || "",
      data.back_length   || "",
      data.dress_length  || "",
      data.neck          || "",
      data.height        || "",
      data.notes         || "",
      new Date().toLocaleString()
    ]);

    // Send email notification
    MailApp.sendEmail({
      to: "your@email.com",   // 👈 Replace with your real email
      subject: "🌸 New Order – " + (data.name || "Unknown"),
      body:
`New order received on QueenLine Studios!

──────────────────────────────
PERSONAL INFORMATION
──────────────────────────────
Name:     ${data.name}
Phone:    ${data.phone}
Email:    ${data.email}
City:     ${data.city}
Address:  ${data.address}

──────────────────────────────
ORDER DETAILS
──────────────────────────────
Service:  ${data.service}
Occasion: ${data.occasion}
Fabric:   ${data.fabric}
Budget:   ${data.budget}
Style:    ${data.style}

──────────────────────────────
MEASUREMENTS (cm)
──────────────────────────────
Bust:         ${data.bust} cm
Waist:        ${data.waist} cm
Hips:         ${data.hips} cm
Shoulder:     ${data.shoulder} cm
Sleeve:       ${data.sleeve} cm
Back Length:  ${data.back_length} cm
Dress Length: ${data.dress_length} cm
Neck:         ${data.neck} cm
Height:       ${data.height} cm

──────────────────────────────
NOTES
──────────────────────────────
${data.notes}

Submitted: ${new Date().toLocaleString()}
`
    });

    // Return success (readable only if not no-cors)
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: lets you test the script is live by visiting the URL in a browser
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "QueenLine script is live ✅" }))
    .setMimeType(ContentService.MimeType.JSON);
}
