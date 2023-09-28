document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the "View trip" button
    const viewTripButton = document.querySelector("#viewSaved");
    if (viewTripButton) {
        viewTripButton.addEventListener("click", displaySavedTripDetails);
    }
});

function displaySavedTripDetails() {
    // Retrieve the saved trip details from localStorage
    const savedTrip = JSON.parse(localStorage.getItem("currentTrip"));

    if (savedTrip) {
        // Populate the modal with the saved trip details
        const modalTitle = document.getElementById("staticBackdropLabel");
        const modalBody = document.querySelector(".modal-body");

        modalTitle.textContent = savedTrip.city || "Unknown City"; // Replace with the saved city name
        modalBody.textContent = savedTrip.details || "No details available"; // Replace with the saved trip details
    } else {
        console.log("No saved trip found.");
    }
}
