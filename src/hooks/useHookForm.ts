import { useEffect } from 'react';
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormReturn,
  UseFormProps as UseHookFormProps,
  useForm as useReactHookForm,
} from 'react-hook-form';
export { FormProvider as HookFormProvider } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/ban-types
export type UseFormProps<
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
> = {
  onValuesChange?: (values: TVariables) => void;
} & UseHookFormProps<TVariables, TContext>;

export type UseFormReturnType<
  TVariables extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TContext extends object = {},
> = UseFormReturn<TVariables, TContext>;
// eslint-disable-next-line @typescript-eslint/ban-types
export const useHookForm = <
  TVariables extends FieldValues = FieldValues,
  TContext extends object = {},
>({
  onValuesChange,
  ...rest
}: UseFormProps<TVariables, TContext> = {}): UseFormReturnType<
  TVariables,
  TContext
> => {
  const useHookFormResult = useReactHookForm<TVariables, TContext>({
    ...rest,
  });

  const { watch, handleSubmit: handleSubmitReactHookForm } = useHookFormResult;

  useEffect(() => {
    const subscription = watch((values: any, { type }: { type?: any }) => {
      if (type === 'change') {
        onValuesChange?.(values);
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const handleSubmit: UseFormHandleSubmit<TVariables> =
    (onValid, onInvalid) => async (e) => {
      return handleSubmitReactHookForm(onValid, onInvalid)(e);
    };

  return {
    ...useHookFormResult,
    handleSubmit,
  };
};
