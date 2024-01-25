// Fetch and display tours dynamically
document.addEventListener("DOMContentLoaded", function () {
    fetch('/tours')
        .then(response => response.json())
        .then(tours => {
            const tourContainer = document.getElementById('tourContainer');
            tours.forEach(tour => {
                const card = createTourCard(tour);
                tourContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching tours:', error));
});

function createTourCard(tour) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';

    card.innerHTML = `
        <div class="card">
            <img src="https://source.unsplash.com/600x400/?${tour.city.toLowerCase()}" class="card-img-top" alt="Tour Image">
            <div class="card-body">
                <h5 class="card-title">${tour.name}</h5>
                <p class="card-text">Price: $${tour.price}</p>
                <p class="card-text">Duration: ${tour.duration}</p>
                <p class="card-text">Country: ${tour.country}</p>
                <p class="card-text">City: ${tour.city}</p>
                <a href="#" class="btn btn-primary" onclick="viewDetails('${tour.id}')">View Details</a>
            </div>
        </div>
    `;

    return card;
}

function addNewTour() {
    const newTourName = document.getElementById('newTourName').value;
    if (newTourName) {
        alert(`New tour added: ${newTourName}`);
        $('#addTourModal').modal('hide');
    } else {
        alert('Please enter a tour name.');
    }
}

function submitNewTour() {
    const tourName = document.getElementById('tourName').value;
    const tourPrice = document.getElementById('tourPrice').value;
    const tourDuration = document.getElementById('tourDuration').value;
    const tourCountry = document.getElementById('tourCountry').value;
    const tourCity = document.getElementById('tourCity').value;
    const tourDeparture = document.getElementById('tourDeparture').value;

    // Validate that all fields are filled
    if (!tourName || !tourPrice || !tourDuration || !tourCountry || !tourCity || !tourDeparture) {
        alert('Please fill in all fields.');
        return;
    }

    // Perform a POST request to add the new tour
    fetch('/tours', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: tourName,
            price: parseFloat(tourPrice),
            duration: tourDuration,
            country: tourCountry,
            city: tourCity,
            departure: tourDeparture,
        }),
    })
        .then(response => response.json())
        .then(newTour => {
            alert(`New tour added: ${newTour.name}`);
            $('#addTourModal').modal('hide');
            // refresh
            location.reload();
        })
        .catch(error => console.error('Error adding new tour:', error));
}

function viewDetails(tourId) {
    fetch(`/tours/${tourId}`)
        .then(response => response.json())
        .then(tour => {
            const modalBody = document.getElementById('tourDetailsContent');
            modalBody.innerHTML = `
                <h5>${tour.name}</h5>
                <p><strong>Price:</strong> $${tour.price}</p>
                <p><strong>Duration:</strong> ${tour.duration}</p>
                <p><strong>Country:</strong> ${tour.country}</p>
                <p><strong>City:</strong> ${tour.city}</p>
                <p><strong>Departure Date:</strong> ${tour.departure}</p>
            `;

            // Set up the "Update" and "Delete" buttons
            const updateButton = document.querySelector('#viewDetailsModal .btn-primary');
            updateButton.addEventListener('click', function () {
                updateTour(tour.id);
            });

            const deleteButton = document.querySelector('#viewDetailsModal .btn-danger');
            deleteButton.addEventListener('click', function () {
                deleteTour(tour.id);
            });

            $('#viewDetailsModal').modal('show');
        })
        .catch(error => console.error('Error fetching tour details:', error));
}

function viewDetails(tourId) {
    fetch(`/tours/${tourId}`)
        .then(response => response.json())
        .then(tour => {
            const modalBody = document.getElementById('tourDetailsContent');
            modalBody.innerHTML = `
                <h5>${tour.name}</h5>
                <p><strong>Price:</strong> $${tour.price}</p>
                <p><strong>Duration:</strong> ${tour.duration}</p>
                <p><strong>Country:</strong> ${tour.country}</p>
                <p><strong>City:</strong> ${tour.city}</p>
                <p><strong>Departure Date:</strong> ${tour.departure}</p>
                <input type="hidden" value="${tour.id}">
                
                <!-- Weather data -->
                <div id="weatherData"></div>
            `;

            // Fetch weather data using OpenWeatherMap API
            fetchWeatherData(tour.city);

            // Set up the "Update" and "Delete" buttons
            const updateButton = document.querySelector('#viewDetailsModal .btn-primary');
            updateButton.addEventListener('click', function () {
                openUpdateModal(tour);
            });

            const deleteButton = document.querySelector('#viewDetailsModal .btn-danger');
            deleteButton.addEventListener('click', function () {
                deleteTour(tour.id);
            });

            $('#viewDetailsModal').modal('show');
        })
        .catch(error => console.error('Error fetching tour details:', error));
}

function fetchWeatherData(city) {
    const apiKey = '6bf22a58cd95987ddc65de2e9713235b';

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData => {
            const weatherContainer = document.getElementById('weatherData');

            if (weatherData.main && weatherData.weather && weatherData.weather.length > 0) {
                const temperature = (weatherData.main.temp - 273.15).toFixed(2); // Convert to Celsius
                const description = weatherData.weather[0].description;

                weatherContainer.innerHTML = `
                    <p><strong>Weather:</strong> ${description}</p>
                    <p><strong>Temperature:</strong> ${temperature} &#8451;</p>
                `;
            } else {
                weatherContainer.innerHTML = '<p>Weather data not available</p>';
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function openUpdateModal(tour) {
    document.getElementById('updateTourName').value = tour.name;
    document.getElementById('updateTourPrice').value = tour.price;
    document.getElementById('updateTourDuration').value = tour.duration;
    document.getElementById('updateTourCountry').value = tour.country;
    document.getElementById('updateTourCity').value = tour.city;
    document.getElementById('updateTourDeparture').value = tour.departure;
    document.getElementById('updateTourId').value = tour.id;

    $('#updateTourModal').modal('show');
}

function submitUpdatedTour() {
    const updatedTour = {
        name: document.getElementById('updateTourName').value,
        price: parseFloat(document.getElementById('updateTourPrice').value),
        duration: document.getElementById('updateTourDuration').value,
        country: document.getElementById('updateTourCountry').value,
        city: document.getElementById('updateTourCity').value,
        departure: document.getElementById('updateTourDeparture').value,
    };

    const tourId = document.getElementById('updateTourId').value;

    fetch(`/tours/${tourId}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTour),
    })
        .then(response => response.json())
        .then(updatedTour => {
            console.log('Tour updated:', updatedTour);
            $('#updateTourModal').modal('hide');
            // refresh
            location.reload();
        })
        .catch(error => console.error('Error updating tour:', error));
}

function deleteTour(tourId) {
    const tourIdToDelete = document.querySelector('#viewDetailsModal input[type="hidden"]').value;

    // Perform a DELETE request to delete the tour
    fetch(`/tours/${tourIdToDelete}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log('Tour deleted successfully');
                alert('Tour deleted successfully');
                $('#viewDetailsModal').modal('hide');
                // refresh
                location.reload();
            } else {
                console.error('Error deleting tour:', response.status);
                alert('Error deleting tour. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error deleting tour:', error);
            alert('Error deleting tour. Please try again.');
        });
}