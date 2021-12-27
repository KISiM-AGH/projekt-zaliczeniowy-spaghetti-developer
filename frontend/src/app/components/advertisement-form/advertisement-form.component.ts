import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services';
import { AdvertisementApiService } from '../../api-services';

interface FileWithGuid {
  file: File;
  guid: String;
}

@Component({
  selector: 'advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.scss'],
})
export class AdvertisementFormComponent implements OnInit {
  public form!: FormGroup;
  public files: FileWithGuid[] = [];
  public guid?: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: AdvertisementApiService
  ) {}

  public async ngOnInit(): Promise<void> {
    const guid = this.activatedRoute.snapshot.params['id'];
    this.guid = guid;
    const advertisement = guid
      ? await this.apiService.getAdvertisement(guid)
      : undefined;
    if (
      advertisement &&
      advertisement?.userGuid !== (await this.userService.getUser())?.guid
    ) {
      this.router.navigate(['/']);
    }
    this.form = this.formBuilder.group({
      title: [
        advertisement?.title ?? '',
        [Validators.required, Validators.maxLength(150)],
      ],
      description: [
        advertisement?.description ?? '',
        [Validators.required, Validators.maxLength(500)],
      ],
      price: [
        advertisement?.price ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      contact: [
        advertisement?.contact ?? '',
        [Validators.required, Validators.maxLength(255)],
      ],
      address: [
        advertisement?.address ?? '',
        [Validators.required, Validators.maxLength(255)],
      ],
    });
  }

  public submit(): void {
    const images = this.files.map((file) => ({
      name: file.file.name,
      guid: file.guid,
    }));
    const data = {
      ...this.form.value,
      guid: this.guid,
      mainImage: images.splice(0, 1)[0],
      images,
    };
    if (this.guid) {
      this.apiService
        .edit(data)
        .then((res) => this.router.navigate([`/advertisement/${res.guid}`]));
    } else {
      this.apiService
        .add(data)
        .then((res) => this.router.navigate([`/advertisement/${res.guid}`]));
    }
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
