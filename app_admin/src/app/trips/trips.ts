import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.html',
  styleUrls: ['./trips.css']
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripService: TripDataService) {}

  ngOnInit(): void {
    this.getTrips();
  }

  private getTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
        this.message = data.length > 0 ? `There are ${data.length} trips available.` : 'No trips retrieved.';
        console.log(this.message);
      },
      error: (err) => console.error('Error:', err)
    });
  }
}

