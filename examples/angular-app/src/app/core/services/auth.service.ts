import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userId: string;
}

/**
 * Small auth example that keeps storage isolated so teams can swap in a more
 * secure persistence strategy, such as HttpOnly cookies, in production.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey: string = environment.authStorageKey;
  private readonly refreshStorageKey: string = `${environment.authStorageKey}.refresh`;
  private readonly accessTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(this.readStoredValue(this.storageKey));

  readonly accessToken$: Observable<string | null> = this.accessTokenSubject.asObservable();
  readonly isAuthenticated$: Observable<boolean> = this.accessToken$.pipe(
    map((token: string | null) => token !== null && token.length > 0),
  );

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest): Observable<AuthSession> {
    return this.http
      .post<AuthSession>(`${environment.apiBaseUrl}/auth/login`, credentials)
      .pipe(tap((session: AuthSession) => this.persistSession(session)));
  }

  refreshToken(): Observable<AuthSession> {
    const refreshToken: string | null = this.readStoredValue(this.refreshStorageKey);

    if (!refreshToken) {
      return throwError(() => new Error('Refresh token is not available.'));
    }

    return this.http
      .post<AuthSession>(`${environment.apiBaseUrl}/auth/refresh`, { refreshToken })
      .pipe(tap((session: AuthSession) => this.persistSession(session)));
  }

  logout(): void {
    this.clearStoredValue(this.storageKey);
    this.clearStoredValue(this.refreshStorageKey);
    this.accessTokenSubject.next(null);
  }

  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  private persistSession(session: AuthSession): void {
    this.writeStoredValue(this.storageKey, session.accessToken);
    this.writeStoredValue(this.refreshStorageKey, session.refreshToken);
    this.accessTokenSubject.next(session.accessToken);
  }

  private readStoredValue(key: string): string | null {
    if (typeof localStorage === 'undefined') {
      return null;
    }

    return localStorage.getItem(key);
  }

  private writeStoredValue(key: string, value: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(key, value);
  }

  private clearStoredValue(key: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    localStorage.removeItem(key);
  }
}
