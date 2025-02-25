export class DefinedError extends Error {
  title: string;
  description: string;
  constructor({ description, title }: { description: string; title: string }) {
    super(description);
    this.name = this.name;
    this.message = this.message;
    this.title = title;
    this.description = description;
  }
  static convert(e: Error | unknown) {
    if (e instanceof DefinedError) {
      return e;
    }
    if (e instanceof Error) {
      return new DefinedError({
        description: e.message,
        title: e.name,
      });
    }
    return new DefinedError({
      description: 'An error occurred',
      title: 'An error occurred',
    });
  }
}
