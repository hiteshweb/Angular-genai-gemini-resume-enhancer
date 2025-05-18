import { Component } from '@angular/core';
import { ResumeService } from './resume.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ResumeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  rawInput = '';
  output = '';
  errorCount: number | null = null;

  constructor(private resumeService: ResumeService) { }

  enhance() {
    this.output = 'Enhancing...';
    this.resumeService.callGemini(`Improve this resume content:
${this.rawInput}`)
      .subscribe((res:any) => this.output = res);
  }

  suggestSkills() {
    this.output = 'Analyzing skills...';
    this.resumeService.callGemini(`Suggest missing but relevant skills based on this resume:
${this.rawInput}`)
      .subscribe((res:any) => this.output = res);
  }

  checkGrammar() {
    this.output = 'Checking grammar...';
    this.resumeService.callGemini(`Count the number of grammatical errors in the following text. Return only the number:
${this.rawInput}`)
      .subscribe((res:any) => {
        this.output = 'Grammar check completed.';
        const count = parseInt(res.trim(), 10);
        this.errorCount = isNaN(count) ? null : count;
      });
  }
}
