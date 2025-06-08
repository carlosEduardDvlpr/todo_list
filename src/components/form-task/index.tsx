'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  titulo: z
    .string()
    .max(20, 'Máximo 20 caracteres!')
    .min(5, 'Mínimo 5 caracteres!')
    .nonempty(),
  descricao: z
    .string()
    .max(50, 'Máximo 50 caracteres!')
    .min(10, 'Mínimo 10 caracteres!')
    .nonempty(),
});

export const FormTask = ({
  onCreateTask,
}: {
  onCreateTask: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => Promise<void>;
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await onCreateTask({ title: data.titulo, description: data.descricao });
    reset();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label className="mb-1.5" htmlFor="titulo">
          Título
        </Label>
        <Input required maxLength={20} id="titulo" {...register('titulo')} />
        {errors.titulo && (
          <span className="mt-3 text-red-600 text-sm font-medium">
            {errors.titulo.message}
          </span>
        )}
      </div>
      <div>
        <Label className="mb-1.5" htmlFor="descricao">
          Descrição
        </Label>
        <Input
          required
          maxLength={50}
          id="descricao"
          {...register('descricao')}
        />
        {errors.descricao && (
          <span className="mt-3 text-red-600 text-sm font-medium">
            {errors.descricao.message}
          </span>
        )}
      </div>
      <Button type="submit">Adicionar tarefa</Button>
    </form>
  );
};
