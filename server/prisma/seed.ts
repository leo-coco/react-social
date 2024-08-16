import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
 // Clear existing data and reset IDs
 await prisma.$executeRaw`TRUNCATE TABLE "Like" RESTART IDENTITY CASCADE`;
 await prisma.$executeRaw`TRUNCATE TABLE "Comment" RESTART IDENTITY CASCADE`;
 await prisma.$executeRaw`TRUNCATE TABLE "Post" RESTART IDENTITY CASCADE`;
 await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;


  // Create users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
      },
    });
    users.push(user);
  }


  // Create posts, comments, and likes
  for (const user of users) {
    const postCount = faker.number.int({ min: 2, max: 20 });
    const posts = [];

    for (let i = 0; i < postCount; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(),
          userId: user.id,
        },
      });
      posts.push(post);

      // Create comments for the post
      const commentCount = faker.number.int({ min: 0, max: 10 });
      for (let j = 0; j < commentCount; j++) {
        await prisma.comment.create({
          data: {
            content: faker.lorem.sentence(),
            postId: post.id,
            userId: users[faker.number.int({ min: 0, max: users.length - 1 })].id,
          },
        });
      }


const likeCount = faker.number.int({ min: 0, max: users.length - 1 });
const likedUsers = new Set<number>();

for (let k = 0; k < likeCount; k++) {
  let randomUserId;
  do {
    randomUserId = users[faker.number.int({ min: 0, max: users.length - 1 })].id;
  } while (randomUserId === user.id || likedUsers.has(randomUserId));

  likedUsers.add(randomUserId);

  await prisma.like.create({
    data: {
      userId: randomUserId,
      postId: post.id,
    },
  });
}

    }
  }

  console.log('Seeding completed.');
}

await seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("Disconnected from database.");
  });
