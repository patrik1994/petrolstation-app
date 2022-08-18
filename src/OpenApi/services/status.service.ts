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

import { GetStatusesFilterDto } from '../models/get-statuses-filter-dto';
import { StatusCreateDto } from '../models/status-create-dto';
import { StatusDto } from '../models/status-dto';

@Injectable({
  providedIn: 'root',
})
export class StatusService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation apiStatusCreateStatusPost
   */
  static readonly ApiStatusCreateStatusPostPath = '/api/Status/CreateStatus';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStatusCreateStatusPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiStatusCreateStatusPost$Response(params?: {
    body?: StatusCreateDto
  }): Observable<StrictHttpResponse<StatusDto>> {

    const rb = new RequestBuilder(this.rootUrl, StatusService.ApiStatusCreateStatusPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StatusDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStatusCreateStatusPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiStatusCreateStatusPost(params?: {
    body?: StatusCreateDto
  }): Observable<StatusDto> {

    return this.apiStatusCreateStatusPost$Response(params).pipe(
      map((r: StrictHttpResponse<StatusDto>) => r.body as StatusDto)
    );
  }

  /**
   * Path part for operation apiStatusGetStatusesPost
   */
  static readonly ApiStatusGetStatusesPostPath = '/api/Status/GetStatuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiStatusGetStatusesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiStatusGetStatusesPost$Response(params?: {
    body?: GetStatusesFilterDto
  }): Observable<StrictHttpResponse<Array<StatusDto>>> {

    const rb = new RequestBuilder(this.rootUrl, StatusService.ApiStatusGetStatusesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<StatusDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `apiStatusGetStatusesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  apiStatusGetStatusesPost(params?: {
    body?: GetStatusesFilterDto
  }): Observable<Array<StatusDto>> {

    return this.apiStatusGetStatusesPost$Response(params).pipe(
      map((r: StrictHttpResponse<Array<StatusDto>>) => r.body as Array<StatusDto>)
    );
  }

}
