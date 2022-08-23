/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PetrolStationCreateDto } from '../models/petrol-station-create-dto';
import { PetrolStationViewDto } from '../models/petrol-station-view-dto';
import { PetrolStationWithStatusesViewDto } from '../models/petrol-station-with-statuses-view-dto';

@Injectable({
  providedIn: 'root',
})
export class PetrolStationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiPetrolStationGetPetrolStationsGet
   */
  static readonly ApiPetrolStationGetPetrolStationsGetPath = '/api/PetrolStation/GetPetrolStations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPetrolStationGetPetrolStationsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPetrolStationGetPetrolStationsGet$Response(params?: {
  }): Observable<StrictHttpResponse<Array<PetrolStationWithStatusesViewDto>>> {

    const rb = new RequestBuilder(this.rootUrl, PetrolStationService.ApiPetrolStationGetPetrolStationsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PetrolStationWithStatusesViewDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPetrolStationGetPetrolStationsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiPetrolStationGetPetrolStationsGet(params?: {
  }): Observable<Array<PetrolStationWithStatusesViewDto>> {

    return this.apiPetrolStationGetPetrolStationsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PetrolStationWithStatusesViewDto>>) => r.body as Array<PetrolStationWithStatusesViewDto>)
    );
  }

  /**
   * Path part for operation apiPetrolStationCreatePetrolStationPost
   */
  static readonly ApiPetrolStationCreatePetrolStationPostPath = '/api/PetrolStation/CreatePetrolStation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPetrolStationCreatePetrolStationPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiPetrolStationCreatePetrolStationPost$Response(params?: {
    body?: PetrolStationCreateDto
  }): Observable<StrictHttpResponse<PetrolStationViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, PetrolStationService.ApiPetrolStationCreatePetrolStationPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PetrolStationViewDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPetrolStationCreatePetrolStationPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiPetrolStationCreatePetrolStationPost(params?: {
    body?: PetrolStationCreateDto
  }): Observable<PetrolStationViewDto> {

    return this.apiPetrolStationCreatePetrolStationPost$Response(params).pipe(
      map((r: StrictHttpResponse<PetrolStationViewDto>) => r.body as PetrolStationViewDto)
    );
  }

  /**
   * Path part for operation apiPetrolStationPetrolStationIdPut
   */
  static readonly ApiPetrolStationPetrolStationIdPutPath = '/api/PetrolStation/{petrolStationId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiPetrolStationPetrolStationIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiPetrolStationPetrolStationIdPut$Response(params: {
    petrolStationId: number;
    body?: PetrolStationViewDto
  }): Observable<StrictHttpResponse<PetrolStationViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, PetrolStationService.ApiPetrolStationPetrolStationIdPutPath, 'put');
    if (params) {
      rb.path('petrolStationId', params.petrolStationId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PetrolStationViewDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiPetrolStationPetrolStationIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiPetrolStationPetrolStationIdPut(params: {
    petrolStationId: number;
    body?: PetrolStationViewDto
  }): Observable<PetrolStationViewDto> {

    return this.apiPetrolStationPetrolStationIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<PetrolStationViewDto>) => r.body as PetrolStationViewDto)
    );
  }

}
