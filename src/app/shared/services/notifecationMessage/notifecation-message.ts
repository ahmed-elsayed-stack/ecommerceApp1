import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotifecationMessage {
    constructor(private _messageService: MessageService) {};


  showSuccess(message: string): void {
    this._messageService.add({
      key: 'success',
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  showError(message: string): void {
    this._messageService.add({
      key: 'error',
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  showWarn(message: string): void {
    this._messageService.add({
      key: 'warn',
      severity: 'warn',
      summary: 'Warning',
      detail: message
    });
  }

  showInfo(message: string): void {
    this._messageService.add({
      key: 'info',
      severity: 'info',
      summary: 'Info',
      detail: message
    });
  }
}
