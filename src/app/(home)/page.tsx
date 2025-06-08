import { CardTask } from '@/components/card-task';
import { FormTask } from '@/components/form-task';
import { DBControllers } from '../../../controllers';
import { revalidatePath } from 'next/cache';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const { success, tasks } = await DBControllers.getTasks();

  const doTasks = tasks.filter((task) => task.finished);
  const toTasks = tasks.filter((task) => !task.finished);

  async function deleteTask(id: number) {
    'use server';
    await DBControllers.deleteTask(id);
    revalidatePath('/');
  }

  async function createTask({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    'use server';
    await DBControllers.createTask({ title, description });
    revalidatePath('/');
  }

  async function finishedTask({ id, status }: { id: number; status: boolean }) {
    'use server';
    await DBControllers.finishedTask(id, status);
    revalidatePath('/');
  }

  if (!success) {
    return (
      <main className="h-dvh flex justify-center items-center">
        <h1>Erro ao puxar tarefas, recarregue á página!</h1>
      </main>
    );
  }

  return (
    <main className="my-12 flex justify-center">
      <div className="md:min-w-[70%] min-w-[80%] space-y-3">
        <h1 className="text-lg">Adicione suas tarefas:</h1>
        <Separator className="my-4" />
        <FormTask onCreateTask={createTask} />
        <Separator className="my-4" />

        <Tabs defaultValue="to" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="to">Pendente</TabsTrigger>
            <TabsTrigger value="do">Finalizado</TabsTrigger>
          </TabsList>

          <TabsContent value="to">
            {toTasks.map((task) => (
              <CardTask
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onFinishedTask={finishedTask}
              />
            ))}
          </TabsContent>

          <TabsContent value="do">
            {doTasks.map((task) => (
              <CardTask
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onFinishedTask={finishedTask}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
