import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services';
import { AdvertisementApiService } from '../../api-services';
import { AdvertisementData } from '../../dtos';

@Component({
  selector: 'component',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  public advertisement?: AdvertisementData;
  public images: String[] = [];
  public canEdit = false;
  public canDelete = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private apiService: AdvertisementApiService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.canDelete = !!(await this.userService.getUser())?.isAdmin;
    const guid = this.activatedRoute.snapshot.paramMap.get('id');
    if (guid) {
      this.advertisement = await this.apiService.getAdvertisement(guid);
      this.images = this.advertisement.images;
      this.canEdit =
        this.advertisement.userGuid ===
        (await this.userService.getUser())?.guid;
      this.canDelete = this.canDelete || this.canEdit;
    }
  }

  public edit(): void {}

  public delete(): void {
    if (this.advertisement) {
      this.apiService.delete(this.advertisement.guid).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
