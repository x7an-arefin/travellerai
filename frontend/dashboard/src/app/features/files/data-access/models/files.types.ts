export interface FileItem {
  id: string
  name: string
  extension: 'pdf' | 'png' | 'zip' | 'mp4' | 'ts'
  size: string
  folder: string
  updatedAt: string
  uploader: string
  url?: string
}

export interface PresignedUploadResponse {
  uploadUrl: string
  objectKey: string
  publicUrl: string
}
