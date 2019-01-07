import { TestBed, inject } from '@angular/core/testing';

import { SocketIoappService } from './socket-ioapp.service';

describe('SocketIoappService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketIoappService]
    });
  });

  it('should be created', inject([SocketIoappService], (service: SocketIoappService) => {
    expect(service).toBeTruthy();
  }));
});
