//chat
import { inject, Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthStateService } from '../data-access/auth-state.service';

   export const authInterceptor: HttpInterceptorFn = (
    req:HttpRequest<any>,
    next:HttpHandlerFn
  ) => {
    
    console.log("🔍 INTERCEPTOR - URL:", req.url);
    //const authService = inject(AuthStateService);
    //const token =authService.getSession;
  const token = localStorage.getItem('session');
  console.log("🔐 Token encontrado:", !!token);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);

}