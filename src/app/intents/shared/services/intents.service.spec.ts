import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Intent } from '../domain/intent';
import { IntentsService } from './intents.service';

const BASE_URL = '/api/intents';
const MOCK_DATA: Intent[] = [
  {
    id: 1,
    formulations: ['Se coucher'],
    answer: 'Answer 1'
  }, {
    id: 2,
    formulations: ['Horaires'],
    answer: 'Answer 2'
  }
];

describe('IntentsService', () => {
  let injector: TestBed;
  let service: IntentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule, HttpClientModule, HttpClientTestingModule
      ],
      providers: [IntentsService]
    });

    injector = getTestBed();
    service = injector.get(IntentsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([IntentsService], (svg: IntentsService) => {
    expect(svg).toBeTruthy();
  }));

  it('should get list of all intents', async(() => {
    service
      .findAll()
      .subscribe((data: Intent[]) => {
        expect(data.length).toBe(2);
        expect(data[0]).toBe(MOCK_DATA[0]);
        expect(data[1]).toBe(MOCK_DATA[1]);
      });

    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  }));

  it('should get intent by id', async(() => {
    const id = 1;
    service
      .findById(id)
      .subscribe((response: Intent) => {
        expect(response).toBe(MOCK_DATA[0]);
      });

    const req = httpMock.expectOne(`${BASE_URL}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA[0]);
  }));

  it('should insert new Intent', async(() => {
    const data = {
      id: 3,
      formulations: ['My new Answer'],
      answer: 'Answer 3'
    };
    service
      .insert(data)
      .subscribe((successResult) => {
        expect(successResult).toBe(data);
      });

    const req: TestRequest = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    req.flush(data);
  }));
});
