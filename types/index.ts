export type Nullable<T> = T | null

export type MenuItem = {
  key: string
  title: string
  order: number
  path: string
  url: string
  parentId: Nullable<string>
  children: MenuItem[]
}

export enum MenuLocationEnum {
  PRIMARY = 'PRIMARY',
  FOOTER = 'FOOTER',
  SOCIAL = 'SOCIAL',
}

export interface PostModel {
  title: string
  description: string
  postedAt: Date
}

export interface SnippetModel extends PostModel {
  language: string;
}

export interface Post extends PostModel {
  slug: string
}

export interface Snippet extends SnippetModel {
  slug: string;
}
