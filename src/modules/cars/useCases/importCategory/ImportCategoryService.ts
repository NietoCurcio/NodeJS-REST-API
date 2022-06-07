import fs from 'node:fs';
import { parse } from 'csv-parse';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

interface IAsyncIterablePromise {
  done: boolean;
  value: IImportCategory;
}

class ImportCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  getCategoriesAsyncIterable(
    file: Express.Multer.File
  ): AsyncIterable<IImportCategory> {
    const asyncIterable = {
      [Symbol.asyncIterator]: () => {
        const stream = fs.createReadStream(file.path);
        const parseFile = parse();
        stream.pipe(parseFile);

        return {
          next: () =>
            new Promise<IAsyncIterablePromise>((resolve, reject) => {
              parseFile
                .on('data', (line) => {
                  const [name, description] = line;
                  const value = { name, description };
                  resolve({ value, done: false });
                })
                .on('end', () => {
                  resolve({ value: undefined, done: true });
                })
                .on('error', (err) => {
                  reject({
                    value: { error: err },
                    done: true,
                  });
                });
            }),
        };
      },
    };

    return asyncIterable;
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const asyncIterable = this.getCategoriesAsyncIterable(file);
    for await (const category of asyncIterable) {
      console.log(category);
    }
  }
}

export { ImportCategoryService };
