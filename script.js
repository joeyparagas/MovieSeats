const container = document.querySelector('.container'),
  // Grab ALL seats available (.seat in .row without .occupied)
  seats = document.querySelectorAll('.row .seat:not(.occupied)'),
  count = document.getElementById('count'),
  total = document.getElementById('total'),
  movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;


PopulateUI();

// Update user selected movie and price into local storage
function setMovieData(movie, price) {
  localStorage.setItem('selectedMovieIndex', movie);
  localStorage.setItem('selectedMoviePrice', price);
}

// Update total and count on DOM
function updateSelectedCountAndTotal() {
  // Grab seats that are selected by user
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  // this also does the same since it searches w/in .container only
  // const selectedSeats = container.querySelectorAll('.selected');

  // get number of selected seats
  const selectedSeatsCount = selectedSeats.length;

  // update selected seats and ticket prices on DOM 
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;


  // Copy data from nodelist into an array using spread operator [...]
  // and use .map() to return data 
  const seatsIndex = [...selectedSeats].map((seat) => {
    // Get all values of seats and convert to array
    // use indexOf to find the index value of user selected seat
    return [...seats].indexOf(seat);
  });
  // this is the same as above but shorter since it's only 1 line inside function
  // const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Store seatsIndex into local storage
  // Since it's an array, use JSON.stringify to store data

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

}

// Populate UI with data from local storage
function PopulateUI() {
  // Grab array of selected seats
  // Since data is a string, use JSON.parase to convert back into array
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));


  // Seats: Check to see if local storage is empty
  if (selectedSeats !== null && selectedSeats.length > 0) {
    // Loop through all index of each seat and check against local storage 
    seats.forEach((seat, index) => {
      // If index value exits inside selectedSeats, then add class 'selected'
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  // Movie and Price: Check to see if LS is empty, if not populate
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = selectedMoviePrice;
  }

}


// Update movie ticket price when selected
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCountAndTotal();
})

// Get seats that aren't occupied & make it toggle .selected on click
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')

    updateSelectedCountAndTotal();
  }
})

// Initial count and total upon page load
updateSelectedCountAndTotal();