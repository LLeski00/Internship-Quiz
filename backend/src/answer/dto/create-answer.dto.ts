export class CreateAnswerDto {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
}
