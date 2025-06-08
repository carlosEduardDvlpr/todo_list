import { db } from '@/lib/prisma';

export class DBControllers {
  // GET All Tasks
  static async getTasks() {
    return await db.tasks.findMany();
  }

  // Delete Task
  static async deleteTask(id: number) {
    return await db.tasks.delete({
      where: { id },
    });
  }

  // Create Task
  static async createTask({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return await db.tasks.create({
      data: { title, description, finished: false },
    });
  }

  // Set Finished Task
  static async finishedTask(id: number, status: boolean) {
    return await db.tasks.update({
      where: {
        id,
      },
      data: {
        finished: !status,
      },
    });
  }
}
