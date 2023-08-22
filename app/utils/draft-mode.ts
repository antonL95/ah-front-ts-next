import { draftMode } from "next/headers";

export function isDraftModeTrue(): boolean {
  try {
    const {isEnabled} = draftMode()
    return isEnabled;
  } catch (error) {
    return false;
  }
}
