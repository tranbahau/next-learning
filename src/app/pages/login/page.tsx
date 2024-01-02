import { db } from '@/app/lib/db';

export default async function Page() {
  async function create(data: FormData) {
    'use server';

    await db.board.create({
      data: {
        title: data.get('title') as string,
      },
    });
  }

  return (
    <form action={create}>
      <input type="text" name="title" id="title" className="border " />
      <button type="submit" className="border ">
        Submit
      </button>
    </form>
  );
}
