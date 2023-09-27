// Function to save a trip to localStorage
function saveTrip() {
    const tripName = document.getElementById('trip-name').value;
    const tripDestination = document.getElementById('trip-destination').value;
    const tripDate = document.getElementById('trip-date').value;

    const trip = {
        name: tripName,
        destination: tripDestination,
        date: tripDate
    };

    // Check if trips array already exists in localStorage
    let trips = JSON.parse(localStorage.getItem('trips')) || [];

    // Add the new trip to the trips array
    trips.push(trip);

    // Save the updated trips array back to localStorage
    localStorage.setItem('trips', JSON.stringify(trips));
}

// Event listener for the trip form submission
document.getElementById('trip-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    saveTrip();
    alert('Trip saved successfully!');
});
