declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg" {
  const img: any;
  export = img;
}
