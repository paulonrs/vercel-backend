import { PrismaClient } from '@prisma/client/edge';

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: 'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDFiNjBkOGYtNzlmMi00OTAxLWJiNjUtN2NkZGY0MjYzNTExIiwidGVuYW50X2lkIjoiZGRjMzk5MDhlNTgzNTM5MzU4MDBkYmExZDA3YTQ1YmQ0ZTVjYjViNGE1MjA0MDYzZWNlOTU1ZmQ0NjVjYjBkYSIsImludGVybmFsX3NlY3JldCI6ImE5Mjk1YTg5LTA1ZWYtNGJiNS05ZTBlLWUwMTI2OWYyNDU5OSJ9.RmqwyekN947eH0xQxJENdR1N2xt3d-yLe61GnYQUQi0',
    },
  },
});

export { prismaClient };
