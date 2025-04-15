import { useSelector } from "react-redux";
import { AppState } from "../store";

export function useAppStateSelector<TSelected>(
  selector: (state: AppState) => TSelected
): TSelected {
  return useSelector<AppState, TSelected>(selector);
}
