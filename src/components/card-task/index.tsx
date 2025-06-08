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

interface TaskProps {
  id: number;
  description: string | null;
  finished: boolean | null;
  title: string | null;
}

export const CardTask = ({
  task,
  onDeleteTask,
  onFinishedTask,
}: {
  task: TaskProps;
  onDeleteTask: (id: number) => Promise<void>;
  onFinishedTask: ({
    id,
    status,
  }: {
    id: number;
    status: boolean;
  }) => Promise<void>;
}) => {
  return (
    <Card>
      <CardContent className="px-3 gap-3 flex justify-between items-center">
        <Checkbox
          checked={task.finished!}
          onClick={() =>
            onFinishedTask({
              id: task.id,
              status: task.finished!,
            })
          }
        />
        <CardHeader className="flex-1">
          <CardTitle className={task.finished ? 'line-through' : ''}>
            {task.title}
          </CardTitle>
          <CardDescription className={task.finished ? 'line-through' : ''}>
            {task.description}
          </CardDescription>
        </CardHeader>
        <Button size="icon" onClick={async () => onDeleteTask(task.id)}>
          <Trash2 />
        </Button>
      </CardContent>
    </Card>
  );
};
