const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    const filePath = path.join(__dirname, '../CustomData/FilterData.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);

    await prisma.tbl_filter.create({
      data: {
        page: json.page,
        total_pages: json.total_pages,
        total_results: json.total_results,
      },
    });

    console.log('✅ Filter data inserted successfully');
  } catch (err) {
    console.error('❌ Error inserting filter data:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();