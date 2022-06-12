import { ListSpecificationController } from './ListSpecificationController';
import { ListSpecificationsService } from './ListSpecificationsService';
import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';

// Dependency Injection

const specificationRepositorie = SpecificationRepository.getInstance();
const listSpecificationsService = new ListSpecificationsService(
  specificationRepositorie
);
export const listSpecificationController = new ListSpecificationController(
  listSpecificationsService
);
