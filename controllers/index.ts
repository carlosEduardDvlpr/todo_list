import { db } from '@/lib/prisma';

export class DBControllers {
  // GET All Tasks
  static async getTasks() {
    try {
      const tasks = await db.tasks.findMany();
      return { success: true, tasks };
    } catch (err) {
      return { success: false, tasks: [] };
    }
  }

  // Delete Task
  static async deleteTask(id: number) {
    try {
      await db.tasks.delete({
        where: { id },
      });
      return { success: true };
    } catch (err) {
      return { success: false };
    }
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
