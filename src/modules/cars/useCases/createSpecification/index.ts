import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationService } from './CreateSpecificationService';
import { SpecificationRepository } from '../../repositories/SpecificationRepository';

// Dependency Injection

const specificationRepositorie = SpecificationRepository.getInstance();
const createSpecificationService = new CreateSpecificationService(
  specificationRepositorie
);
export const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);
