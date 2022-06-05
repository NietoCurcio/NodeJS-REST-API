import { Router } from 'express';
import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecifiationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecifiationService(
    specificationRepository
  );

  createSpecificationService.execute({ name, description });

  return res.status(201).json();
});

specificationsRoutes.get('/', (req, res) => {
  const all = specificationRepository.list();
  return res.json(all);
});

export { specificationsRoutes };
