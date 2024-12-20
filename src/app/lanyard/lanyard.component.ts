import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lanyard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lanyard.component.html',
  styleUrls: ['./lanyard.component.css'],
})
export class LanyardComponent {
  boundingBoxes: any[] = []; // Store bounding box data
  processingTime: number | null = null;
  selectedBoxes: Set<number> = new Set(); // Keep track of selected boxes

  constructor(private http: HttpClient) {}
  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);


    }
  }

  blurSelectedFaces(): void {
    const selectedCoordinates = Array.from(this.selectedBoxes).map(
      (index) => this.boundingBoxes[index]
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      console.error('No image file available for upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('boxes', JSON.stringify(selectedCoordinates));

    // Send image and selected bounding boxes to the server
    this.http.post('http://localhost:5678/blur-faces', formData, { responseType: 'blob' })
      .subscribe(
        (response) => {
          const url = URL.createObjectURL(response);
          const img = document.createElement('img');
          img.src = url;
          document.body.appendChild(img); // Or replace the existing canvas/image
        },
        (error) => {
          console.error('Error blurring faces:', error);
        }
      );
  }

}
