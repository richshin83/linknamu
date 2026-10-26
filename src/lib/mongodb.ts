import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 모드의 핫 리로드 중에도 연결을 하나만 유지하도록 globalThis에 캐시
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

export function isMongoConfigured(): boolean {
  return Boolean(uri);
}

export async function getDb(): Promise<Db> {
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 실패한 연결은 캐시하지 않아 다음 요청에서 다시 시도
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName);
}
