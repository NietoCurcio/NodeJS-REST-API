import 'reflect-metadata';
import { container, injectable, inject } from 'tsyringe';

interface IDale {
  getName: () => void;
}

class Dale implements IDale {
  private dale: string;

  constructor() {
    this.dale = 'dale';
  }

  getName() {
    console.log('dentro da implemntacao ' + this.dale);
  }
}

@injectable()
class Foo {
  constructor(@inject('Dale') private dale: IDale) {}

  getDale() {
    this.dale.getName();
  }
}

@injectable()
class Bar {
  constructor(@inject('Foo') private foo: Foo) {}

  getFoo() {
    this.foo.getDale();
  }
}

container.register<IDale>('Dale', Dale);
container.register<Foo>('Foo', Foo);

const bar = container.resolve(Bar);
bar.getFoo();
