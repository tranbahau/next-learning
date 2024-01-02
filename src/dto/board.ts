import { assignDataToInstance } from '@/app/lib/helper';

export class BoardDto {
  title: string;
  id: string;

  constructor(data: BoardDto) {
    assignDataToInstance(data, this);
  }
}
