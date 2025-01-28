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
  uploadedImage: File | null = null;
  segmentedResults: any[] = [];
  segmentedImage: string = '';
  processingTime: number | null = null;

  constructor(private http: HttpClient) {}

  onImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.uploadedImage = target.files[0];
    }
  }

  processImage() {
    if (this.uploadedImage) {
      const formData = new FormData();
      formData.append('image', this.uploadedImage);

      this.http.post<any>('http://localhost:5678/process-image', formData).subscribe(
        (response) => {
          // Convert the hex string back to binary data
          const hex = response.segmented_image;
          const binaryString = hex.match(/.{1,2}/g)?.map((byte: string) => String.fromCharCode(parseInt(byte, 16))).join('');
          const base64String = btoa(binaryString);

          // Set the segmented image to be displayed
          this.segmentedImage = `data:image/jpeg;base64,${base64String}`;
          this.segmentedResults = response.segmented_found;
          this.processingTime = response.processing_time;
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    }
  }

}
