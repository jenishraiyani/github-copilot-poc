import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, shareReplay, tap, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl: string = `${environment.apiBaseUrl}/users`;
  private readonly userCache: Map<string, Observable<User>> = new Map<string, Observable<User>>();

  constructor(private readonly http: HttpClient) {}

  getUserById(id: string, forceRefresh: boolean = false): Observable<User> {
    if (!forceRefresh) {
      const cachedRequest: Observable<User> | undefined = this.userCache.get(id);

      if (cachedRequest) {
        return cachedRequest;
      }
    }

    const request$: Observable<User> = this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
      catchError((error: unknown) => {
        this.userCache.delete(id);
        return throwError(() => error);
      }),
    );

    this.userCache.set(id, request$);
    return request$;
  }

  getCurrentUser(forceRefresh: boolean = false): Observable<User> {
    return this.getUserById('me', forceRefresh);
  }

  updateUser(id: string, changes: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, changes).pipe(
      tap((user: User) => {
        this.userCache.set(
          id,
          of(user).pipe(shareReplay({ bufferSize: 1, refCount: false })),
        );
      }),
    );
  }

  clearCache(id?: string): void {
    if (id) {
      this.userCache.delete(id);
      return;
    }

    this.userCache.clear();
  }
}
