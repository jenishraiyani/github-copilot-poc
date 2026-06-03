import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { User } from '../models/user.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach((): void => {
    httpController.verify();
  });

  it('should fetch a user by id', () => {
    // Arrange
    const mockUser: User = {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
    };

    // Act
    service.getUserById('1').subscribe((user: User) => {
      // Assert
      expect(user).toEqual(mockUser);
    });

    const request = httpController.expectOne('/api/users/1');
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  });

  it('should reuse the cached response for repeated requests', () => {
    // Arrange
    const mockUser: User = {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
    };
    const firstRequest$ = service.getUserById('1');
    const secondRequest$ = service.getUserById('1');

    // Act
    firstRequest$.subscribe((user: User) => {
      expect(user.id).toBe('1');
    });
    secondRequest$.subscribe((user: User) => {
      expect(user.name).toBe('Jane Doe');
    });

    // Assert
    const request = httpController.expectOne('/api/users/1');
    expect(request.request.method).toBe('GET');
    request.flush(mockUser);
  });

  it('should bypass the cache when forceRefresh is true', () => {
    // Arrange
    const initialUser: User = {
      id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'admin',
    };
    const refreshedUser: User = {
      ...initialUser,
      name: 'Jane Smith',
    };

    service.getUserById('1').subscribe();
    httpController.expectOne('/api/users/1').flush(initialUser);

    // Act
    service.getUserById('1', true).subscribe((user: User) => {
      // Assert
      expect(user.name).toBe('Jane Smith');
    });

    const refreshRequest = httpController.expectOne('/api/users/1');
    expect(refreshRequest.request.method).toBe('GET');
    refreshRequest.flush(refreshedUser);
  });
});
