import { IQAndA } from './topic.interfaces';

export type ReactionType = 'like' | 'dislike' | '';

export interface IMessage {
  _id: string;
  conv_id: string;
  message_id: string;
  message: string;
  role?: string;
  questionAnswers?: IQAndA[];
  hideReaction?: boolean;
  feedback?: {
    react: ReactionType;
    reason: string;
  };
}
