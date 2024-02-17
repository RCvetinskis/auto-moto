import { onStart } from "./actions/schedule-action";

export async function register() {
  await onStart();
}
