import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { carId } = request.params;
    const images = request.files as IFile[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((image) => image.filename);

    const car = await uploadCarImagesUseCase.execute({ carId, images_name });

    return response.json(car);
  }
}

export { UploadCarImagesController };
