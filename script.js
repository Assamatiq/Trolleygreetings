const canvas = document.getElementById("bannerCanvas");
const ctx = canvas.getContext("2d");

let background = new Image();
let logo = new Image();
logo.src = "logo.png"; // company logo
let currentTemplate = "banner1.jpg";
let selectedBanner = document.querySelector(".banner-thumb.selected");
const largePreview = document.getElementById("largePreview");

// Store names separately
let name1 = "";
let name2 = "";

// Load default banner
loadBackground(currentTemplate);

// Banner selection
function selectBanner(element, template) {
    if(selectedBanner) selectedBanner.classList.remove("selected");
    element.classList.add("selected");
    selectedBanner = element;

    currentTemplate = template;
    largePreview.src = template;
    loadBackground(currentTemplate);
}

// Load banner into canvas
function loadBackground(template) {
    background.src = template;
    background.onload = function () {
        drawCanvas();
    };
}

// Draw banner on canvas
function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw first name if exists
    if(name1){
        ctx.font = "bold 60px 'Times New Roman'";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(name1, canvas.width / 2, 480); // Y position adjustable
        ctx.shadowColor = "transparent";
    }

    // Draw second name if exists
    if(name2){
        ctx.font = "bold 60px 'Times New Roman'";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(name2, canvas.width / 2, 540); // Y position adjustable
        ctx.shadowColor = "transparent";
    }
}

// Generate banner for a specific input
function generateBanner(fieldId) {
    if(fieldId === "username1") {
        name1 = document.getElementById("username1").value;
    } else if(fieldId === "username2") {
        name2 = document.getElementById("username2").value;
    }
    drawCanvas();
    largePreview.src = canvas.toDataURL("image/jpeg", 0.9);
}

// Download JPEG
function downloadBanner() {
    const link = document.createElement('a');
    link.download = "Trolley.jpg";
    link.href = canvas.toDataURL("image/jpeg", 0.9);
    link.click();
}
