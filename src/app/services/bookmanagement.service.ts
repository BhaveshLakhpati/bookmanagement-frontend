import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  constructor(private httpClient: HttpClient) {

  }

  getAvailableBooks(): Observable<any> {
    return this.httpClient.get("http://localhost:8081/book-service/all-books");
  }

  addToCart(isbn: string): Observable<any> {
    let headers: any = {};
    let userId: any = localStorage.getItem("userId");
    if (userId != null) {
      headers['userId'] = userId;
    }

    return this.httpClient.post(`http://localhost:8081/cart-service/add-to-cart/${isbn}`, {}, { headers });
  }
}
