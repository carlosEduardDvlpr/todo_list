'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';

interface TaskProps {
  id: number;
  description: string | null;
  finished: boolean | null;
  title: string | null;
}

interface CardProps {
  task: TaskProps;
  onDeleteTask: (id: number) => Promise<void>;
  onFinishedTask: ({
    id,
    status,
  }: {
    id: number;
    status: boolean;
  }) => Promise<void>;
}

export const CardTask = ({ task, onDeleteTask, onFinishedTask }: CardProps) => {
  const handleDeleteTask = () => {
    onDeleteTask(task.id);
    toast.success('Tarefa deletada!');
  };

  const handleFinishedTask = () => {
    onFinishedTask({ id: task.id, status: task.finished! });
    toast.success(
      `Tarefa marcada como ${task.finished ? 'pendente!' : 'finalizada!'}`,
    );
  };

  return (
    <Card>
      <CardContent className="px-3 gap-3 flex justify-between items-center">
        <Checkbox checked={task.finished!} onClick={handleFinishedTask} />
        <CardHeader className="flex-1">
          <CardTitle className={task.finished ? 'line-through' : ''}>
            {task.title}
          </CardTitle>
          <CardDescription className={task.finished ? 'line-through' : ''}>
            {task.description}
          </CardDescription>
        </CardHeader>
        <Button size="icon" onClick={handleDeleteTask}>
          <Trash2 />
        </Button>
      </CardContent>
    </Card>
  );
};
