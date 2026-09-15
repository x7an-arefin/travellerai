import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { ApiConfigService } from '../../../../core/services/api-config.service'
import { FileItem, PresignedUploadResponse } from '../models/files.types'

@Injectable({ providedIn: 'root' })
export class FilesApiService {
  private readonly http = inject(HttpClient)
  private readonly apiConfig = inject(ApiConfigService)
  private readonly mediaUrl = this.apiConfig.buildUrl('api/v1/media/upload-url')

  private mockFiles: FileItem[] = [
    {
      id: 'f-1',
      name: 'Swiss_Alps_Glacier_Itinerary_v3.pdf',
      extension: 'pdf',
      size: '3.4 MB',
      folder: 'Documents',
      updatedAt: '2 hours ago',
      uploader: 'Elena Rostova',
      url: 'https://media.travellerai.com/uploads/docs/swiss_alps_v3.pdf',
    },
    {
      id: 'f-2',
      name: 'Matterhorn_Sunset_Panorama.png',
      extension: 'png',
      size: '8.2 MB',
      folder: 'Images',
      updatedAt: 'Yesterday',
      uploader: 'Sophia Chen',
      url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1200&auto=format&fit=crop&q=80',
    },
    {
      id: 'f-3',
      name: 'Operator_Contract_Signed_2026.pdf',
      extension: 'pdf',
      size: '1.2 MB',
      folder: 'Contracts',
      updatedAt: '3 days ago',
      uploader: 'Alexander Wright',
      url: 'https://media.travellerai.com/uploads/contracts/operator_2026.pdf',
    },
    {
      id: 'f-4',
      name: 'Bali_Villa_Promotion_Reel.mp4',
      extension: 'mp4',
      size: '28.5 MB',
      folder: 'Media',
      updatedAt: 'Sep 10, 2026',
      uploader: 'Amara Okafor',
      url: 'https://media.travellerai.com/uploads/videos/bali_reel.mp4',
    },
    {
      id: 'f-5',
      name: 'Tour_Vouchers_Batch_September.zip',
      extension: 'zip',
      size: '14.8 MB',
      folder: 'Vouchers',
      updatedAt: 'Sep 08, 2026',
      uploader: 'Kenji Takahashi',
      url: 'https://media.travellerai.com/uploads/vouchers/sept_batch.zip',
    },
  ]

  listFiles(): Observable<FileItem[]> {
    return of(this.mockFiles)
  }

  getPresignedUploadUrl(filename: string, mimeType: string): Observable<PresignedUploadResponse> {
    return this.http
      .post<PresignedUploadResponse>(this.mediaUrl, { filename, mimeType })
      .pipe(
        catchError(() => {
          return of({
            uploadUrl: 'https://s3.us-west-002.backblazeb2.com/traveller-media-bucket',
            objectKey: `uploads/simulated/${Date.now()}-${filename}`,
            publicUrl: `https://media.travellerai.com/uploads/${filename}`,
          })
        })
      )
  }

  uploadFile(file: File): Observable<FileItem> {
    const ext = (file.name.split('.').pop()?.toLowerCase() || 'pdf') as 'pdf' | 'png' | 'zip' | 'mp4' | 'ts'
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB'

    const newFileItem: FileItem = {
      id: `f-${Date.now()}`,
      name: file.name,
      extension: ['pdf', 'png', 'zip', 'mp4', 'ts'].includes(ext) ? ext : 'pdf',
      size: sizeMb,
      folder: ext === 'png' ? 'Images' : ext === 'mp4' ? 'Media' : ext === 'zip' ? 'Vouchers' : 'Documents',
      updatedAt: 'Just now',
      uploader: 'Current Operator',
      url: URL.createObjectURL(file),
    }

    return this.getPresignedUploadUrl(file.name, file.type || 'application/octet-stream').pipe(
      map((res) => ({
        ...newFileItem,
        url: res.publicUrl,
      }))
    )
  }
}
