'use server';

import { z } from 'zod';
import { CreateBoardSchema } from './schema';
import { ActionState, createActionState } from '@/app/lib/createSafeAction';
import { BoardDto } from '@/dto/board';
import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export type CreateBoardInputType = z.infer<typeof CreateBoardSchema>;
export type ReturnCreateBoardType = ActionState<CreateBoardInputType, BoardDto>;

const handler = async (
  data: CreateBoardInputType
): Promise<ReturnCreateBoardType> => {
  let countIndex;

  try {
    countIndex = await db.board.create({ data });
  } catch (error) {
    return {
      error: 'Failed to create.',
    };
  }

  revalidatePath(`/boards`);
  return { data: countIndex };
};

export const createBoard = createActionState(CreateBoardSchema, handler);
