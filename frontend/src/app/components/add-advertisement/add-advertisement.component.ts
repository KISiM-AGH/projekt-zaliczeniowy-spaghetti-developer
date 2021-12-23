import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementApiService } from '../../api-services';

interface FileWithGuid {
  file: File;
  guid: String;
}

@Component({
  selector: 'add-advertisement',
  templateUrl: './add-advertisement.component.html',
  styleUrls: ['./add-advertisement.component.scss'],
})
export class AddAdvertisementComponent {
  public form: FormGroup;
  public files: FileWithGuid[] = [];

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private apiService: AdvertisementApiService
  ) {
    this.form = formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0)]],
      contact: ['', [Validators.required, Validators.maxLength(255)]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  public submit(): void {
    const images = this.files.map((file) => ({
      name: file.file.name,
      guid: file.guid,
    }));
    const data = {
      ...this.form.value,
      mainImage: images.splice(0, 1)[0],
      images,
    };
    this.apiService
      .add(data)
      .then((res) => this.router.navigate([`/advertisement/${res.guid}`]));
  }

  public drop(event: CdkDragDrop<FileWithGuid[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  public async onFileSelected(event: Event): Promise<void> {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files ? element.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('thumbnails', file);
      const { guid } = await this.apiService.uploadFile(formData);

      this.files.push({ file, guid: guid });
    }
  }
}
