// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  interface Locals {
    token: string;
    user: Record<string, unknown> | null;
  }
  type Session = Locals;
  // interface PageData {}
  // interface Error {}
  // interface Platform {}
}
