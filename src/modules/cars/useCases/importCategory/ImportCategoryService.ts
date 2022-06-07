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
    /*
    Async Iterable MDN src:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

    for await...of, example:

    const promise2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(2), 5000);
    });

    const a = Promise.all([Promise.resolve(1), promise2]);
    console.log(a.then(console.log));

    (async () => {
      for await (const p of [Promise.resolve(1), promise2]) {
        console.log(p);
      }
    })();

    */
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
