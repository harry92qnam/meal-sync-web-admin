import { Button, Card, Skeleton, Spacer } from '@nextui-org/react';
import apiClient from '@/services/api-services/api-client';
import React, { ChangeEvent, useState } from 'react';
import APICommonResponse from '@/types/responses/APICommonResponse';
import imageCompression from 'browser-image-compression';
interface ImageUploaderResponse extends APICommonResponse {
  value: {
    url: string;
  };
}

const UNAVAILABLE_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmLmh7aQYs6uH6OgqySO76DH5CVwRowkSXVFz4muN64UgjnVCRy-YU8gqe31BNwroU84&usqp=CAU';
const NO_IMAGE_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmLmh7aQYs6uH6OgqySO76DH5CVwRowkSXVFz4muN64UgjnVCRy-YU8gqe31BNwroU84&usqp=CAU';
const UPLOAD_IMAGE_FAIL_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutCAi6Zmu2u4Id0FZg7Mxh6IlEAs0b4VkMT2CUJGLQ4uzKEt6Fipk8PBuo0oWvBmG3y0&usqp=CAU';

const getURLImageFromFile = (file: File | null) => {
  return file == null ? UNAVAILABLE_IMAGE_URL : URL.createObjectURL(file);
};

const uploadImageAsync = async (uploadServiceEndpoint: string, image: File) => {
  const formData = new FormData();
  formData.append('file', image);
  let res = UNAVAILABLE_IMAGE_URL;
  try {
    const response = await apiClient.put<ImageUploaderResponse>(uploadServiceEndpoint, formData);
    res = response.data.value.url;
  } catch (err) {
    console.error('Upload failed', err);
    res = NO_IMAGE_URL;
  }
  return res;
};

interface Props {
  uploadServiceEndpoint: string;
  imageURL: string;
  setImageURL: (url: string) => void;
  isEnableUpload: boolean;
}

const ImageUpload = ({
  uploadServiceEndpoint,
  imageURL,
  setImageURL,
  isEnableUpload = true,
}: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePreviewImage = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('Uploading...');
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      console.log('Selected file:', selectedFile);

      // Set the selected image as the current one
      setImage(selectedFile);
      setImageURL(getURLImageFromFile(selectedFile));

      setLoading(true);
      try {
        // Compress the image if it's greater than 5MB
        let compressedFile = selectedFile;
        if (selectedFile.size > 5 * 1024 * 1024) {
          // 5MB in bytes
          const options = {
            maxSizeMB: 5, // Max size in MB
            useWebWorker: true, // Use web worker for compression
          };

          compressedFile = await imageCompression(selectedFile, options);
          console.log('Compressed file:', compressedFile);
        }

        // Proceed with the compressed or original file
        console.log(
          'compressedFile: ',
          selectedFile.size,
          compressedFile.size / (1024 * 1024) + 'MB',
          compressedFile.size > 5 * 1024 * 1024,
        );
        const urlFromAPI = await uploadImageAsync(uploadServiceEndpoint, compressedFile);
        setImageURL(urlFromAPI);
      } catch (err) {
        console.error('Error uploading image', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-full w-full text-center relative">
      {loading ? (
        <Skeleton>
          <Card className="h-full w-full" />
        </Skeleton>
      ) : (
        <Card
          className="relative h-full w-full"
          style={{
            backgroundImage: `url(${imageURL || UNAVAILABLE_IMAGE_URL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      <Spacer y={1} />
      {isEnableUpload && (
        <Button
          as="label"
          size="sm"
          className="relative cursor-pointer font-medium absolute bottom-0 left-0 text-[10px] px-[21px]"
          style={{ backgroundColor: 'rgba(255, 255, 255, 10)', opacity: 0.5 }}
        >
          <span className="cursor-pointer">Thay đổi</span>
          <input
            type="file"
            onChange={handlePreviewImage}
            accept="image/*"
            className="absolute top-0 left-0 w-full h-full opacity-0"
            aria-hidden="true"
          />
        </Button>
      )}
    </div>
  );
};

export default ImageUpload;
