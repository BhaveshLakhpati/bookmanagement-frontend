import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookServiceService } from '../services/bookmanagement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  availableBooks: Array<BookResponseDTO>;

  constructor(private bookService: BookServiceService,
    private snackBarService: MatSnackBar) {
    this.availableBooks = [];
  }

  ngOnInit(): void {
    this.bookService.getAvailableBooks().subscribe({
      next: (response: Array<BookResponseDTO>) => { this.availableBooks = response },
      error: (error) => { console.error(error); },
      complete: () => { console.log('Completed.'); }
    });
  }

  addToCart(isbn: string): void {
    this.bookService.addToCart(isbn).subscribe({
      next: (response) => { this.snackBarService.open('Added to cart', '', { duration: 3000 }) },
      error: (error) => { this.snackBarService.open("Couldn't add to cart", '', { duration: 3000 }) }
    });
  }
}

export class BookResponseDTO {
  id: Number;
  title: string;
  isbn: string;
  price: Number;
  quantity: Number;
  imageURL: string;

  constructor(id: Number,
    title: string,
    isbn: string,
    price: Number,
    quantity: Number,
    imageURL: string) {
    this.id = id;
    this.title = title;
    this.isbn = isbn;
    this.price = price;
    this.quantity = quantity;
    this.imageURL = imageURL;
  }
}
