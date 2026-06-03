import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { AuthService, AuthSession, LoginRequest } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach((): void => {
    localStorage.clear();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpController.verify();
    localStorage.clear();
  });

  it('should persist the access token after login', () => {
    // Arrange
    const credentials: LoginRequest = {
      email: 'john@example.com',
      password: 'secret-password',
    };
    const session: AuthSession = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expiresIn: 3600,
      userId: 'user-1',
    };

    // Act
    service.login(credentials).subscribe((result: AuthSession) => {
      // Assert
      expect(result).toEqual(session);
      expect(service.getAccessToken()).toBe('access-token');
      expect(localStorage.getItem(environment.authStorageKey)).toBe('access-token');
    });

    const request = httpController.expectOne('/api/auth/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(credentials);
    request.flush(session);
  });

  it('should refresh the stored token', () => {
    // Arrange
    localStorage.setItem(`${environment.authStorageKey}.refresh`, 'existing-refresh-token');
    const session: AuthSession = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      expiresIn: 3600,
      userId: 'user-1',
    };

    // Act
    service.refreshToken().subscribe((result: AuthSession) => {
      // Assert
      expect(result.accessToken).toBe('new-access-token');
      expect(service.getAccessToken()).toBe('new-access-token');
    });

    const request = httpController.expectOne('/api/auth/refresh');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ refreshToken: 'existing-refresh-token' });
    request.flush(session);
  });

  it('should error when refresh token is missing', () => {
    // Arrange
    let errorMessage: string | undefined;

    // Act
    service.refreshToken().subscribe({
      next: (): void => {
        fail('Expected refreshToken() to fail when no refresh token is stored.');
      },
      error: (error: Error): void => {
        // Assert
        errorMessage = error.message;
      },
    });

    expect(errorMessage).toBe('Refresh token is not available.');
  });

  it('should clear tokens on logout', () => {
    // Arrange
    localStorage.setItem(environment.authStorageKey, 'access-token');
    localStorage.setItem(`${environment.authStorageKey}.refresh`, 'refresh-token');

    // Act
    service.logout();

    // Assert
    expect(service.getAccessToken()).toBeNull();
    expect(localStorage.getItem(environment.authStorageKey)).toBeNull();
    expect(localStorage.getItem(`${environment.authStorageKey}.refresh`)).toBeNull();
  });
});
