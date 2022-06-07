import fs from 'node:fs';
import { parse } from 'csv-parse';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';

class ImportCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getCategoriesAsyncIterable(
    file: Express.Multer.File
  ): AsyncIterable<string[]> {
    const stream = fs.createReadStream(file.path);
    const parseFile = parse();
    stream.pipe(parseFile);

    const myAsyncIterable = {
      [Symbol.asyncIterator]: async function* () {
        for await (const chunk of parseFile) yield chunk;
      },
    };

    return myAsyncIterable;

    /*
    In order to use for const i of iterable {...}:
    Must be an iterable (iterable {} implements [Symbol.iterator] or [Symbol.asyncIterator] iterator methods)
    An iterator must return a object with next() method, that returns a object with value and done.
    An iterator can be a generator, since a generator has next method
    relevant docs:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
    */

    /*
    return async function* asyncGenerator() {
      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      stream.pipe(parseFile);

      for await (const chunk of parseFile) yield chunk;
    };
    */
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const asyncIterable = this.getCategoriesAsyncIterable(file);
    for await (const [name, description] of asyncIterable) {
      const hasCategory = this.categoriesRepository.findByName(name);
      if (hasCategory) throw new Error('Category Already exists');
      this.categoriesRepository.create({ name, description });
    }
  }
}

export { ImportCategoryService };
