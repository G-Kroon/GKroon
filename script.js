// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

//CONTACT FORM JAVASCRIPT CODE//
// Initialize EmailJS
emailjs.init("your_public_key"); // Replace with your EmailJS public key

// Handle Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect Form Data
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Send Email using EmailJS
    emailjs.send("your_service_id", "your_template_id", {
        name: name,
        country: country,
        email: email,
        message: message,
    })
    .then(() => {
        document.getElementById("status").innerText = "Message sent successfully!";
        document.getElementById("contactForm").reset();
    })
    .catch((error) => {
        document.getElementById("status").innerText = "Failed to send message. Please try again.";
        console.error("EmailJS Error: ", error);
    });
});
            //END OF CONTACT FORM JAVASCRIPT CODE//

