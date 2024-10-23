import { TypedUseSelectorHook, useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { AppDispatch, AppState } from './store';

export type UseSelectorHookType = TypedUseSelectorHook<AppState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: UseSelectorHookType = useReduxSelector;
