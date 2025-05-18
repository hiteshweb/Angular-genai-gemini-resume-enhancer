import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiKey = 'AIzaSyDX64GTZNzGZXEUHhBnwv-2TzLbEMNLiRA';
  private url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  callGemini(prompt: string) {
    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };
    return this.http.post<any>(this.url, body).pipe(
      map(res => res?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response')
    );
  }
}
