import { PrismaClient, QuestionType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: 'admin',
        email: 'admin@dump.hr',
        firstName: 'Admin',
        lastName: 'Dump',
        password: await bcrypt.hash('Dump123!', 10),
        role: UserRole.ADMIN,
      },
      {
        id: 'user',
        email: 'user@dump.hr',
        firstName: 'User',
        lastName: 'Dump',
        password: await bcrypt.hash('Dump123!', 10),
        role: UserRole.USER,
      },
    ],
  });

  await prisma.category.createMany({
    data: [
      {
        id: 'history',
        name: 'History',
      },
      {
        id: 'geography',
        name: 'Geography',
      },
      {
        id: 'general',
        name: 'General',
      },
      {
        id: 'media',
        name: 'Media',
      },
      {
        id: 'science',
        name: 'Science',
      },
      {
        id: 'sport',
        name: 'Sport',
      },
    ],
  });

  const historyQuiz = await prisma.quiz.create({
    data: {
      title: 'World History Basics',
      categoryId: 'history',
      questions: {
        create: [
          {
            text: 'Who was the first President of the United States?',
            type: QuestionType.MULTIPLE_CHOICE,
            answers: {
              create: [
                { text: 'George Washington', isCorrect: true },
                { text: 'Thomas Jefferson', isCorrect: false },
                { text: 'Abraham Lincoln', isCorrect: false },
                { text: 'John Adams', isCorrect: false },
              ],
            },
          },
          {
            text: 'The Great Wall of China was built to protect against Mongol invasions.',
            type: QuestionType.TRUE_FALSE,
            answers: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'Which empire was known for its road system?',
            type: QuestionType.MULTIPLE_CHOICE,
            answers: {
              create: [
                { text: 'Roman Empire', isCorrect: true },
                { text: 'Mongol Empire', isCorrect: false },
                { text: 'Ottoman Empire', isCorrect: false },
                { text: 'British Empire', isCorrect: false },
              ],
            },
          },
          {
            text: 'Napoleon was defeated at the Battle of Waterloo.',
            type: QuestionType.TRUE_FALSE,
            answers: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'Fill in the blank: The ___ Revolution began in 1789.',
            type: QuestionType.FILL_IN_THE_BLANK,
            answers: {
              create: [{ text: 'French', isCorrect: true }],
            },
          },
        ],
      },
    },
  });

  const scienceQuiz = await prisma.quiz.create({
    data: {
      title: 'Basic Science Facts',
      categoryId: 'science',
      questions: {
        create: [
          {
            text: 'Water boils at 100 degrees Celsius.',
            type: QuestionType.TRUE_FALSE,
            answers: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'Which gas do plants absorb from the atmosphere?',
            type: QuestionType.MULTIPLE_CHOICE,
            answers: {
              create: [
                { text: 'Carbon Dioxide', isCorrect: true },
                { text: 'Oxygen', isCorrect: false },
                { text: 'Nitrogen', isCorrect: false },
                { text: 'Hydrogen', isCorrect: false },
              ],
            },
          },
          {
            text: 'The Earth revolves around the Sun.',
            type: QuestionType.TRUE_FALSE,
            answers: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'Fill in the blank: The chemical symbol for water is ___.',
            type: QuestionType.FILL_IN_THE_BLANK,
            answers: {
              create: [{ text: 'H2O', isCorrect: true }],
            },
          },
          {
            text: 'Which planet is known as the Red Planet?',
            type: QuestionType.MULTIPLE_CHOICE,
            answers: {
              create: [
                { text: 'Mars', isCorrect: true },
                { text: 'Jupiter', isCorrect: false },
                { text: 'Saturn', isCorrect: false },
                { text: 'Venus', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  const sportQuiz = await prisma.quiz.create({
    data: {
      title: 'Sports Around the World',
      categoryId: 'sport',
      questions: {
        create: [
          {
            text: 'Soccer is the most popular sport in the world.',
            type: QuestionType.TRUE_FALSE,
            answers: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            text: 'Fill in the blank: The Olympic Games are held every ___ years.',
            type: QuestionType.FILL_IN_THE_BLANK,
            answers: {
              create: [{ text: 'four', isCorrect: true }],
            },
          },
          {
            text: 'Which country won the FIFA World Cup in 2018?',
            type: QuestionType.MULTIPLE_CHOICE,
            answers: {
              create: [
                { text: 'France', isCorrect: true },
                { text: 'Brazil', isCorrect: false },
                { text: 'Germany', isCorrect: false },
                { text: 'Argentina', isCorrect: false },
              ],
            },
          },
          {
            text: 'Basketball was invented in Canada.',
            type: QuestionType.TRUE_FALSE,
            answers: {
              create: [
                { text: 'True', isCorrect: false },
                { text: 'False', isCorrect: true },
              ],
            },
          },
          {
            text: 'Which of these is not a position in football (soccer)?',
            type: QuestionType.MULTIPLE_CHOICE,
            answers: {
              create: [
                { text: 'Striker', isCorrect: false },
                { text: 'Goalkeeper', isCorrect: false },
                { text: 'Quarterback', isCorrect: true },
                { text: 'Defender', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.score.createMany({
    data: [
      {
        quizId: historyQuiz.id,
        score: 90,
        time: 85,
        userId: 'admin',
      },
      {
        quizId: historyQuiz.id,
        score: 75,
        time: 78,
        userId: 'user',
      },
      {
        quizId: historyQuiz.id,
        score: 85,
        time: 88,
        userId: 'admin',
      },
      {
        quizId: historyQuiz.id,
        score: 92,
        time: 80,
        userId: 'user',
      },
      {
        quizId: historyQuiz.id,
        score: 70,
        time: 90,
        userId: 'admin',
      },
      {
        quizId: scienceQuiz.id,
        score: 80,
        time: 83,
        userId: 'user',
      },
      {
        quizId: scienceQuiz.id,
        score: 88,
        time: 85,
        userId: 'admin',
      },
      {
        quizId: scienceQuiz.id,
        score: 65,
        time: 95,
        userId: 'user',
      },
      {
        quizId: scienceQuiz.id,
        score: 78,
        time: 82,
        userId: 'admin',
      },
      {
        quizId: scienceQuiz.id,
        score: 83,
        time: 79,
        userId: 'user',
      },
      {
        quizId: sportQuiz.id,
        score: 92,
        time: 77,
        userId: 'admin',
      },
      {
        quizId: sportQuiz.id,
        score: 70,
        time: 88,
        userId: 'user',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
